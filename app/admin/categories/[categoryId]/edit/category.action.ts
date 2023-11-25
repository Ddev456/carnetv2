"use server";

import { authenticatedAction } from "@/lib/action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { CategoryFormSchema } from "./category.schema";

const CategoryActionEditProps = z.object({
  categoryId: z.string(),
  data: CategoryFormSchema,
});

export const categoryActionEdit = authenticatedAction(
  CategoryActionEditProps,
  async (props, { userId }) => {
    const category = await prisma.category.update({
      where: {
        id: props.categoryId,
        creatorId: userId,
      },
      data: props.data,
    });

    return {
      message: "Category updated successfully",
      category,
    };
  }
);

export const categoryActionCreate = authenticatedAction(
  CategoryFormSchema,
  async (props, { userId }) => {
    const category = await prisma.category.create({
      data: {
        ...props,
        creatorId: userId,
      },
    });

    return {
      message: "Category created successfully",
      category,
    };
  }
);
