import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
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
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8 rounded-xl bg-primary/10">
        <div className="p-8">
          <div className="flex items-center justify-between space-y-2">
            <p className="text-xl text-foreground">
              Retrouvez ici toutes les fiches des plantes potagères
            </p>
            {/* <div>
              <Image
                className="z-20 translate-y-[-7rem]"
                src="/logo_helper.svg"
                width={120}
                height={120}
                alt="helper_logo"
              />
            </div> */}
          </div>
          <Explorer
            data={{
              plants: plants,
              // categories: categories,
              isConnected: session?.user ? true : false,
              userPotager: userPotager,
            }}
          />
          {/* <PlantsComboBox plants={data} onSelect={onSelected} />
      <CalendarView
        plant={selected}
        calendarTypes={calendarTypes}
        bgColor=""
        darkBgColor=""
      />
          <DataView /> */}
        </div>
      </LayoutContent>
    </Layout>
  );
}
