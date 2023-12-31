import { Suspense } from "react";
import { Explorer } from "../../src/components/explorer/Explorer";
import { getAuthSession } from "@/lib/auth";
import { type Plant, getPlants } from "@/db/query/plant.query";
import { getUserNotifications } from "@/db/query/user.query";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function ExplorerPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const plants = await getPlants();
  const session = await getAuthSession();
  const isUser = session?.user ? true : false;

  const notifications = isUser
    ? await getUserNotifications(session?.user?.id)
    : null;
  const userPotager = notifications?.data?.filter((plant) => {
    !plant.removed;
  });
  // const userPotagerId = userPotager?.map((plant) => plant.plantId);

  // const userPotagerId = userPotager
  //   ?.map((plant) => plant.plantId)
  //   .filter((id) => id !== null) as string[];

  const userPotagerId = userPotager
    ?.map((plant) => plant.plantId?.toString())
    .filter((id): id is string => id !== null);

  const query = searchParams?.query || "";
  const plantQuery = plants.data.filter((plant: Plant) => {
    return plant.name.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <Suspense>
      <Explorer
        data={{
          plants: query ? plantQuery : plants.data,
          isConnected: session?.user ? true : false,
          userPotager: userPotagerId,
        }}
        query={query}
      />
    </Suspense>
  );
}
