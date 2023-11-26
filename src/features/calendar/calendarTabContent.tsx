"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { PlantInfosType } from "../../../app/categories/[categoryId]/plants/[plantId]/plant.query";
import { handleEventState } from "../../../app/categories/[categoryId]/plants/[plantId]/plant.action";
import { toast } from "sonner";
import { revalidatePath } from "next/cache.js";
import { useEventHandlerStore } from "../../../app/categories/[categoryId]/plants/[plantId]/eventHandler.store";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { SubmitButton } from "@/components/form/SubmitButton";
import { UpdateConfirmation } from "./updateConfirmation";
import { MustLoggedAlert } from "@/components/ui/mustLoggedAlert";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type calendarType =
  | "nursery"
  | "seedling"
  | "plantation"
  | "flowering"
  | "harvest";

type CalendarTabContentProps = {
  data: number[];
  plant: PlantInfosType;
  calendarType: calendarType;
  bgColor: string;
  darkBgColor: string;
  color: string;
  isStillPotager: boolean;
  isReadOnly: boolean;
};

export const CalendarTabContent = ({
  data,
  plant,
  calendarType,
  bgColor,
  darkBgColor,
  color,
  isStillPotager,
  isReadOnly,
}: CalendarTabContentProps) => {
  const getDateOfWeek = (w: number, y: number) => {
    const d = 2 + (w - 1) * 7;
    return new Date(y, 0, d);
  };

  const chunk = (arr: number[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const range = chunk(data, 2);
  const { state, setState } = useEventHandlerStore();

  const isLg = useMediaQuery("(min-width: 1024px)");

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
        plantationDay: addDays(event, plant.eventPlantation ?? 0),
        pickedFlowering: true,
        floweringDay: addDays(event, plant.eventFlowering ?? 0),
        pickedHarvest: true,
        harvestDay: addDays(event, plant.eventHarvest ?? 0),
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
        floweringDay: addDays(event, plant.eventFlowering ?? 0),
        pickedHarvest: true,
        harvestDay: addDays(event, plant.eventHarvest ?? 0),
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
        floweringDay: addDays(event, plant.eventFlowering ?? 0),
        pickedHarvest: true,
        harvestDay: addDays(event, plant.eventHarvest ?? 0),
      });
      return;
    } else {
      return;
    }
  };

  const mutation = useMutation({ mutationFn: handleEventState });
  const handleAction = async () => {
    const response = await mutation.mutateAsync({
      plantId: plant.id,
      plantName: plant.name,
      plantCategory: plant.category.name,
      startDate: selectedEvent,
      typeEvent: typeEvent,
    });
    // const response = await handleEventState({
    //   plantId: plant.id,
    //   plantName: plant.name,
    //   plantCategory: plant.category.name,
    //   startDate: selectedEvent,
    //   typeEvent: typeEvent,
    // });

    // if (response?.data?.warning) {
    //   toast.warning("Veuillez sélectionner une date");
    //   return;
    // }

    if (response?.data?.error) {
      toast.error("Limite d'ajout au potager atteinte ! [Mode démo]");
    }

    if (response?.data?.success) {
      toast.success("Plante ajoutée avec succès");
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
              ? {
                  nursery: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : calendarType === "seedling"
              ? {
                  seedling: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : calendarType === "flowering"
              ? {
                  flowering: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : calendarType === "harvest"
              ? {
                  harvest: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : {
                  plantation: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
          }
          modifiersClassNames={{
            selected: `!bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
            range_middle: `!bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
          }}
        />
      ) : (
        <div className="flex flex-col items-center rounded-lg bg-secondary sm:min-h-[270px]">
          <p className="text-md font-medium">
            Pas de période{" "}
            {calendarType === "nursery"
              ? "de semis sous abri"
              : calendarType === "seedling"
              ? "de semis"
              : calendarType === "flowering"
              ? "de floraison"
              : calendarType === "harvest"
              ? "de récolte"
              : calendarType === "plantation"
              ? "de plantation"
              : ""}{" "}
            renseignée
          </p>
          <Image
            src="/helper_nothing.svg"
            alt="nothing image"
            width={160}
            height={160}
          />
        </div>
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
              ? {
                  nursery: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : calendarType === "seedling"
              ? {
                  seedling: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : calendarType === "flowering"
              ? {
                  flowering: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : calendarType === "harvest"
              ? {
                  harvest: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
              : {
                  plantation: { backgroundColor: color },
                  selected: { backgroundColor: bgColor },
                }
          }
          modifiersClassNames={{
            selected: `!bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
            range_middle: `!bg-[${bgColor}] dark:bg-[${darkBgColor}]`,
          }}
        />
      )}
      {isStillPotager ? (
        <UpdateConfirmation handleAction={handleAction} />
      ) : isReadOnly ? (
        <MustLoggedAlert />
      ) : (
        <form action={handleAction}>
          <Button disabled={!selectedEvent} className="mt-4 bg-primary">
            Ajouter au potager
          </Button>
        </form>
      )}
    </>
  );
};
