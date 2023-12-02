import { create } from "zustand";

type SideBarStore = {
  isOpen: boolean;
  toggle: () => void;
};

export const useSideBarStore = create<SideBarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
