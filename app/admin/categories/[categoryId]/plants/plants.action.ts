"use server";

import { ServerError, authenticatedAction } from "@/lib/action";
import { getTheMiddleRank } from "@/lib/getTheMiddleRank";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const SavePlantMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  plantId: z.string(),
});

export const savePlantMove = authenticatedAction(
  SavePlantMoveSchema,
  async (data, { userId }) => {
    const category = await prisma.category.findFirst({
      where: {
        plants: {
          some: {
            id: data.plantId,
          },
        },
        creatorId: userId,
      },
    });

    if (!category) {
      throw new ServerError("This category doesn't exist");
    }

    const plant = await prisma.plant.findFirst({
      where: {
        id: data.plantId,
        categoryId: category.id,
      },
    });

    if (!plant) {
      throw new ServerError("This plant doesn't exist");
    }

    const newRank = getTheMiddleRank(data.upItemRank, data.downItemRank);

    await prisma.plant.update({
      where: {
        id: data.plantId,
      },
      data: {
        rank: newRank,
      },
    });

    return newRank;
  }
);
