import { useState, useEffect, useMemo } from "react";
import temperatureAvg from "./tempsByWeek.json";
import { DynamicData, dynamic } from "./dynamicGen";
import { EventCalendar } from "./Calendar";
import { Plant, Plants } from "../../db/query/plant.query";
import { useFilter } from "./useFilter";
import { UserPreferences } from "../../db/query/user.query";
import React from "react";
import Image from "next/image";

export const useCalendarData = (plants: Plants, userPrefs: UserPreferences) => {
  const { gardenActions } = useFilter();

  const [selectedDepartment, setSelectedDepartment] = useState(
    userPrefs.department
  );
  const [selectedDays, setSelectedDays] = useState(userPrefs.gardeningDays);

  const filteredTemperatureAvg = useMemo(
    () =>
      temperatureAvg.map((item) => ({
        ...item,
        temps: item.temps.filter((temp) => temp !== null),
      })),
    []
  );

  const [dynamicData, setDynamicData] = useState<DynamicData[]>([]);

  useEffect(() => {
    // const temps = filteredTemperatureAvg.find(
    //   (temp) => temp.deptCode === selectedDepartment
    // ).temps;
    const temperatureAvg = filteredTemperatureAvg.find(
      (temp) => temp.deptCode === selectedDepartment
    );

    if (!temperatureAvg) {
      throw new Error(
        `No temperature average found for department ${selectedDepartment}`
      );
    }

    const temps = temperatureAvg.temps;

    setDynamicData(dynamic(plants, temps, selectedDays));
  }, [plants, filteredTemperatureAvg, selectedDepartment, selectedDays]);

  const handleDynamicCalendar = (
    department: string,
    userGardeningDays: number[]
  ) => {
    setSelectedDepartment(department);
    setSelectedDays(userGardeningDays);
  };

  const currentDate = new Date(Date.now());
  const [date, setDate] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );

  const dates = useMemo(() => {
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
    return dates;
  }, [date]);

  const [selectedDay, setSelectedDay] = useState<Date>(date);

  const allEvents = useMemo(
    () =>
      dynamicData.flatMap((plantData) => ({
        eventDate: plantData.date,
        title: getTitle(
          plantData,
          plants[
            plants.findIndex((plant) => plant.name === plantData.plantName)
          ]
        ),
        icon: plants[
          plants.findIndex((plant) => plant.name === plantData.plantName)
        ].icon,
        description: getDescription(plantData),
        // colorCode:
        //   gardenActions.find((action) => action.type === plantData.stage)
        //     ?.color ?? "",
        type: plantData.stage,
      })),
    [dynamicData, gardenActions]
  );

  const [selectedDayEvents, setSelectedDayEvents] = useState<EventCalendar[]>(
    []
  );
  const [recurringEvents, setRecurringEvents] = useState<EventCalendar[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDayEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.eventDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    });
    setSelectedDayEvents(currentDayEvents);
    setRecurringEvents(allEvents);
  }, [allEvents]);

  const handleDayClick = (day: Date, events: EventCalendar[]) => {
    setSelectedDay(day);
    setSelectedDayEvents(events);
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const monthDays = useMemo(
    () =>
      new Array(getDaysInMonth(date)).fill(null).map((_, index) => index + 1),
    [date]
  );

  const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return {
    selectedDepartment,
    setSelectedDepartment,
    selectedDays,
    setSelectedDays,
    dynamicData,
    handleDynamicCalendar,
    date,
    setDate,
    dates,
    selectedDay,
    setSelectedDay,
    allEvents,
    selectedDayEvents,
    recurringEvents,
    handleDayClick,
    monthDays,
    weekDays,
  };
};

function getTitle(plantData: DynamicData, plant: Plant): string {
  switch (plantData.stage) {
    case "SOWING":
      return "Semis";
    case "COVERSOWING":
      return "Semis SA";
    case "TRANSPLANTING":
      return "Repiquage";
    case "PLANTING":
      return "Plantation";
    default:
      return "";
  }
}
function getDescription(plantData: DynamicData): string {
  switch (plantData.stage) {
    case "SOWING":
      return `Date optimale pour le semis en pleine terre de ${plantData.plantName}`;
    case "COVERSOWING":
      return `Date optimale pour le semis sous abri de ${plantData.plantName}`;
    case "TRANSPLANTING":
      return `Date optimale pour le repiquage de ${plantData.plantName}`;
    case "PLANTING":
      return `Date optimale pour la plantation de ${plantData.plantName}`;
    default:
      return "";
  }
}
