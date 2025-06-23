'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { supabase } from '@/lib/supabase';
import { getProductByPriceId } from '@/stripe-config';
import Link from 'next/link';

interface SubscriptionData {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function SubscriptionStatus() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    fetchSubscription();
  }, [session]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        setError('Failed to load subscription data');
        return;
      }

      setSubscription(data);
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Subscription Status
          </CardTitle>
          <CardDescription>
            Sign in to view your subscription details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Subscription Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
          <Button onClick={fetchSubscription} variant="outline" className="mt-2">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            No Active Subscription
          </CardTitle>
          <CardDescription>
            Subscribe to unlock AI diagram generation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/pricing">View Plans</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
  const statusColor = subscription.subscription_status === 'active' ? 'default' : 
                     subscription.subscription_status === 'past_due' ? 'destructive' : 'secondary';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5" />
          Subscription Status
        </CardTitle>
        <CardDescription>
          {product ? product.name : 'Current subscription'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          <Badge variant={statusColor}>
            {subscription.subscription_status.replace('_', ' ')}
          </Badge>
        </div>

        {subscription.current_period_end && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Next billing
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
            </span>
          </div>
        )}

        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment method
            </span>
            <span className="text-sm text-muted-foreground">
              {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
            </span>
          </div>
        )}

        {subscription.cancel_at_period_end && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Your subscription will cancel at the end of the current period.
            </p>
          </div>
        )}

        <div className="pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/pricing">Manage Subscription</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}