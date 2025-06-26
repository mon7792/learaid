"use client";

import { useEffect } from "react";
import { User, Coins } from "lucide-react";

import { useStore } from "@/store";
import { useGetUserInfo } from "@/features/auth/api/query";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkout } from "@/features/billing/components/Checkout";

export function UserProfileCard() {
  const { user, setUserResponse } = useStore();

  const { data: userInfo, refetch: refetchUserInfo } = useGetUserInfo(
    user === null
  );

  // user is null . the refetch will be triggered
  useEffect(() => {
    if (user === null) {
      refetchUserInfo();
    }
  }, [user, refetchUserInfo]);

  // userInfo is not null. the user will be updated
  useEffect(() => {
    if (userInfo) {
      setUserResponse(userInfo);
    }
  }, [userInfo, setUserResponse]);

  // TODO: card skeleton

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="flex flex-col gap-0">
              <div className="text-base font-extralight tracking-wider">
                Welcome back
              </div>
              <div className="text-2xl font-bold tracking-wide">
                {user?.name || "there"}!
              </div>
            </CardTitle>
            <CardDescription>
              {user?.email || "user@example.com"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Token Balance:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {user?.token?.toLocaleString() || "0"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Plan:</span>
              <Badge>{user?.plan?.toUpperCase() || "BASE"}</Badge>
            </div>
          </div>
          {user?.token && user.token < 2000 && (
            <div className="flex w-full justify-end">
              <Checkout />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
