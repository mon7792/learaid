"use client";

import { useEffect } from "react";

import { useHydratedStore } from "@/store";
import { useGetUserInfo } from "@/features/auth/api/query";

import { DiagramTable } from "@/features/diagram/components/Table";
import { NewDiagram } from "@/features/diagram/components/New";
import { UserProfileCard } from "@/features/auth/components/UserProfile/card";
import { Header } from "@/features/site/components/(app)/Header";

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
      <Header />

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
              <div className="max-w-xs">
                <NewDiagram />
              </div>
            </div>
            <DiagramTable />
          </div>
        </div>
      </main>
    </div>
  );
}
