"use client";

import { StateCreator } from "zustand";

interface BuyDialogSlice {
  buyDialogOpen: boolean;
  setBuyDialogOpen: (buyDialogOpen: boolean) => void;
}

export const createBuyDialogSlice: StateCreator<
  BuyDialogSlice,
  [],
  [],
  BuyDialogSlice
> = (set) => ({
  buyDialogOpen: false,
  setBuyDialogOpen: (buyDialogOpen: boolean) => {
    set({ buyDialogOpen });
  },
});
