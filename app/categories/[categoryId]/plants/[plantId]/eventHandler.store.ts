import { create } from "zustand";
import { persist } from "zustand/middleware";

export type eventState = {
  pickedNursery: boolean;
  nurseryDay: Date | null;
  pickedSeedling: boolean;
  seedlingDay: Date | null;
  pickedPlantation: boolean;
  plantationDay: Date | null;
  pickedFlowering: boolean;
  floweringDay: Date | null;
  pickedHarvest: boolean;
  harvestDay: Date | null;
};

export type eventHandlerStore = {
  state: eventState;
  setState: (state: eventState) => void;
};

export const useEventHandlerStore = create(
  persist<eventHandlerStore>(
    (set, get) => ({
      state: {
        pickedNursery: false,
        nurseryDay: null,
        pickedSeedling: false,
        seedlingDay: null,
        pickedPlantation: false,
        plantationDay: null,
        pickedFlowering: false,
        floweringDay: null,
        pickedHarvest: false,
        harvestDay: null,
      },
      setState: (state) => {
        set({ state });
      },
    }),
    {
      name: "eventHandler-storage",
    }
  )
);

// export const useEventHandlerState = ({
//   startDate,
//   typeEvent,
// }: {
//   startDate: Date;
//   typeEvent: typeEvent;
// }): eventHandlerStore => {
//   const state = usePlantNavigationStore((state) => state.state);

//   if (state) {
//     return { true, startDate, typeEvent } ;
//   }

//   return state;
// };
