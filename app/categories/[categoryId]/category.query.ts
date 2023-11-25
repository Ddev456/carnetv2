import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCategory = async ({
  categoryId,
  userId = "-",
}: {
  categoryId: string;
  userId?: string;
}) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        where: {
          userId,
        },
        select: {
          canceledAt: true,
          id: true,
        },
      },
      plants: {
        where: {
          state: {
            in: ["BROUILLON", "PUBLIE"],
          },
        },
        orderBy: {
          rank: "asc",
        },
        select: {
          name: true,
          id: true,
          categoryId: true,
          state: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },

      _count: {
        select: {
          plants: true,
          users: true,
        },
      },
    },
  });

  if (!category) {
    return null;
  }

  const plants = category.plants.map((plant) => {
    const progress = plant.users[0]?.progress ?? "NOT_STARTED";
    return {
      ...plant,
      progress,
    };
  });

  return {
    ...category,
    isEnrolled: category.users.length > 0 && !category.users[0].canceledAt,
    isCanceled: category.users.length > 0 && !!category.users[0].canceledAt,
    plants,
  };
};

export type CategoryType = NonNullable<
  Prisma.PromiseReturnType<typeof getCategory>
>;

export type CategoryPlantItem = CategoryType["plants"][0];
