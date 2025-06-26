"use client";

import Link from "next/link";
import { Sparkles, PanelLeft } from "lucide-react";

import { useSession } from "@/lib/auth-client";

import { ThemeModeSwitcher } from "@/components/theme-toggle";
import { UserProfile } from "@/features/auth/components/UserProfile";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSidebarToggle?: () => void;
}

export const Header = ({ onSidebarToggle }: HeaderProps) => {
  const { data: session } = useSession();
  
  return (
    <header className="w-full p-6 flex justify-between items-center z-10">
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle - Only show when authenticated */}
        {session && onSidebarToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="mr-2"
          >
            <PanelLeft className="w-5 h-5" />
          </Button>
        )}
        
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