import { z } from "zod";

export const CATEGORY_STATE = ["BROUILLON", "PUBLIE"] as const;

export const CategoryFormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
  state: z.enum(CATEGORY_STATE),
});

export type CategoryFormSchema = z.infer<typeof CategoryFormSchema>;
