"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckSquare, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { filterEvents, getEventDataForDay } from "./eventHelper";
import { CalendarMobileMenu } from "./CalendarMobileMenu";
import { Day } from "./Day";

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

type ClimateData = {
  [climate: string]: EventCalendar[];
};

type CalendarResponsiveProps = {
  climateData: ClimateData;
};

type EventCalendar = {
  title: string;
  eventDate: Date;
  description: string;
  colorCode: string;
  type: string;
};

type BadgeComponentProps = {
  color: string;
  checked: boolean;
  onClick: () => void;
  label: string;
};

type EventGroups = Record<string, EventCalendar[]>;

// Composant Badge personnalisé
const BadgeComponent = ({
  color,
  checked,
  onClick,
  label,
}: BadgeComponentProps) => {
  return (
    <Badge
      variant={checked ? "default" : "outline"}
      className={clsx(
        "cursor-pointer",
        checked
          ? `bg-[${color}] hover:bg-[${color}]/20 text-foreground/80`
          : null
      )}
      onClick={onClick}
    >
      {label}
    </Badge>
  );
};

export const CalendarResponsive = ({
  climateData,
}: CalendarResponsiveProps) => {
  // Choisissez le climat que vous voulez utiliser
  const [climate, setClimate] = useState<string>("Océanique");

  // Obtenez les événements de calendrier pour ce climat
  const eventsOnClimate = climateData[climate];

  const currentDate = new Date(Date.now());

  const [date, setDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );

  // Générer les dates pour le mois en cours
  const dates = [];
  const monthStart = date.getDate();
  const monthEnd = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  for (let day = monthStart; day <= monthEnd; day++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), day));
  }

  // Générer les jours de la semaine pour chaque date

  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Obtenir le premier jour de la semaine du mois
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
        className="border border-borders calendar-cell bg-secondary/20"
      ></div>
    );
  }

  const [selectedDay, setSelectedDay] = useState<Date>(date);
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // pour comparer uniquement la date, pas l'heure

  const currentDayEvents = eventsOnClimate.filter((event) => {
    const eventDate = new Date(event.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  const [selectedDayEvents, setSelectedDayEvents] =
    useState<EventCalendar[]>(currentDayEvents);

  const [recurringEvents, setRecurringEvents] =
    useState<EventCalendar[]>(eventsOnClimate);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    // setSelectedDayEvents(groupedEvents);
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const monthDays = new Array(getDaysInMonth(date))
    .fill(null)
    .map((_, index) => index + 1);

  const currentYear = new Date().getFullYear();

  const handleNextMonth = () => {
    const newDate = new Date(date.setMonth(date.getMonth() + 1));
    if (newDate.getFullYear() <= currentYear + 2) {
      setDate(newDate);
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date.setMonth(date.getMonth() - 1));
    if (newDate.getFullYear() >= currentYear) {
      setDate(newDate);
    }
  };

  const handleToday = () => {
    setDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  };

  // FILTRES

  const [semisSousAbri, setSemisSousAbri] = useState(true);
  const [semisEnPleineTerre, setSemisEnPleineTerre] = useState(true);
  const [plantation, setPlantation] = useState(true);
  const [floraison, setFloraison] = useState(true);
  const [recolte, setRecolte] = useState(true);
  const handleCheckboxChange = (
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setChecked((current) => !current);
  };

  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };
  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.1 } },
  };
  const eventVariants = (index: number) => ({
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: index * 0.1 },
    },
  });

  let eventsByType: { [key: string]: any[] } = {};

  if (selectedDayEvents) {
    eventsByType = selectedDayEvents.reduce(
      (groups: { [key: string]: any[] }, event) => {
        if (event.type) {
          const group = (groups[event.type] = groups[event.type] || []);
          group.push(event);
        }
        return groups;
      },
      {}
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainer = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((oldIndex) => {
      const newIndex =
        oldIndex === 0 ? Object.entries(eventsByType).length - 1 : oldIndex - 1;
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
        oldIndex === Object.entries(eventsByType).length - 1 ? 0 : oldIndex + 1;
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

  // weekDays.forEach((day) => {
  // const filteredEvents = recurringEvents.filter(
  //   (event) =>
  //     event.eventDate.getDate() === day.getDate() &&
  //     event.eventDate.getMonth() === day.getMonth() &&
  //     event.eventDate.getFullYear() === day.getFullYear()
  // );

  // const groupedEvents = filteredEvents.reduce(
  //   (groups: Record<string, EventCalendar[]>, event) => {
  //     const key = event.type;
  //     if (!groups[key]) {
  //       groups[key] = [];
  //     }
  //     groups[key].push(event);
  //     return groups;
  //   },
  //   {}
  // );
  // const eventGroups = Object.entries(groupedEvents).map(([type, events]) => ({
  //   type,
  //   events,
  // }));
  // const totalEvents = eventGroups.reduce(
  //   (total, group) => total + group.events.length,
  //   0
  // );
  // const allEvents = eventGroups.flatMap((group) => group.events);
  const { groupedEvents, flatEvents, totalEvents } = getEventDataForDay(
    selectedDay,
    recurringEvents
  );
  const filters = {
    "Semis sous abri": semisSousAbri,
    "Semis en pleine terre": semisEnPleineTerre,
    Plantation: plantation,
    Floraison: floraison,
    Récolte: recolte,
  };
  return (
    <>
      <div className="w-full md:w-[80%] h-full flex flex-col items-center justify-center py-12">
        <div className="h-full md:min-h-[800px] bg-white rounded-lg shadow overflow-hidden mx-auto w-full">
          <div className="flex justify-between items-center py-2 px-6">
            <div className="flex-col gap-2 hidden md:flex">
              <Input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Rechercher des événements"
              />
              <div className="flex gap-2">
                <BadgeComponent
                  color="#BEE7F5"
                  checked={semisSousAbri}
                  onClick={() => handleCheckboxChange(setSemisSousAbri)}
                  label="Semis sous abri"
                />
                <BadgeComponent
                  color="#D3E7A6"
                  checked={semisEnPleineTerre}
                  onClick={() => handleCheckboxChange(setSemisEnPleineTerre)}
                  label="Semis en pleine terre"
                />
                <BadgeComponent
                  color="#EBDACA"
                  checked={plantation}
                  onClick={() => handleCheckboxChange(setPlantation)}
                  label="Plantation"
                />
                <BadgeComponent
                  color="#FFD19A"
                  checked={floraison}
                  onClick={() => handleCheckboxChange(setFloraison)}
                  label="Floraison"
                />
                <BadgeComponent
                  color="#E1D9FF"
                  checked={recolte}
                  onClick={() => handleCheckboxChange(setRecolte)}
                  label="Récolte"
                />
              </div>
            </div>
            <Sheet>
              <SheetTrigger
                className={clsx(
                  buttonVariants({ variant: "ghost" }),
                  "md:hidden"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-filter-cog stroke-foreground/80"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 20l-3 1v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v1.5" />
                  <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M19.001 15.5v1.5" />
                  <path d="M19.001 21v1.5" />
                  <path d="M22.032 17.25l-1.299 .75" />
                  <path d="M17.27 20l-1.3 .75" />
                  <path d="M15.97 17.25l1.3 .75" />
                  <path d="M20.733 20l1.3 .75" />
                </svg>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetDescription>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Rechercher des événements"
                      />
                      <div className="flex gap-2">
                        <BadgeComponent
                          color="#BEE7F5"
                          checked={semisSousAbri}
                          onClick={() => handleCheckboxChange(setSemisSousAbri)}
                          label="Semis sous abri"
                        />
                        <BadgeComponent
                          color="#D3E7A6"
                          checked={semisEnPleineTerre}
                          onClick={() =>
                            handleCheckboxChange(setSemisEnPleineTerre)
                          }
                          label="Semis en pleine terre"
                        />
                        <BadgeComponent
                          color="#EBDACA"
                          checked={plantation}
                          onClick={() => handleCheckboxChange(setPlantation)}
                          label="Semis en pleine terre"
                        />
                        <BadgeComponent
                          color="#FFD19A"
                          checked={floraison}
                          onClick={() => handleCheckboxChange(setFloraison)}
                          label="Semis en pleine terre"
                        />
                        <BadgeComponent
                          color="#E1D9FF"
                          checked={recolte}
                          onClick={() => handleCheckboxChange(setRecolte)}
                          label="Semis en pleine terre"
                        />
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Button variant={"ghost"} onClick={handleToday}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar-filled stroke-foreground/20"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1zm3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16v-9.625z"
                  strokeWidth="0"
                  fill="currentColor"
                />
                <path
                  d="M12 12a1 1 0 0 1 .993 .883l.007 .117v3a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
                  strokeWidth="0"
                  fill="currentColor"
                />
              </svg>
            </Button>
            <Button variant={"ghost"} onClick={handlePrevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left stroke-foreground/90"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </Button>
            <h2 className="text-lg font-bold uppercase tracking-wide text-blue-500">
              {date.toLocaleString("default", { month: "long" })}{" "}
              {date.getFullYear()}
            </h2>
            <Button variant={"ghost"} onClick={handleNextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-right stroke-foreground/90"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </Button>
          </div>
          <div className="grid grid-cols-7 text-center text-sm px-2 md:px-0">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="py-2 border-b border-gray-200 font-semibold text-gray-700"
              >
                {day}
              </div>
            ))}
            {emptyCells}
            {dates.map((day, index) => {
              const { groupedEvents, flatEvents, totalEvents } =
                getEventDataForDay(day, recurringEvents);

              return (
                <Day
                  key={index}
                  day={day}
                  filters={filters}
                  searchValue={searchValue}
                  handleDayClick={handleDayClick}
                  groupedEvents={groupedEvents}
                />
              );
            })}

            <CalendarMobileMenu
              day={selectedDay}
              events={groupedEvents}
              filters={filters}
              searchValue={searchValue}
            />
          </div>
        </div>
      </div>
    </>
  );
};
