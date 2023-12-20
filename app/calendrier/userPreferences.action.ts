"use server";

import { authenticatedAction } from "@/lib/action";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const handlePreferences = authenticatedAction(
  z.object({
    gardeningDays: z.array(z.number()),
    department: z.string(),
  }),
  async ({ gardeningDays, department }, { userId }) => {
    const isAuthorized = getRequiredAuthSession();

    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }

    await prisma.userPreferences.upsert({
      where: {
        userId: userId,
      },
      update: {
        gardeningDays: gardeningDays,
        department: department,
      },
      create: {
        gardeningDays: gardeningDays,
        department: department,
        userId: userId,
      },
    });

    revalidatePath(`/calendrier`);

    return {
      success: true,
    };
  }
);
