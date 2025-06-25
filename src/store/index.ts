import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { useEffect, useState } from "react";

import { createDiagramSlice } from "./diagram/diagram.slice";
import { createHydrationSlice } from "./hydration/hydration.slice";
import { createUserSlice } from "./user/user.slice";

export const useStore = create<
  ReturnType<typeof createHydrationSlice> &
    ReturnType<typeof createDiagramSlice> &
    ReturnType<typeof createUserSlice>
>()(
  devtools(
    persist(
      (...a) => ({
        ...createDiagramSlice(...a),
        ...createHydrationSlice(...a),
        ...createUserSlice(...a),
      }),
      {
        name: "learaid-storage",
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setHydrated(true);
          }
        },
      }
    ),
    {
      name: "learaid-store",
    }
  )
);

// Custom hook to ensure store is hydrated before use
export const useHydratedStore = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useStore();

  useEffect(() => {
    if (store.isHydrated) {
      setIsHydrated(true);
    }
  }, [store.isHydrated]);

  return { ...store, isHydrated };
};
