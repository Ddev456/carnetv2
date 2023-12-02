"use server";

import { authenticatedAction } from "@/lib/action";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const handleEventState = authenticatedAction(
  z.object({
    plantId: z.string(),
    plantName: z.string(),
    startDate: z.date().nullable(),
    typeEvent: z.enum(["nursery", "seedling", "plantation"]).nullable(),
  }),
  async ({ plantId, plantName, startDate, typeEvent }, { userId }) => {
    const isAuthorized = getRequiredAuthSession();

    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }

    // if (!startDate) {
    //   return { warning: true };
    // }

    const countEventsLimit = await prisma.notification.count({
      where: {
        userId: userId,
        removed: true,
      },
    });

    if (countEventsLimit >= 10) return { error: true };

    const isRemoved = await prisma.notification.findFirst({
      where: {
        plantId: plantId,
        userId: userId,
      },
      select: {
        removed: true,
      },
    });

    const countEvent = await prisma.notification.count({
      where: {
        plantId: plantId,
        userId: userId,
      },
    });

    const isPotager = countEvent !== 0;

    if (isRemoved && isPotager) {
      const eventId = await prisma.notification.findFirst({
        where: {
          plantId: plantId,
          userId: userId,
        },
        select: {
          id: true,
        },
      });

      if (eventId) {
        await prisma.notification.update({
          where: {
            id: eventId.id,
          },
          data: {
            typeEvent: typeEvent || "nursery",
            startDate: startDate || new Date(Date.now()),
            removed: false,
          },
        });
      }
    } else {
      await prisma.notification.create({
        data: {
          userId: userId,
          plantId: plantId,
          plantName: plantName,
          typeEvent: typeEvent || "nursery",
          startDate: startDate || new Date(Date.now()),
        },
      });
    }

    revalidatePath(`/explorer`);

    return {
      success: true,
    };
  }
);
export const handleRemovePotager = authenticatedAction(
  z.object({
    plantId: z.string(),
  }),
  async ({ plantId }, { userId }) => {
    const isAuthorized = getRequiredAuthSession();

    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }

    // if (!startDate) {
    //   return { warning: true };
    // }

    const countEvent = await prisma.notification.count({
      where: {
        plantId: plantId,
        userId: userId,
        removed: false,
      },
    });

    const isExist = countEvent !== 0;

    if (isExist) {
      const eventId = await prisma.notification.findFirst({
        where: {
          plantId: plantId,
          userId: userId,
        },
        select: {
          id: true,
        },
      });

      if (eventId) {
        await prisma.notification.update({
          where: {
            userId: userId,
            id: eventId.id,
          },
          data: {
            removed: true,
          },
        });
      }
    } else {
      return;
    }

    revalidatePath(`/explorer`);

    return {
      update: true,
    };
  }
);

export const limitPotager = authenticatedAction(
  z.object({}),
  async ({}, { userId }) => {
    const isAuthorized = getRequiredAuthSession();

    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }

    const countEventsLimit = await prisma.notification.count({
      where: {
        userId: userId,
      },
    });

    if (countEventsLimit >= 10) return { error: true };
  }
);
