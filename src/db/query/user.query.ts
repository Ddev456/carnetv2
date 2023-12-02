import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const userNotifications = Prisma.validator<Prisma.UserSelect>()({
  plantsEvents: {
    select: {
      plantId: true,
      plantName: true,
      startDate: true,
      typeEvent: true,
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

export type Notifications = Prisma.PromiseReturnType<
  typeof getUserNotifications
>["data"];

export type Notification = Prisma.PromiseReturnType<
  typeof getUserNotifications
>["data"][0];