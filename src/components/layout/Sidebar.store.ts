import { create } from "zustand";
import { persist } from "zustand/middleware";

export type sidebarStore = {
  state: boolean;
  setState: (state: boolean) => void;
};

export const useSidebarStore = create(
  persist<sidebarStore>(
    (set, get) => ({
      state: false,
      setState: (state) => {
        set({ state });
      },
    }),
    {
      name: "sidebar-storage",
    }
  )
);
