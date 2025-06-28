"use client";

import { StateCreator } from "zustand";

interface CsrfSlice {
  csrfToken: string;
  setCsrfToken: (csrfToken: string) => void;
}

export const createCsrfSlice: StateCreator<
  CsrfSlice,
  [],
  [],
  CsrfSlice
> = (set) => ({
  csrfToken: "",
  setCsrfToken: (csrfToken: string) => {
    set({ csrfToken });
  },
});
