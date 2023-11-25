import { z } from "zod";

export const PLANT_STATE = ["BROUILLON", "PUBLIE"] as const;

export const PlantDetailSchema = z.object({
  name: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  state: z.enum(PLANT_STATE),
  thumbnail: z.string().url(),
  type: z.string().min(1).max(255),
  seedling: z.array(z.number().int()),
  nursery: z.array(z.number().int()),
  plantation: z.array(z.number().int()),
  flowering: z.array(z.number().int()),
  harvest: z.array(z.number().int()),
  exposition: z.number().int(),
  water: z.number().int(),
  spaceBetween: z.number().int(),
  spaceOnRow: z.number().int(),
  seedMinTemp: z.number().int(),
  seedMaxTemp: z.number().int(),
  seedDepth: z.number().int(),
  emergence: z.number().int(),
  optimalTemp: z.number().int(),
  nitrogenN: z.number().int(),
  phosphorusP: z.number().int(),
  potassiumK: z.number().int(),
  level: z.number().int(),
  efficiency: z.number().int(),
  conservation: z.number().int(),
  isHardiness: z.boolean(),
});

export type PlantDetailSchema = z.infer<typeof PlantDetailSchema>;
