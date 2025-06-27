"use client";

import { StateCreator } from "zustand";

interface SidebarSlice {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const createSidebarSlice: StateCreator<
  SidebarSlice,
  [],
  [],
  SidebarSlice
> = (set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen: boolean) => {
    set({ isSidebarOpen: isOpen });
  },
});
