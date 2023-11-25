"use server";

import { getPlantsDataTable } from "../../../app/categories/[categoryId]/plants/plant.query";
import { PlantsDataView } from "./PlantsDataView";
import { columns } from "./columns";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const DataView = async () => {
  const { plants } = await getPlantsDataTable();

  const user = await getAuthSession();
  const userId = user?.user.id;

  const getUserPotager = async (userId?: string) => {
    if (!userId) return;
    const potager = await prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        plantsEvents: {
          select: {
            plantId: true,
            removed: true,
          },
        },
      },
    });

    return { potager };
  };

  const userPotager = await getUserPotager(userId);

  const userPotagerIds = userPotager?.potager.map((plantsEvents) => {
    return plantsEvents?.["plantsEvents"].map((plant) => {
      return { id: plant.plantId, removed: plant.removed };
    });
  });

  const flatIds = userPotagerIds?.flat();

  const dataToTable = plants.map((plant) => {
    return {
      id: plant.id,
      name: plant.name,
      categoryId: plant.category.id,
      category: plant.category.name,
      water: plant.water,
      exposition: plant.exposition,
      isPotager: flatIds?.some((item) => item.id === plant.id && !item.removed)
        ? true
        : false,
      isReadOnly: !Boolean(user),
    };
  });

  // return <PlantsDataView data={dataToTable} />;
  return <PlantsDataView data={dataToTable} columns={columns} />;
};
