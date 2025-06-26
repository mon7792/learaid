'use client';

import { useEffect } from 'react';
import { Sparkles, ArrowLeft, Plus, FileText, Calendar, User, Coins } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHydratedStore } from '@/store';
import { useSession } from '@/lib/auth-client';
import { useGetUserInfo } from '@/features/auth/api/query';

export default function DashboardPage() {
  const { data: session } = useSession();
  const { user, setUserResponse, diagrams } = useHydratedStore();

  const { data: userInfo, refetch: refetchUserInfo } = useGetUserInfo(
    user === null
  );

  // Fetch user info if not available
  useEffect(() => {
    if (user === null) {
      refetchUserInfo();
    }
  }, [user, refetchUserInfo]);

  // Update user info when received
  useEffect(() => {
    if (userInfo) {
      setUserResponse(userInfo);
    }
  }, [userInfo, setUserResponse]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center border-b bg-background/95 backdrop-blur">
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        Welcome back, {user?.name || session?.user?.name || 'there'}!
                      </CardTitle>
                      <CardDescription>
                        {user?.email || session?.user?.email || 'user@example.com'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium">Token Balance:</span>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {user?.token?.toLocaleString() || '0'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Plan:</span>
                      <Badge variant={user?.plan === 'pro' ? 'default' : 'outline'}>
                        {user?.plan?.toUpperCase() || 'BASE'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link href="/">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Diagram
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link href="/pricing">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Diagrams Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Diagrams</h2>
                <p className="text-muted-foreground">
                  Manage and view all your created diagrams
                </p>
              </div>
              <Button asChild>
                <Link href="/">
                  <Plus className="w-4 h-4 mr-2" />
                  New Diagram
                </Link>
              </Button>
            </div>

            {/* Diagrams Table */}
            <Card>
              <CardContent className="p-0">
                {diagrams.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No diagrams yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first diagram to get started with AI-powered visual design.
                    </p>
                    <Button asChild>
                      <Link href="/">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Diagram
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-medium">Name</th>
                          <th className="text-left p-4 font-medium">Messages</th>
                          <th className="text-left p-4 font-medium">Last Modified</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {diagrams.map((diagram, index) => {
                          const lastMessage = diagram.messages?.[diagram.messages.length - 1];
                          const lastModified = lastMessage?.timestamp || new Date();

                          return (
                            <tr 
                              key={diagram.id} 
                              className="border-b hover:bg-muted/30 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {diagram.name || `Diagram ${index + 1}`}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      ID: {diagram.id}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge variant="outline">
                                  {diagram.messages?.length || 0} messages
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(new Date(lastModified))}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/diagram/${diagram.id}`}>
                                      Open
                                    </Link>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}