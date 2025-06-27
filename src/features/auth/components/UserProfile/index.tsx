"use client";

import { useEffect } from "react";
import { useHydratedStore } from "@/store";
import { useGetUserInfo } from "@/features/auth/api/query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProfileDropdownContent } from "./dropdown-content";

export function UserProfile() {
  const { user, setUserResponse } = useHydratedStore();

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
          <div className="flex flex-col items-center relative">
            <Avatar className="h-10 w-10 rounded-full border-2 border-gray-300 cursor-pointer">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name || "avatar"}
              />
              <AvatarFallback className="rounded-lg">LR</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-full">
              {user?.plan === "base" ? "BASE" : "PRO"}
            </div>
          </div>
        </DropdownMenuTrigger>
        <UserProfileDropdownContent user={user} />
      </DropdownMenu>
    </section>
  );
}
