import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPlants = async () => {
  const data = await prisma.plant.findMany({
    select: {
      id: true,
      name: true,
      cultivationPeriods: {
        select: {
          id: true,
          coversowingPeriod: true,
          sowingPeriod: true,
          plantingPeriod: true,
          transplantingPeriod: true,
          floweringPeriod: true,
          harvestingPeriod: true,
          plantId: true,
          periodType: true,
        },
      },
      thumbnail: true,
      icon: true,
      description: true,
      advice: true,
      vegetationZero: true,
      optimalTemp: true,
      growingTime: true,
      readyToPlantTime: true,
      type: true,
      exposition: true,
      water: true,
      spaceBetween: true,
      spaceOnRow: true,
      seedMinTemp: true,
      seedMaxTemp: true,
      seedDepth: true,
      emergence: true,
      nitrogenN: true,
      phosphorusP: true,
      potassiumK: true,
      level: true,
      efficiency: true,
      conservation: true,
      isHardiness: true,
      categoryType: true,
      createdAt: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return { data };
};

export type Plants = Prisma.PromiseReturnType<typeof getPlants>["data"];

export type Plant = Prisma.PromiseReturnType<typeof getPlants>["data"][0];
