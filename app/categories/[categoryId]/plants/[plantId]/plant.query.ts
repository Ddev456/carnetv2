import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getPlant = async (plantId: string, userId = "-") => {
  const plant = await prisma.plant.findUnique({
    where: {
      id: plantId,
      state: {
        not: "BROUILLON",
      },
    },
    select: {
      id: true,
      content: true,
      name: true,
      state: true,
      category: true,
      users: {
        where: {
          userId: userId,
        },
        select: {
          id: true,
          progress: true,
        },
      },
    },
  });

  if (!plant) {
    return null;
  }

  return {
    ...plant,
    progress: plant.users[0]?.progress ?? "NONFAVORI",
  };
};

export type PlantType = NonNullable<Prisma.PromiseReturnType<typeof getPlant>>;

export const getPlantInfos = async (plantId: string) => {
  const plantInfos = await prisma.plant.findUnique({
    where: {
      id: plantId,
    },
    select: {
      id: true,
      content: true,
      name: true,
      state: true,
      category: true,
      nursery: true,
      seedling: true,
      plantation: true,
      flowering: true,
      harvest: true,
      type: true,
      exposition: true,
      water: true,
      spaceBetween: true,
      spaceOnRow: true,

      eventPlantation: true,
      eventFlowering: true,
      eventHarvest: true,
    },
  });

  return plantInfos;
};

export type PlantInfosType = NonNullable<
  Prisma.PromiseReturnType<typeof getPlantInfos>
>;
