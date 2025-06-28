import { Sparkles } from "lucide-react";
import Link from "next/link";

import { ThemeModeSwitcher } from "@/components/theme-toggle";
import { UserProfile } from "@/features/auth/components/UserProfile";

export const Header = () => {
  return (
    <header className="w-full p-6 flex justify-between items-center border-b bg-background/95 backdrop-blur">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold font-sora">Vanita</span>
      </Link>
      <div className="flex gap-3">
        <ThemeModeSwitcher />
        <UserProfile />
      </div>
    </header>
  );
};
