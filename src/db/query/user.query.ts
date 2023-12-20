import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const userNotifications = Prisma.validator<Prisma.UserSelect>()({
  plantsEvents: {
    select: {
      plantId: true,
      plantName: true,
      startDate: true,
      type: true,
      read: true,
      message: true,
      removed: true,
      updatedAt: true,
    },
    orderBy: {
      startDate: "asc",
    },
  },
});

export const getUserNotifications = async (userId?: string) => {
  const data = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    include: userNotifications,
  });

  return { data: data?.plantsEvents };
};

export const getUserPreferences = async (userId?: string) => {
  if (!userId)
    return {
      department: 56,
      gardeningDays: [0, 1, 2, 3, 4, 5, 6],
    };
  const data = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      preferences: {
        select: {
          department: true,
          gardeningDays: true,
        },
      },
    },
  });

  return data.preferences[0];
};

export type UserPreferences = Prisma.PromiseReturnType<
  typeof getUserPreferences
>;

export type Notifications = Prisma.PromiseReturnType<
  typeof getUserNotifications
>["data"];

export type Notification = Prisma.PromiseReturnType<
  typeof getUserNotifications
>["data"][0];
