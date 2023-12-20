import { useState } from "react";
import { BadgeFilter } from "./BadgeFilter";
import { useFilter } from "./useFilter";

export const CalendarFilters = () => {
  const { gardenActions, setGardenAction } = useFilter();
  return (
    <div className="flex gap-2">
      {gardenActions.map((action) => (
        <BadgeFilter
          key={action.type}
          color={action.color}
          checked={action.status}
          onClick={() => setGardenAction(action.type, !action.status)}
          label={action.label}
        />
      ))}
    </div>
  );
};
