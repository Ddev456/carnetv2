import React, { useState } from "react";
import { PlantInfosType } from "../../../app/categories/[categoryId]/plants/[plantId]/plant.query";
import { addDays } from "date-fns";
import { useEventHandlerStore } from "../../../app/categories/[categoryId]/plants/[plantId]/eventHandler.store";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { MustLoggedAlert } from "@/components/ui/mustLoggedAlert";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type calendarType =
  | "nursery"
  | "seedling"
  | "plantation"
  | "flowering"
  | "harvest";

type CalendarReadOnlyProps = {
  data: number[];
  plant: PlantInfosType;
  calendarType: calendarType;
  bgColor: string;
  darkBgColor: string;
  color: string;
  isStillPotager: boolean;
};

export const CalendarReadOnly = ({
  data,
  plant,
  calendarType,
  bgColor,
  darkBgColor,
  color,
  isStillPotager,
}: CalendarReadOnlyProps) => {
  const getDateOfWeek = (w: number, y: number) => {
    const d = 1 + (w - 1) * 7;
    return new Date(y, 0, d);
  };
  const chunk = (arr: number[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const range = chunk(data, 2);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const { state, setState } = useEventHandlerStore();

  const [selectedEvent, setSelectedEvent] = useState<Date | null>(null);
  const [typeEvent, setTypeEvent] = useState<
    "nursery" | "seedling" | "plantation"
  >("nursery");

  const handleEvent = async (
    event: Date,
    type: "nursery" | "seedling" | "plantation" | "flowering" | "harvest"
  ) => {
    if (type === "nursery") {
      setSelectedEvent(event);
      setTypeEvent(type);
      setState({
        pickedNursery: true,
        nurseryDay: event,
        pickedSeedling: false,
        seedlingDay: null,
        pickedPlantation: true,
        plantationDay: addDays(event, 45),
        pickedFlowering: true,
        floweringDay: addDays(event, 65),
        pickedHarvest: true,
        harvestDay: addDays(event, 80),
      });

      return;
    } else if (type === "seedling") {
      setSelectedEvent(event);
      setTypeEvent(type);
      setState({
        pickedNursery: false,
        nurseryDay: null,
        pickedSeedling: true,
        seedlingDay: event,
        pickedPlantation: false,
        plantationDay: null,
        pickedFlowering: true,
        floweringDay: addDays(event, 65),
        pickedHarvest: true,
        harvestDay: addDays(event, 80),
      });
      return;
    } else if (type === "plantation") {
      setSelectedEvent(event);
      setTypeEvent(type);
      setState({
        pickedNursery: false,
        nurseryDay: null,
        pickedSeedling: false,
        seedlingDay: null,
        pickedPlantation: true,
        plantationDay: event,
        pickedFlowering: true,
        floweringDay: addDays(event, 65),
        pickedHarvest: true,
        harvestDay: addDays(event, 80),
      });
      return;
    } else {
      return;
    }
  };

  return (
    <>
      {Array.isArray(range[0]) ? (
        <Calendar
          className="rounded-md border shadow"
          locale={fr}
          mode="range"
          selected={{
            from: getDateOfWeek(range[0][0], new Date().getFullYear()),
            to: getDateOfWeek(range[0][1], new Date().getFullYear()),
          }}
          defaultMonth={getDateOfWeek(range[0][0], new Date().getFullYear())}
          onDayClick={(event) => {
            handleEvent(event, calendarType);
          }}
          // footer={footer}
          showOutsideDays
          ISOWeek
          numberOfMonths={isLg ? 3 : 2}
          modifiers={
            calendarType === "nursery"
              ? { nursery: state.nurseryDay ?? new Date(Date.now()) }
              : calendarType === "seedling"
              ? { seedling: state.seedlingDay ?? new Date(Date.now()) }
              : calendarType === "flowering"
              ? { flowering: state.floweringDay ?? new Date(Date.now()) }
              : calendarType === "harvest"
              ? { harvest: state.harvestDay ?? new Date(Date.now()) }
              : { plantation: state.plantationDay ?? new Date(Date.now()) }
          }
          modifiersStyles={
            calendarType === "nursery"
              ? { nursery: { backgroundColor: color } }
              : calendarType === "seedling"
              ? { seedling: { backgroundColor: color } }
              : calendarType === "flowering"
              ? { flowering: { backgroundColor: color } }
              : calendarType === "harvest"
              ? { harvest: { backgroundColor: color } }
              : { plantation: { backgroundColor: color } }
          }
          modifiersClassNames={{
            selected: `bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
            range_middle: `bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
          }}
        />
      ) : (
        <p>Pas de période de semis sous abri renseignée</p>
      )}
      {Array.isArray(range[1]) && (
        <Calendar
          className="rounded-md border shadow"
          locale={fr}
          mode="range"
          selected={{
            from: getDateOfWeek(range[1][0], new Date().getFullYear()),
            to: getDateOfWeek(range[1][1], new Date().getFullYear()),
          }}
          defaultMonth={getDateOfWeek(range[1][0], new Date().getFullYear())}
          onDayClick={(event) => {
            handleEvent(event, calendarType);
          }}
          showOutsideDays
          ISOWeek
          numberOfMonths={isLg ? 3 : 2}
          modifiers={
            calendarType === "nursery"
              ? { nursery: state.nurseryDay ?? new Date(Date.now()) }
              : calendarType === "seedling"
              ? { seedling: state.seedlingDay ?? new Date(Date.now()) }
              : calendarType === "flowering"
              ? { flowering: state.floweringDay ?? new Date(Date.now()) }
              : calendarType === "harvest"
              ? { harvest: state.harvestDay ?? new Date(Date.now()) }
              : { plantation: state.plantationDay ?? new Date(Date.now()) }
          }
          modifiersStyles={
            calendarType === "nursery"
              ? { nursery: { backgroundColor: color } }
              : calendarType === "seedling"
              ? { seedling: { backgroundColor: color } }
              : calendarType === "flowering"
              ? { flowering: { backgroundColor: color } }
              : calendarType === "harvest"
              ? { harvest: { backgroundColor: color } }
              : { plantation: { backgroundColor: color } }
          }
          modifiersClassNames={{
            selected: `bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
            range_middle: `bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
          }}
        />
      )}
      <MustLoggedAlert />
    </>
  );
};
