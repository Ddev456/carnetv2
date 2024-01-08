import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type DaySelectorProps = {
  onSelect: (days: number[]) => void;
};

export const DaySelector = ({ onSelect }: DaySelectorProps) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.map((_, index) => index)
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dayIndex = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedDays((prev) => [...prev, dayIndex]);
    } else {
      setSelectedDays((prev) => prev.filter((index) => index !== dayIndex));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-between gap-1 md:flex-nowrap">
        {daysOfWeek.map((day, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={index}
                checked={selectedDays.includes(index)}
                onChange={handleCheckboxChange}
              />
              {day}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={() => onSelect(selectedDays)}>Continuer</Button>
    </div>
  );
};
