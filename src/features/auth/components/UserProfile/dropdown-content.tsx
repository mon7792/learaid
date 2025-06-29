"use client";

import Link from "next/link";
import { LogOut, LayoutDashboard, BadgeEuro } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signOut } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserResponse } from "../../types";

type UserProfileDropdownContentProps = {
  user: UserResponse | null;
};

export const UserProfileDropdownContent = ({
  user,
}: UserProfileDropdownContentProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg border-2 border-gray-300 ">
            <AvatarImage src={user?.image || ""} alt={user?.name || "avatar"} />
            <AvatarFallback className="rounded-lg">IA</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.name || ""}</span>
            <span className="truncate text-xs">{user?.email || ""}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href="/dashboard">
          <DropdownMenuItem>
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/buy">
          <DropdownMenuItem>
            <BadgeEuro />
            Buy
          </DropdownMenuItem>
        </Link>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
