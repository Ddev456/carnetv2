import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCategoryPlants = async ({
  categoryId,
  userId,
}: {
  categoryId: string;
  userId: string;
}) => {
  return await prisma.category.findFirst({
    where: {
      id: categoryId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      plants: {
        orderBy: {
          rank: "asc",
        },
        select: {
          id: true,
          name: true,
          state: true,
          categoryId: true,
          rank: true,
        },
      },
    },
  });
};

export type AdminPlantItemType = NonNullable<
  Prisma.PromiseReturnType<typeof getCategoryPlants>
>["plants"][number];
