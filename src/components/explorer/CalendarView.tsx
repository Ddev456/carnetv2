import React from "react";
import { CultureDisplay } from "./CultureDisplay";
import { Plant } from "@/db/query/plant.query";

type calendarType =
  | "nursery"
  | "seedling"
  | "plantation"
  | "flowering"
  | "harvest";

type CalendarViewProps = {
  plant: Plant;
};

export const CalendarView = ({ plant }: CalendarViewProps) => {
  return (
    <div className="min-h-[300px] bg-secondary/20">
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
