import { getPlantsDataTable } from "../dashboard/plant.query";
import { Explorer } from "./Explorer";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ExplorerPage() {
  const { plants } = await getPlantsDataTable();
  const session = await getAuthSession();
  const potager = await prisma.userNotifications.findMany({
    where: {
      userId: session?.user.id,
      removed: false,
    },
    select: {
      plantId: true,
    },
    orderBy: {
      updatedAt: "asc",
    },
  });

  const userPotager = potager.map((plant) => {
    return plant.plantId;
  });

  console.log(userPotager);

  return (
    <Explorer
      data={{
        plants: plants,
        // categories: categories,
        isConnected: session?.user ? true : false,
        userPotager: userPotager,
      }}
    />
  );
}
