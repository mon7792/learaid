'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { SubscriptionStatus } from '@/components/subscription-status';
import {Checkout} from '@/features/billing/components/Checkout';

export default function DashboardPage() {


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Learaid</span>
        </Link>
        <div className="flex gap-3">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              Welcome back, email
            </h1>
            <p className="text-muted-foreground">
              Manage your diagrams and subscription from your dashboard.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subscription Status */}
            <div className="lg:col-span-1">
              <SubscriptionStatus />
              <Checkout />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button asChild className="h-20 flex-col gap-2">
                    <Link href="/">
                      <Plus className="w-6 h-6" />
                      Create New Diagram
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="h-20 flex-col gap-2">
                    <Link href="/pricing">
                      <Sparkles className="w-6 h-6" />
                      View Plans
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <div className="bg-card rounded-lg border p-6">
                  <p className="text-muted-foreground text-center py-8">
                    No recent activity yet. Start creating diagrams to see your history here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}