import { prisma } from "@/lib/prisma";

export const getAdminCategory = async ({
  categoryId,
  userId,
  userPage,
}: {
  categoryId: string;
  userId: string;
  userPage: number;
}) => {
  const category = await prisma.category.findUnique({
    where: {
      creatorId: userId,
      id: categoryId,
    },
    select: {
      id: true,
      state: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        take: 5,
        skip: Math.max(0, userPage * 5),
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
            },
          },
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

  const users = category?.users.map((user) => {
    return {
      canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...category,
    users,
  };
};
