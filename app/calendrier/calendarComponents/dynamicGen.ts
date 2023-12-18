import temperatureAvg from "./tempsByWeek.json";
import { type Plant } from "../../../src/db/query/plant.query";
import { addDays, getWeek } from "date-fns";

// 0 = sowing 1 = planting 2 = coverSowing 3 = transplanting 4 = flowering 5 = harvesting

// Récupérer le département de l'utilisateur
const userDept = "02";
// jours de jardinage préférés par l'utilisateur
// lundi = 1 mardi = 2 mercredi = 3 jeudi = 4 vendredi = 5 samedi = 6 dimanche = 0
const userGardeningDays = [0, 2, 6];
// Filtrer le tableau pour éliminer les valeurs null
const filteredTemperatureAvg = temperatureAvg.map((item) => {
  return {
    ...item,
    temps: item.temps.filter((temp) => temp !== null),
  };
});

export type Stage =
  | "SOWING"
  | "PLANTING"
  | "COVERSOWING"
  | "TRANSPLANTING"
  | "FLOWERING"
  | "HARVESTING";

export type Period = {
  startWeek: number;
  endWeek: number;
  periodType: Stage;
};

export interface DynamicData {
  stage: Stage;
  date: Date;
  plantId: string;
  plantName: string;
  isWithinPeriod: boolean;
}

interface UserIteration {
  plantId: string;
  SOWING?: { iteration: number; interval: number };
  COVERSOWING?: { iteration: number; interval: number };
  PLANTING?: { iteration: number; interval: number };
  TRANSPLANTING?: { iteration: number; interval: number };
  FLOWERING?: { iteration: number; interval: number };
  HARVESTING?: { iteration: number; interval: number };
}

const userIterations: UserIteration[] = [
  {
    plantId: "clq3v0amw0000tlxks6x93seq", //id de la Tomate
    COVERSOWING: {
      iteration: 2,
      interval: 4,
    },
    TRANSPLANTING: {
      iteration: 2,
      interval: 1,
    },
  },
];

// Récupérer les températures de l'utilisateur en fonction de son code dept
const temps = filteredTemperatureAvg.find((temp) => temp.deptCode === userDept);
if (!temps) {
  throw new Error(`No temperature data found for department code ${userDept}`);
}
let climate = temps.temps;

let lastGardeningDay = -1;

function generateIdealDate(
  idealStartWeekIndex: number,
  daysToAdd: number,
  userGardeningDays: number[],
  // gardeningDayIndex: number,
  gardeningDayIndices: { index: number },
  period: Period,
  plant: Plant
) {
  let startDate = new Date(new Date().getFullYear(), 0, 1);

  let dayOfWeek = startDate.getDay();
  let desiredDayOfWeek;
  let idealDate;

  do {
    desiredDayOfWeek =
      userGardeningDays[gardeningDayIndices.index % userGardeningDays.length];
    let daysDifference = (7 + desiredDayOfWeek - dayOfWeek) % 7;
    idealDate = addDays(
      startDate,
      idealStartWeekIndex * 7 + daysToAdd + daysDifference
    );
    gardeningDayIndices.index++;
  } while (!userGardeningDays.includes(idealDate.getDay()));

  let dateObject = {
    stage: period.periodType,
    date: idealDate,
    isWithinPeriod: checkIfDateIsWithinPeriod(idealDate, period),
    plantId: plant.id,
    plantName: plant.name,
  };

  return dateObject;
}

function checkIfDateIsWithinPeriod(date: Date, period: Period): boolean {
  let weekOfYear = getWeek(date);
  return weekOfYear >= period.startWeek && weekOfYear <= period.endWeek;
}

