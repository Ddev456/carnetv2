import { prisma } from "@/lib/prisma";

export const getAdminPlant = async (plantId: string, userId: string) => {
  return await prisma.plant.findUnique({
    where: {
      id: plantId,
      category: {
        creatorId: userId,
      },
    },
    select: {
      content: true,
      id: true,
      categoryId: true,
      name: true,
      state: true,
      thumbnail: true,
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
    },
  });
};
