import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// export const getPlantsDataTable = async () => {
//   const plants = await prisma.plant.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   return {
//     plants,
//   };
// };

// export type plantsDataTable = Prisma.PromiseReturnType<
//   typeof getPlantsDataTable
// >["plants"];

// export type PlantData = Prisma.PromiseReturnType<typeof getPlantsDataTable>;

// export type PlantInfos = {
//   id: string;
//   name: string;
//   categoryId: string;
//   water: number;
//   exposition: number;
//   nursery: number[];
//   seedling: number[];
//   flowering: number[];
//   plantation: number[];
//   harvest: number[];
//   eventFlowering: number | null;
//   eventHarvest: number | null;
//   eventPlantation: number | null;
//   spaceBetween: number;
//   spaceOnRow: number;
//   type: string;
//   categoryType: string;
// };