const calculateOptimalDate = (plant: Plant) => {
  let gardeningDayIndices = { index: 0 };
  const culturePeriods = plant.culturePeriods;
  const CONSTANT = 0.8;
  let tempDiff = plant.optimalTemp - plant.vegetationZero;
  let idealStartTemp = plant.optimalTemp - tempDiff * CONSTANT;
  let gardeningDayIndex = 0;
  let dates: DynamicData[] = [];

  function calculateIdealStartWeekIndex(
    startWeekIndex: number,
    endWeekIndex: number,
    climate: any[],
    idealStartTemp: number
  ) {
    let idealStartWeekIndex = -1;

    // Boucler sur les semaines de la période de culture
    for (
      let i = startWeekIndex;
      i < endWeekIndex && i <= climate.length - 5;
      i++
    ) {
      const fiveWeeks = climate.slice(i, i + 5);
      if (
        fiveWeeks.every(
          (week) => week !== null && week.tempAvg > idealStartTemp
        )
      ) {
        idealStartWeekIndex = i;
        break;
      }
    }

    return idealStartWeekIndex;
  }

  for (let period of culturePeriods) {
    // let idealDate = new Date();
    let idealDate = new Date(new Date().getFullYear(), 0, 1);
    let startWeekIndex = period.startWeek;
    let endWeekIndex = period.endWeek;

    let idealStartWeekIndex = calculateIdealStartWeekIndex(
      startWeekIndex,
      endWeekIndex,
      climate,
      idealStartTemp
    );
    if (
      period.periodType === "SOWING" ||
      period.periodType === "PLANTING" ||
      period.periodType === "COVERSOWING" ||
      period.periodType === "TRANSPLANTING"
    ) {
      // let idealStartWeekIndex = -1;

      // Boucler sur les semaines de la période de culture
      // for (
      //   let i = startWeekIndex;
      //   i < endWeekIndex && i <= climate.length - 5;
      //   i++
      // ) {
      //   const fiveWeeks = climate.slice(i, i + 5);
      //   if (
      //     fiveWeeks.every(
      //       (week) => week !== null && week.tempAvg > idealStartTemp
      //     )
      //   ) {
      //     idealStartWeekIndex = i;
      //     break;
      //   }
      // }

      let gardeningDayIndex = 0;
      if (period.periodType === "SOWING" || period.periodType === "PLANTING") {
        if (idealStartWeekIndex !== -1) {
          let dateObject = generateIdealDate(
            idealStartWeekIndex,
            0,
            userGardeningDays,
            gardeningDayIndices,
            period,
            plant
          );
          dates.push(dateObject);
          gardeningDayIndex++;
        }
      }
      if (period.periodType === "COVERSOWING") {
        let dateObject = generateIdealDate(
          idealStartWeekIndex,
          -plant.readyToPlantTime,
          userGardeningDays,
          gardeningDayIndices,
          period,
          plant
        );
        dates.push(dateObject);
        gardeningDayIndex++;
      }
      if (period.periodType === "TRANSPLANTING") {
        let dateTPObject = generateIdealDate(
          idealStartWeekIndex,
          +plant.readyToPlantTime + 21,
          userGardeningDays,
          gardeningDayIndices,
          period,
          plant
        );
        dates.push(dateTPObject);

        gardeningDayIndex++;
      }
    }

    if (userIterations) {
      let matchingIteration = userIterations.find(
        (iteration) => iteration.plantId === plant.id
      );
      if (matchingIteration && matchingIteration[period.periodType]) {
        let iteration = matchingIteration[period.periodType]?.iteration || 1;
        let interval = matchingIteration[period.periodType]?.interval || 1;
        const startIterationDate = new Date(idealDate);
        for (let userIteration of userIterations) {
          for (let i = 1; i < iteration; i++) {
            const coverSowingDTO = -plant.readyToPlantTime + i * interval * 7;
            const transplantingDTO = +plant.readyToPlantTime + i * interval * 7;

            let dateObject = generateIdealDate(
              idealStartWeekIndex,
              period.periodType === "COVERSOWING"
                ? coverSowingDTO
                : transplantingDTO,
              userGardeningDays,
              gardeningDayIndices,
              period,
              plant
            );
            dates.push(dateObject);
            gardeningDayIndex++;

            // let dateTPObject = generateIdealDate(
            //   idealStartWeekIndex,
            //   +plant.readyToPlantTime + 21 + i * interval * 7,
            //   userGardeningDays,
            //   gardeningDayIndices,
            //   period,
            //   plant
            // );
            // dates.push(dateTPObject);
            // gardeningDayIndex++;
          }
        }
      }
    }
  }

  return dates;
};

export const dynamic = (plants: Plant[]) => {
  let allDates: DynamicData[] = []; // Créez un tableau pour stocker toutes les dates

  for (let plant of plants) {
    let plantDates = calculateOptimalDate(plant); // Calculez les dates pour chaque plante
    allDates.push(...plantDates); // Ajoutez les dates calculées au tableau allDates
  }

  return allDates;
};
