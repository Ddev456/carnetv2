// CalendarGrid.tsx
import React from "react";
import { Day } from "./Day";
import { EventCalendar } from "./Calendar";
import { getEventDataForDay } from "../../../app/calendrier/calendarComponents/eventHelper";
import { useFilter } from "./useFilter";
import { useCalendarSearchBar } from "./useCalendarSearchBar";
import { CalendarMobileMenu } from "./CalendarMobileMenu";

type CalendarGridProps = {
  selectedDay: Date;
  date: Date;
  weekDays: string[];
  dates: Date[];
  recurringEvents: EventCalendar[];
  handleDayClick: (event: Date, events: EventCalendar[]) => void;
  selectedDayEvents: EventCalendar[];
};

const CalendarGrid = ({
  selectedDay,
  date,
  weekDays,
  dates,
  recurringEvents,
  handleDayClick,
  selectedDayEvents,
}: CalendarGridProps) => {
  const { gardenActions } = useFilter();
  const { searchValue } = useCalendarSearchBar();

  const firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();

  // Générer les cellules vides pour les jours avant le début du mois
  const emptyCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    emptyCells.push(
      <div
        key={`empty-${i}`}
        className="calendar-cell border border-borders bg-secondary/20"
      ></div>
    );
  }

  return (
    <div className="grid grid-cols-7 px-2 text-center text-sm md:px-0">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className="text-text border-b border-borders py-2 font-semibold"
        >
          {day}
        </div>
      ))}
      {emptyCells}
      {dates.map((day, index) => {
        const groupedEvents = getEventDataForDay(day, recurringEvents);

        return (
          <Day
            key={index}
            day={day}
            filters={gardenActions}
            searchValue={searchValue}
            handleDayClick={handleDayClick}
            groupedEvents={groupedEvents}
          />
        );
      })}
      {selectedDay && (
        <CalendarMobileMenu
          day={selectedDay}
          events={selectedDayEvents}
          filters={gardenActions}
          searchValue={searchValue}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
