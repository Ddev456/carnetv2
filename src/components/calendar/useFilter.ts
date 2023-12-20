import { useState } from "react";

export type GardenAction = {
  type: string;
  label: string;
  color: string;
  status: boolean;
};

export type GardenActions = GardenAction[];

export const useFilter = () => {
  const [gardenActions, setGardenActions] = useState<GardenActions>([
    {
      type: "COVERSOWING",
      label: "Semis sous abri",
      color: "#BEE7F5",
      status: false,
    },
    {
      type: "SOWING",
      label: "Semis en pleine terre",
      color: "#D3E7A6",
      status: false,
    },
    {
      type: "TRANSPLANTING",
      label: "Transplantation",
      color: "#EBDACA",
      status: false,
    },
    { type: "PLANTING", label: "Plantation", color: "#FFD19A", status: false },
  ]);

  const setGardenAction = (type: string, status: boolean) => {
    const newGardenActions = gardenActions.map((action) => {
      if (action.type === type) {
        return { ...action, status };
      }
      return action;
    });
    setGardenActions(newGardenActions);
  };
  return { gardenActions, setGardenAction };
};
