"use client";

import { useEffect } from "react";
import { Sparkles, ArrowLeft, Plus, User, Coins } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHydratedStore } from "@/store";
import { useSession } from "@/lib/auth-client";
import { useGetUserInfo } from "@/features/auth/api/query";

import { DiagramTable } from "@/features/diagram/components/Table";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { user, setUserResponse } = useHydratedStore();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center border-b bg-background/95 backdrop-blur">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
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
                        Welcome back,{" "}
                        {user?.name || session?.user?.name || "there"}!
                      </CardTitle>
                      <CardDescription>
                        {user?.email ||
                          session?.user?.email ||
                          "user@example.com"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium">
                        Token Balance:
                      </span>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {user?.token?.toLocaleString() || "0"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Plan:</span>
                      <Badge
                        variant={user?.plan === "pro" ? "default" : "outline"}
                      >
                        {user?.plan?.toUpperCase() || "BASE"}
                      </Badge>
                    </div>
                  </div>
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
            <DiagramTable />
          </div>
        </div>
      </main>
    </div>
  );
}
