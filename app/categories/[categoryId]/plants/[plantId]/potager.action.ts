"use server";

import { authenticatedAction } from "@/lib/action";
import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const getPotager = authenticatedAction(
  z.object({
    userId: z.string(),
    plantId: z.string(),
  }),
  async ({ userId, plantId }: { userId: string; plantId: string }) => {
    const potager = await prisma.user.count({
      where: {
        id: userId,
        plantsEvents: {
          some: {
            plantId: plantId,
          },
        },
      },
    });
    return potager;
  }
);

export const handlePotager = async (plantId: string) => {
  const session = await getAuthSession();
  if (!session) {
    const isStillPotager = 0;
    return { isStillPotager };
  }
  const isStillPotager = (
    await getPotager({ userId: session.user.id || "-", plantId: plantId })
  ).data;

  return {
    isStillPotager,
  };
};
