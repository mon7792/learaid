"use client";

import Link from "next/link";
import { BadgeCheck, Bell, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {signOut,  useSession } from "@/lib/auth-client";

export function UserProfile() {
  const { data: session, isPending } = useSession();

  const handleLogout = () => {
    signOut();
  };
  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-col items-center relative">
            <Avatar className="h-10 w-10 rounded-full border-2 border-gray-300 cursor-pointer">
            <AvatarImage
                  src={session?.user.image || ""}
                  alt={session?.user.name || "avatar"}
                />
                <AvatarFallback className="rounded-lg">LR</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-full">
              {session?.user.id ? "BASE" : "PRO"}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg border-2 border-gray-300 ">
                <AvatarImage
                  src={session?.user.image || ""}
                  alt={session?.user.name || "avatar"}
                />
                <AvatarFallback className="rounded-lg">IA</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user.name || ""}
                </span>
                <span className="truncate text-xs">{session?.user.email || ""}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>
                <BadgeCheck />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link href="/notification">
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
            <LogOut />
            {isPending ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
