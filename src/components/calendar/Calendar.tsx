"use client";

import { useEffect, useState } from "react";
import { Plants, type Plant } from "@/db/query/plant.query";
import { createPortal } from "react-dom";
import { CalendarModalContent } from "./CalendarModalContent";
import CalendarGrid from "./CalendarGrid";
import { CalendarNavigation } from "./CalendarNavigation";
import { useCalendarData } from "./useCalendarData";
import { useSession } from "next-auth/react";
import { UserPreferences } from "../../db/query/user.query";
import { Arrow1 } from "./Arrow1";
import { Arrow2 } from "./Arrow2";
import { CalendarFilters } from "./CalendarFilters";

export type EventCalendar = {
  title: string;
  icon: string;
  eventDate: Date;
  description: string;
  type: string;
};

type CalendarResponsiveProps = {
  plants: Plants;
  userPreferences: UserPreferences;
};

export const Calendar = ({
  plants,
  userPreferences,
}: CalendarResponsiveProps) => {
  const [userPrefs, setUserPrefs] = useState<UserPreferences>(userPreferences);

  const {
    date,
    weekDays,
    dates,
    setDate,
    recurringEvents,
    handleDynamicCalendar,
    handleDayClick,
    selectedDay,
    selectedDayEvents,
  } = useCalendarData(plants, userPrefs);

  const [showDynamicModal, setShowDynamicModal] = useState(false);
  const closeDynamicModal = () => setShowDynamicModal(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showDynamicModal &&
        createPortal(
          <CalendarModalContent
            closeModal={closeDynamicModal}
            handleDynamicCalendar={handleDynamicCalendar}
          />,
          document.body
        )}
      {showModal &&
        createPortal(<ModalContent closeModal={closeModal} />, document.body)}
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center bg-background/40 p-4 md:mt-4 md:p-12">
        <CalendarNavigation
          date={date}
          dates={dates}
          setDate={setDate}
          setShowDynamicModal={setShowDynamicModal}
        />
        {/* <CalendarFilters /> */}
        <div className="mx-auto h-full w-full overflow-hidden rounded-lg border-borders bg-secondary/20 shadow md:min-h-[800px]">
          <div className="flex items-center justify-between px-6 py-2">
            <div className="hidden flex-col gap-2 md:flex"></div>
          </div>
          <CalendarGrid
            selectedDay={selectedDay}
            date={date}
            weekDays={weekDays}
            dates={dates}
            recurringEvents={recurringEvents}
            handleDayClick={handleDayClick}
            selectedDayEvents={selectedDayEvents}
          />
          C
        </div>
      </div>
    </>
  );
};

type ModalContentProps = {
  closeModal: () => void;
};

export const ModalContent = ({ closeModal }: ModalContentProps) => {
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-background/80"
      ></div>
      <div className="fixed z-50 flex h-full w-full translate-y-[-80%] items-center justify-center md:translate-y-[-90%]">
        <Arrow1 />

        <div className="fixed w-[80%] rounded bg-background p-8 md:w-[40%]">
          <h2 className="text-md mb-4 md:text-2xl">
            Guide d utilisation rapide
          </h2>
          <p className="mb-4 text-sm">
            Parcourez le calendrier des différentes cultures ... Vous pourrez
            retrouver ici les dates concernant le semis, la plantation de chaque
            plante etc... Personnalisez-le en générant dynamiquement les dates
            de votre calendrier en fonction de votre climat et de vos
            préférences de jardinage.
          </p>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={closeModal}
          >
            Passer
          </button>
        </div>
        <Arrow2 />
      </div>
    </>
  );
};
