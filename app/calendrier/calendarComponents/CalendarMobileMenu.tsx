import React, { useRef, useState } from "react";
import { filterEvents, getEventDataForDay } from "./eventHelper";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";

type EventCalendar = {
  title: string;
  eventDate: Date;
  description: string;
  colorCode: string;
  type: string;
};

interface CalendarMobileMenuProps {
  day: Date;
  events: Record<string, EventCalendar[]>;
  filters: Record<string, boolean>;
  searchValue: string;
}

export const CalendarMobileMenu = ({
  day,
  events,
  filters,
  searchValue,
}: CalendarMobileMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const { groupedEvents, totalEvents } = getEventDataForDay(day, events);

  const dayKey = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;

  // Obtenez les événements pour cette date
  const eventsMobile = events[dayKey] || [];

  // Filtrez les événements en fonction des filtres et de la valeur de recherche
  const filteredEvents = filterEvents(eventsMobile, searchValue, filters);

  const scrollContainer = useRef<HTMLDivElement>(null);
  const handlePrev = () => {
    setActiveIndex((oldIndex) => {
      const newIndex =
        oldIndex === 0 ? Object.entries(events).length - 1 : oldIndex - 1;
      if (
        scrollContainer.current &&
        scrollContainer.current.children[newIndex]
      ) {
        scrollContainer.current.scrollLeft -=
          scrollContainer.current.children[
            newIndex
          ].getBoundingClientRect().width;
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((oldIndex) => {
      const newIndex =
        oldIndex === Object.entries(events).length - 1 ? 0 : oldIndex + 1;
      if (
        scrollContainer.current &&
        scrollContainer.current.children[newIndex]
      ) {
        scrollContainer.current.scrollLeft +=
          scrollContainer.current.children[
            newIndex
          ].getBoundingClientRect().width;
      }
      return newIndex;
    });
  };

  return (
    <div className="max-h-[15rem] md:hidden fixed border-t border-borders bottom-0 left-0 right-0 bg-white p-4 flex justify-center">
      {filterEvents.length === 0 ? (
        <h3>Aucun événement</h3>
      ) : (
        <>
          <Button
            variant={"ghost"}
            onClick={handlePrev}
            disabled={activeIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-caret-left stroke-foreground/80"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 6l-6 6l6 6v-12" />
            </svg>
          </Button>
          <div className="overflow-x-auto flex" ref={scrollContainer}>
            {Object.entries(events).map(([type, events], index) => (
              <div
                key={index}
                className={clsx(
                  "min-w-full flex-shrink-0",
                  index === activeIndex ? "block" : "none"
                )}
              >
                <h2 className="text-lg font-bold mb-2">{type}</h2>
                {events.length === 0 ? (
                  <h3>Aucun événement</h3>
                ) : (
                  events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="border-b border-gray-200 py-2"
                    >
                      <p className="text-sm text-gray-600">
                        {events[0].description}{" "}
                        {/* Affiche seulement le premier emoji */}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
          <Button
            variant={"ghost"}
            onClick={handleNext}
            disabled={activeIndex === Object.entries(events).length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-caret-right stroke-foreground/80"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 18l6 -6l-6 -6v12" />
            </svg>
          </Button>
        </>
      )}
    </div>
  );
};
