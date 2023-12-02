import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPlants = async () => {
  const data = await prisma.plant.findMany({
    select: {
      id: true,
      name: true,
      content: true,
      type: true,
      seedling: true,
      nursery: true,
      plantation: true,
      flowering: true,
      harvest: true,
      exposition: true,
      water: true,
      spaceBetween: true,
      spaceOnRow: true,
      seedMinTemp: true,
      seedMaxTemp: true,
      seedDepth: true,
      emergence: true,
      optimalTemp: true,
      nitrogenN: true,
      phosphorusP: true,
      potassiumK: true,
      level: true,
      efficiency: true,
      conservation: true,
      isHardiness: true,
      categoryType: true,
      eventPlantation: true,
      eventFlowering: true,
      eventHarvest: true,
      createdAt: true,
      categoryId: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return { data };
};

export type Plants = Prisma.PromiseReturnType<typeof getPlants>["data"];

export type Plant = Prisma.PromiseReturnType<typeof getPlants>["data"][0];
