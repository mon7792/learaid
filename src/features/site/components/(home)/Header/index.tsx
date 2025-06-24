"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { useSession } from "@/lib/auth-client";

import { ThemeModeSwitcher } from "@/components/theme-toggle";
import { UserProfile } from "@/features/auth/components/UserProfile";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full p-6 flex justify-between items-center z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">Learaid</span>
      </div>
      <div className="flex gap-3">
        <ThemeModeSwitcher />
        {session ? (
          <>
            <UserProfile />
          </>
        ) : (
          <Link href="/auth/login">
            <Button className="cursor-pointer">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};
