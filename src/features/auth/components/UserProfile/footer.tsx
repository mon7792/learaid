"use client";

import { useEffect } from "react";

import { useStore } from "@/store";
import { useGetUserInfo } from "@/features/auth/api/query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileDropdownContent } from "./dropdown-content";

export function UserProfileFooter() {
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

  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 text-left text-sm cursor-pointer">
            <Avatar className="h-8 w-8 rounded-lg border-2 border-gray-300 ">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name || "avatar"}
              />
              <AvatarFallback className="rounded-lg">IA</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name || ""}</span>
              <span className="truncate text-xs">{user?.email || ""}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <UserProfileDropdownContent user={user} />
      </DropdownMenu>
    </section>
  );
}
