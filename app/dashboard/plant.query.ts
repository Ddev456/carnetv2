import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const COUNT_BY_PAGE = 8;

// export const getPlants = async ({
//   userId,
//   page = 0,
// }: {
//   userId: string;
//   page?: number;
// }) => {
//   const plants = await prisma.plant.findMany({
//     where: {
//       users: {
//         some: {
//           userId: userId,
//           progress: "AJOUTE",
//         },
//       },
//     },
//     select: {
//       name: true,
//       thumbnail: true,
//       content: true,
//       id: true,
//     },
//   });
//   if (!plants) {
//     return null;
//   }

//   const totalPlants = plants.length;

//   return {
//     plants,
//     totalPlants,
//   };
// };

export const getPlantsDataTable = async () => {
  const plants = await prisma.plant.findMany({
    include: {
      category: true,
    },
  });

  return {
    plants,
  };
};

export type plantsDataTable = Prisma.PromiseReturnType<
  typeof getPlantsDataTable
>["plants"];

export const getPlants = async ({
  userId,
  page = 0,
}: {
  userId?: string;
  page?: number;
}) => {
  const plants = await prisma.plant.findMany({
    where: {
      users: {
        some: {
          userId: userId,
          progress: "AJOUTE",
        },
      },
    },
    select: {
      name: true,
      thumbnail: true,
      content: true,
      water: true,
      exposition: true,
      category: true,
      id: true,
    },
  });

  const totalPlants = plants.length;

  return {
    plants,
    totalPlants,
  };
};

export type PlantsCard = Prisma.PromiseReturnType<
  typeof getPlants
>["plants"][number];

export type PlantDataTable = Prisma.PromiseReturnType<
  typeof getPlants
>["plants"];

export type PlantData = Prisma.PromiseReturnType<typeof getPlantsDataTable>;

export type PlantInfos = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    presentation: string;
    image: string;
    createdAt: Date;
    creatorId: string;
    state: "PUBLIE" | "BROUILLON";
  };
  categoryId: string;
  water: number;
  exposition: number;
  nursery: number[];
  seedling: number[];
  flowering: number[];
  plantation: number[];
  harvest: number[];
  eventFlowering: number | null;
  eventHarvest: number | null;
  eventPlantation: number | null;
  spaceBetween: number;
  spaceOnRow: number;
  type: string;
  categoryType: string;
};
