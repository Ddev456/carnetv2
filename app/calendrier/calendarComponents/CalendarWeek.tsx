"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

import { format, startOfWeek, endOfWeek, getWeek } from "date-fns";

export const CalendarWeek = () => {
  type Plant = {
    id: string;
    name: string;
    emoji: string;
    type: string;
    nursery: number[];
    seedling: number[];
    plantation: number[];
    flowering: number[];
    harvest: number[];
  };

  type DataPlants = {
    data: Plant[];
  };

  const dataPlants: DataPlants = {
    data: [
      {
        id: "sdlfiksd342fdnlk",
        name: "carotte",
        emoji: "🥕",
        type: "annuelle",
        nursery: [],
        seedling: [49, 2],
        plantation: [],
        flowering: [],
        harvest: [2, 3],
      },
      {
        id: "sdlfsshr442fdnlk",
        name: "betterave",
        emoji: "🥕",
        type: "annuelle",
        nursery: [],
        seedling: [49, 50],
        plantation: [],
        flowering: [],
        harvest: [50, 51],
      },
      {
        id: "smoanf112nlk",
        name: "tomate",
        emoji: "🍅",
        type: "annuelle",
        nursery: [48, 49],
        seedling: [49, 50],
        plantation: [49, 50],
        flowering: [50, 51],
        harvest: [51, 52],
      },
      // Ajoutez plus de plantes ici...
    ],
  };

  const transformPlantToEventCalendar = (plant: Plant): EventCalendar[] => {
    const events: EventCalendar[] = [];

    plant.nursery.forEach((week) => {
      events.push({
        title: `${plant.name} - Nursery`,
        eventDate: new Date(2023, 0, week * 7),
        description: `It's time for nursery for ${plant.name}`,
        emoji: plant.emoji,
        colorCode: "bg-[#BEE7F5]",
      });
    });

    plant.seedling.forEach((week) => {
      events.push({
        title: `${plant.name} - Seedling`,
        eventDate: new Date(2023, 0, week * 7),
        description: `It's time for seedling for ${plant.name}`,
        emoji: plant.emoji,
        colorCode: "bg-[#D3E7A6]",
      });
    });

    plant.plantation.forEach((week) => {
      events.push({
        title: `${plant.name} - Plantation`,
        eventDate: new Date(2023, 0, week * 7),
        description: `It's time for plantation for ${plant.name}`,
        emoji: plant.emoji,
        colorCode: "bg-[#EBDACA]",
      });
    });

    plant.flowering.forEach((week) => {
      events.push({
        title: `${plant.name} - Flowering`,
        eventDate: new Date(2023, 0, week * 7),
        description: `It's time for flowering for ${plant.name}`,
        emoji: plant.emoji,
        colorCode: "bg-[#FFD19A]",
      });
    });

    plant.harvest.forEach((week) => {
      events.push({
        title: `${plant.name} - Harvest`,
        eventDate: new Date(2023, 0, week * 7),
        description: `It's time for harvest for ${plant.name}`,
        emoji: plant.emoji,
        colorCode: "bg-[#E1D9FF]",
      });
    });

    return events;
  };

  const [date, setDate] = useState(new Date());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(date, { weekStartsOn: 1 });
  const weekNumber = getWeek(date);

  const [weekDays, setWeekDays] = useState<number[]>([]);

  useEffect(() => {
    const startOfWeek = date.getDate() - date.getDay();
    const endOfWeek = startOfWeek + 6;
    const days = Array.from({ length: 7 }, (_, i) => startOfWeek + i);
    setWeekDays(days);
  }, [date]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<EventCalendar | null>(null);
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();

  const [recurringEvents, setRecurringEvents] = useState<EventCalendar[]>(
    dataPlants.data.flatMap((plant) => transformPlantToEventCalendar(plant))
  );

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleEventSubmit = () => {
    if (newEvent) {
      setRecurringEvents((prevEvents: EventCalendar[]) => [
        ...prevEvents,
        newEvent,
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent: EventCalendar | null) => ({
      ...prevEvent!,
      [name]: value,
    }));
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const monthDays = new Array(getDaysInMonth(date))
    .fill(null)
    .map((_, index) => index + 1);

  type EventCalendar = {
    title: string;
    eventDate: Date;
    description: string;
    emoji: string;
    colorCode: string;
  };

  const currentYear = new Date().getFullYear();

  const handleNextWeek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    setDate(newDate);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 7);
    setDate(newDate);
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const maxEventsPerDay =
    weekDays.length > 0 && recurringEvents.length > 0
      ? Math.max(
          ...weekDays.map(
            (day) =>
              recurringEvents.filter(
                (event) =>
                  event.eventDate.getDate() === day &&
                  event.eventDate.getMonth() + 1 === date.getMonth() + 1 &&
                  event.eventDate.getFullYear() === date.getFullYear()
              ).length
          )
        )
      : 0;
  console.log(maxEventsPerDay);

  return (
    <>
      <div className="w-[80%] h-full flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow overflow-hidden mx-auto w-full">
          <div className="flex justify-between items-center py-2 px-6">
            <Button variant={"ghost"} onClick={handleToday}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar-filled stroke-foreground/20"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1zm3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16v-9.625z"
                  stroke-width="0"
                  fill="currentColor"
                />
                <path
                  d="M12 12a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
                  stroke-width="0"
                  fill="currentColor"
                />
              </svg>
            </Button>

            <Button variant={"ghost"} onClick={handlePrevWeek}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left stroke-foreground/90"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </Button>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wide text-blue-500">
                Semaine {weekNumber}
              </h2>
              <p>
                {format(startOfCurrentWeek, "dd/MM/yyyy")} -{" "}
                {format(endOfCurrentWeek, "dd/MM/yyyy")}
              </p>
            </div>
            <Button variant={"ghost"} onClick={handleNextWeek}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-right stroke-foreground/90"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </Button>
          </div>
          <div className="grid grid-cols-7 text-center text-sm">
            {days.map((day, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-2 py-2 border-b border-gray-200 font-semibold text-gray-700"
              >
                {day}
              </div>
            ))}
            {Array(maxEventsPerDay)
              .fill(null)
              .map((_, eventIndex) => (
                <>
                  {weekDays.map((day, dayIndex) => {
                    const dayEvents = recurringEvents.filter(
                      (event) =>
                        event.eventDate.getDate() === day &&
                        event.eventDate.getMonth() + 1 ===
                          date.getMonth() + 1 &&
                        event.eventDate.getFullYear() === date.getFullYear()
                    );
                    const event = dayEvents[eventIndex];

                    return (
                      <div
                        key={dayIndex}
                        className={clsx(
                          "grid grid-cols-1 col-span-1 gap-2 max-h-[8rem] relative p-8 border border-gray-200 text-gray-500 hover:bg-blue-200 cursor-pointer"
                        )}
                        onClick={() => handleDayClick(day)}
                      >
                        {event ? (
                          <div className="border border-gray-200 p-2 hover:bg-blue-200 cursor-pointer">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {event.emoji} {event.title}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{event.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </>
              ))}

            <AlertDialog open={isDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Add New Event</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please fill in the details for the new event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <form>
                  <Input
                    name="title"
                    onChange={handleInputChange}
                    placeholder="Event Title"
                  />
                  <Input
                    name="description"
                    onChange={handleInputChange}
                    placeholder="Event Description"
                  />
                  <Input
                    name="emoji"
                    onChange={handleInputChange}
                    placeholder="Event Emoji"
                  />
                </form>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleDialogClose}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleEventSubmit}>
                    Add Event
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
};
