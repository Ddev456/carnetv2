import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getNotifications = async ({ userId }: { userId?: string }) => {
  const notifications = await prisma.userNotifications.findMany({
    where: {
      userId: userId,
    },
    select: {
      plantId: true,
      plantName: true,
      plantCategory: true,
      updatedAt: true,
    },
  });

  return { notifications };
};

export type NotificationsType = Prisma.PromiseReturnType<
  typeof getNotifications
>["notifications"];
