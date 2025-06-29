'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, DraftingCompass } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <DraftingCompass className="w-5 h-5 text-primary-foreground rotate-180" />
          </div>
          <span className="text-xl font-bold">Vanita</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to
              <span className="text-primary block">Vanita!</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your subscription has been successfully activated. You can now start creating amazing diagrams with AI.
            </p>
          </div>

          {/* Success Card */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Payment Successful
              </CardTitle>
              <CardDescription>
                Your subscription is now active and ready to use.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessionId && (
                <div className="text-sm text-muted-foreground">
                  <p>Session ID: {sessionId}</p>
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI diagram generation enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Full access to all features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cloud storage activated</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                Start Creating Diagrams
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-2 pt-8">
            <p className="text-sm text-muted-foreground">
              Need help getting started? Check out our documentation or contact support.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <a href="#" className="text-primary hover:underline">Documentation</a>
              <a href="#" className="text-primary hover:underline">Support</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}