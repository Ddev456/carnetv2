import React, { useRef, useState } from "react";
import { filterEvents } from "../../../app/calendrier/calendarComponents/eventHelper";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { GardenAction } from "../../../src/components/calendar/useFilter";

type EventCalendar = {
  title: string;
  icon: string;
  eventDate: Date;
  description: string;
  type: string;
};

interface CalendarMobileMenuProps {
  day: Date;
  events: EventCalendar[];
  filters: GardenAction[];
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

  //   const filteredEvents = filterEvents(events, searchValue, filters);

  // Filtrez les événements en fonction des filtres, de la valeur de recherche et du jour sélectionné
  const filteredEvents = filterEvents(events, searchValue, filters);

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
    <div className="fixed inset-x-0 bottom-0 flex max-h-[15rem] justify-center border-t border-borders bg-background/80 p-4 md:hidden">
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
          <div
            className="hide-scrollbar flex overflow-x-auto"
            ref={scrollContainer}
          >
            {Object.entries(filteredEvents).map(([type, typeEvents], index) => (
              <div
                key={index}
                className={clsx(
                  "min-w-full shrink-0",
                  index === activeIndex ? "block" : "none"
                )}
              >
                {/* <h2 className="mb-2 text-center text-lg font-bold">{type}</h2> */}
                {events.length === 0 ? (
                  <h3>Aucun événement</h3>
                ) : (
                  events.map((event: EventCalendar, eventIndex: number) => (
                    <div
                      key={eventIndex}
                      className="border-b border-borders py-2"
                    >
                      <p className="text-sm text-secondary">
                        {event.description}
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
