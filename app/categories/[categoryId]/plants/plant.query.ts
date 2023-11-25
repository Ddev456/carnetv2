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
    select: {
      name: true,
      category: true,
      id: true,
      water: true,
      exposition: true,
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
