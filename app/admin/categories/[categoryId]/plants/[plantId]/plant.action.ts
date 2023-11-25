"use server";

import { authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PlantDetailSchema } from "./form/plant.schema";

const PlantActionEditDetailsSchema = z.object({
  plantId: z.string(),
  data: PlantDetailSchema,
});

export const plantActionEditDetails = authenticatedAction(
  PlantActionEditDetailsSchema,
  async (props, { userId }) => {
    const plant = await prisma.plant.update({
      where: {
        id: props.plantId,
        category: {
          creatorId: userId,
        },
      },
      data: props.data,
    });

    return {
      message: "Plante mise à jour avec succès",
      plant,
    };
  }
);

const plantActionEditContentSchema = z.object({
  plantId: z.string(),
  markdown: z.string(),
});

export const plantActionEditContent = authenticatedAction(
  plantActionEditContentSchema,
  async ({ plantId, markdown }, { userId }) => {
    const plant = await prisma.plant.update({
      where: {
        id: plantId,
        category: {
          creatorId: userId,
        },
      },
      data: {
        content: markdown,
      },
    });

    return {
      message: "Plante mise à jour avec succès",
      plant,
    };
  }
);
