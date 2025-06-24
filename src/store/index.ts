import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createDiagramSlice } from "./diagram/diagram.slice";

export const useStore = create<ReturnType<typeof createDiagramSlice>>()(
  persist(
    (...a) => ({
      ...createDiagramSlice(...a),
    }),
    {
      name: "learaid-storage",
    }
  )
);
