import React from "react";
import { PlantInfos } from "../dashboard/plant.query";
import { CultureDisplay } from "./CultureDisplay";

export type Plant = {
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
  eventFlowering: number;
  eventHarvest: number;
  eventPlantation: number;
};

type calendarType =
  | "nursery"
  | "seedling"
  | "plantation"
  | "flowering"
  | "harvest";

// type calendarTypesT = {
//   type: calendarType;
//   data: number[];
//   bgColor: string;
//   color: string;
//   darkBgColor: string;
// }[];

type CalendarViewProps = {
  plant: PlantInfos;
  // calendarTypes?: calendarTypesT;
  // bgColor?: string;
  // darkBgColor?: string;
};

export const CalendarView = ({
  plant,
}: // calendarTypes,
// bgColor,
// darkBgColor,
CalendarViewProps) => {
  return (
    <div className="min-h-[300px]">
      <CultureDisplay
        period={{
          name: plant?.name || "",
          nursery: plant?.nursery || [],
          seedling: plant?.seedling || [],
          plantation: plant?.plantation || [],
          flowering: plant?.flowering || [],
          harvest: plant?.harvest || [],
        }}
      />
    </div>
  );
};
