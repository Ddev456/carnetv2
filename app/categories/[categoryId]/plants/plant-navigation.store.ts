import { useMediaQuery } from "@/hooks/useMediaQuery";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PlantNavigationState = "open" | "close" | "sticky";

type PlantNavigationStore = {
  state: PlantNavigationState;
  setState: (state: PlantNavigationState) => void;
};

export const usePlantNavigationStore = create(
  persist<PlantNavigationStore>(
    (set, get) => ({
      state: "sticky",
      setState: (state) => {
        set({ state });
      },
    }),
    {
      name: "plant-navigation-storage", // name of the item in the storage (must be unique)
    }
  )
);

export const usePlantNavigationState = (): PlantNavigationState => {
  const state = usePlantNavigationStore((state) => state.state);
  const isLg = useMediaQuery("(min-width: 1024px)");

  if (isLg) {
    return state;
  }

  if (state === "sticky") {
    return "close";
  }

  return state;
};
