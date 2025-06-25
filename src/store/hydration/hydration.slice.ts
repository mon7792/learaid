"use client";

import { StateCreator } from "zustand";

type HydrationSlice = {
  isHydrated: boolean; // whether the store has been hydrated from localStorage
  setHydrated: (hydrated: boolean) => void; // set hydration state
};

export const createHydrationSlice: StateCreator<
  HydrationSlice,
  [],
  [],
  HydrationSlice
> = (set) => ({
  isHydrated: false,
  setHydrated: (hydrated: boolean) => {
    set({ isHydrated: hydrated });
  },
});
