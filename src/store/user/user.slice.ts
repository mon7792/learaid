"use client";

import { StateCreator } from "zustand";

import { UserResponse } from "@/features/auth/types";

interface UserSlice {
  user: UserResponse | null;
  setUserResponse: (user: UserResponse) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  setUserResponse: (user: UserResponse) => {
    set({ user });
  },
});
