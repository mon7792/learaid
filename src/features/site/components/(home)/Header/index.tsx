"use client";

import Link from "next/link";

import { useSession } from "@/lib/auth-client";

import { ThemeModeSwitcher } from "@/components/theme-toggle";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const { data: session } = useSession();
  
  return (
    <header className="w-full p-6 flex justify-between items-center z-10">
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-2xl font-bold text-primary tracking-wider font-sora">Vanita</span>
        </Link>
      </div>
      <div className="flex gap-3">
        <ThemeModeSwitcher />
        {!session && (
          <Link href="/auth/login">
            <Button className="cursor-pointer">Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};