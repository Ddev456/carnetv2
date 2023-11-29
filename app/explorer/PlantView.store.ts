import { create } from "zustand";
import { persist } from "zustand/middleware";

type Plant = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  water: number;
  exposition: number;
  isPotager: boolean;
  isReadOnly: boolean;
  nursery: number[];
  seedling: number[];
  flowering: number[];
  plantation: number[];
  harvest: number[];
};

export type plantViewStore = {
  state: Plant | null;
  setState: (state: Plant) => void;
};

export const usePlantViewStore = create(
  persist<plantViewStore>(
    (set, get) => ({
      state: null,
      setState: (state) => {
        set({ state });
      },
    }),
    {
      name: "plant-storage",
    }
  )
);
