import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const COUNT_BY_PAGE = 10;

export const getCategories = async ({
  userId,
  page = 0,
}: {
  userId?: string;
  page?: number;
}) => {
  const whereQuery = (
    userId
      ? {
          users: {
            some: {
              userId,
              canceledAt: null,
            },
          },
        }
      : {
          state: "PUBLIE",
        }
  ) satisfies Prisma.CategoryWhereInput;

  const totalCategories = await prisma.category.count({
    where: whereQuery,
  });

  const categories = await prisma.category.findMany({
    where: whereQuery,
    select: {
      name: true,
      image: true,
      presentation: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    take: COUNT_BY_PAGE,
    skip: Math.max(0, page * COUNT_BY_PAGE),
  });

  return {
    categories,
    totalCategories: Math.floor(totalCategories / COUNT_BY_PAGE),
  };
};

export type CategoriesCard = Prisma.PromiseReturnType<
  typeof getCategories
>["categories"][number];
