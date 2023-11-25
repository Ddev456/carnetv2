"use server";

import { authenticatedAction } from "@/lib/action";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const handlePlantState = authenticatedAction(
  z.object({
    plantId: z.string(),
    progress: z.enum(["AJOUTE", "NONFAVORI"]),
  }),
  async ({ plantId, progress }, { userId }) => {
    const updatedPlantOnUser = await prisma.plantOnUser.update({
      where: {
        userId_plantId: {
          plantId,
          userId,
        },
      },
      data: {
        progress,
      },
      select: {
        plant: {
          select: {
            rank: true,
            categoryId: true,
            id: true,
          },
        },
      },
    });

    const nextPlant = await prisma.plant.findFirst({
      where: {
        categoryId: updatedPlantOnUser.plant.categoryId,
        rank: {
          gt: updatedPlantOnUser.plant.rank,
        },
        state: {
          not: "BROUILLON",
        },
      },
      orderBy: {
        rank: "asc",
      },
    });

    revalidatePath(
      `/categories/${updatedPlantOnUser.plant.categoryId}/plants/${plantId}`
    );

    if (!nextPlant) {
      return;
    }

    redirect(
      `/categories/${updatedPlantOnUser.plant.categoryId}/plants/${nextPlant.id}`
    );
  }
);

export const handleEventState = authenticatedAction(
  z.object({
    plantId: z.string(),
    plantName: z.string(),
    plantCategory: z.string(),
    startDate: z.date().nullable(),
    typeEvent: z.enum(["nursery", "seedling", "plantation"]).nullable(),
  }),
  async (
    { plantId, plantName, plantCategory, startDate, typeEvent },
    { userId }
  ) => {
    const isAuthorized = getRequiredAuthSession();

    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }

    // if (!startDate) {
    //   return { warning: true };
    // }

    const countEventsLimit = await prisma.userNotifications.count({
      where: {
        userId: userId,
      },
    });

    if (countEventsLimit >= 10) return { error: true };

    const countEvent = await prisma.userNotifications.count({
      where: {
        plantId: plantId,
        userId: userId,
      },
    });

    const isExist = countEvent !== 0;

    if (isExist) {
      const eventId = await prisma.userNotifications.findFirst({
        where: {
          plantId: plantId,
          userId: userId,
        },
        select: {
          id: true,
        },
      });

      if (eventId) {
        await prisma.userNotifications.update({
          where: {
            id: eventId.id,
          },
          data: {
            typeEvent: typeEvent || "nursery",
            startDate: startDate || new Date(Date.now()),
          },
        });
      }
    } else {
      await prisma.userNotifications.create({
        data: {
          userId: userId,
          plantId: plantId,
          plantName: plantName,
          plantCategory: plantCategory,
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

    const countEvent = await prisma.userNotifications.count({
      where: {
        plantId: plantId,
        userId: userId,
      },
    });

    const isExist = countEvent !== 0;

    if (isExist) {
      const eventId = await prisma.userNotifications.findFirst({
        where: {
          plantId: plantId,
          userId: userId,
        },
        select: {
          id: true,
        },
      });

      if (eventId) {
        await prisma.userNotifications.update({
          where: {
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

    const countEventsLimit = await prisma.userNotifications.count({
      where: {
        userId: userId,
      },
    });

    if (countEventsLimit >= 10) return { error: true };
  }
);
