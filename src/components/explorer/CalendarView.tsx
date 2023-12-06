import React, { useState } from "react";
import { Plant } from "@/db/query/plant.query";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
// import { PlantCalendar } from "./PlantCalendar";

type CalendarViewProps = {
  plant: Plant;
  plants: Plant[];
};

export const CalendarView = ({ plant, plants }: CalendarViewProps) => {
  const [allViewMode, toggleAll] = React.useState(false);
  const getDateOfWeek = (w: number, y: number) => {
    const d = 2 + (w - 1) * 7;
    return new Date(y, 0, d);
  };

  const chunk = (arr: number[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  return (
    <div className="min-h-[300px] bg-secondary/20">
      <div className="flex items-center space-x-2">
        <Switch
          id="legumotheque-mode"
          onClick={() => {
            toggleAll(!allViewMode);
          }}
        />
        <Label htmlFor="legumotheque-mode">Mode Légumothèque</Label>
      </div>
      {/* <PlantCalendar plants={plants} /> */}
    </div>
  );
};
