"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { useHydratedStore } from "@/store";
import { useGetUserInfo } from "@/features/auth/api/query";

import { ThemeModeSwitcher } from "@/components/theme-toggle";
import { DiagramTable } from "@/features/diagram/components/Table";
import { NewDiagram } from "@/features/diagram/components/New";
import { UserProfile } from "@/features/auth/components/UserProfile";
import { UserProfileCard } from "@/features/auth/components/UserProfile/card";

export default function DashboardPage() {
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
          <ThemeModeSwitcher />
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="lg:col-span-2">
              <UserProfileCard />
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
              <NewDiagram />
            </div>
            <DiagramTable />
          </div>
        </div>
      </main>
    </div>
  );
}
