import { SubmitButton } from "@/components/form/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MdxProse } from "./MdxProse";
import { OpenPlantNavigationButton } from "./OpenPlantNavigationButton";
import { handlePlantState } from "./plant.action";
import { getPlant, getPlantInfos } from "./plant.query";
import {
  AlignHorizontalSpaceAround,
  CloudSun,
  Droplets,
  Space,
  Sprout,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { handlePotager } from "./potager.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarTabContent } from "@/features/calendar/calendarTabContent";
import { Badge } from "@/components/ui/badge";

export default async function PlantPage({
  params: { plantId, categoryId },
}: {
  params: {
    plantId: string;
    categoryId: string;
  };
}) {
  const session = await getAuthSession();
  const plant = await getPlantInfos(plantId);
  const { isStillPotager } = await handlePotager(plantId);

  const exposition = ["Non renseigné", "Ombragé", "Mi-ombre", "Ensoleillé"];
  const water = [
    "Non renseigné",
    "Arrosage léger",
    "Arrosage modéré",
    "Arrosage régulier",
  ];

  type calendarType =
    | "nursery"
    | "seedling"
    | "plantation"
    | "flowering"
    | "harvest";

  type calendarTypesT = {
    type: calendarType;
    data: number[];
    bgColor: string;
    color: string;
    darkBgColor: string;
  }[];

  const calendarTypes = [
    {
      type: "nursery",
      data: plant?.nursery ?? [],
      bgColor: "#E9C2EC",
      color: "#A144AF",
      darkBgColor: "#B658C4",
    },
    {
      type: "seedling",
      data: plant?.seedling ?? [],
      bgColor: "#FFDFB5",
      color: "#FFBA18",
      darkBgColor: "#FFBA18",
    },
    {
      type: "plantation",
      data: plant?.plantation ?? [],
      bgColor: "#F0E4D9",
      color: "#E4CDB7",
      darkBgColor: "#4D3C2F",
    },
    {
      type: "flowering",
      data: plant?.flowering ?? [],
      bgColor: "#D5EFFF",
      color: "#ACD8FC",
      darkBgColor: "#104D87",
    },
    {
      type: "harvest",
      data: plant?.harvest ?? [],
      bgColor: "#D6F1DF",
      color: "#ADDDC0",
      darkBgColor: "#20573E",
    },
  ] as calendarTypesT;

  return (
    <>
      <Card className="col-start-1 col-end-9 row-start-1 row-end-5 sm:col-start-3">
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          <OpenPlantNavigationButton />

          <CardTitle className="flex w-full justify-between">
            <span>{plant?.name}</span>
            {/* <form className="flex max-w-2xl flex-row-reverse">
              {!session?.user ? (
                <MustLoggedAlert />
              ) : (
                <PotagerButton plant={plant} state={state} />
              )}
            </form> */}
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex w-full flex-row flex-wrap items-center gap-2 sm:justify-between sm:gap-0">
            <div className="flex items-center justify-between sm:flex-col">
              <Badge className="bg-[#C4E8D1]/60 p-2 hover:bg-[#C4E8D1]/100 dark:bg-[#20573E]/60 hover:dark:bg-[#20573E]/100">
                <Sprout size={24} />
                {plant?.type}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-[#FFDFB5]/60 p-2 hover:bg-[#FFDFB5]/100 dark:bg-[#104D87]/60 hover:dark:bg-[#104D87]/100">
                <CloudSun size={24} />
                {exposition[plant?.exposition ?? 0]}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-[#D5EFFF]/60 p-2 hover:bg-[#D5EFFF]/100 dark:bg-[#B658C4]/60 hover:dark:bg-[#B658C4]/100">
                <Droplets size={24} />
                {water[plant?.water ?? 0]}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-[#E3DFE6]/60 p-2 hover:bg-[#E3DFF6]/100 dark:bg-[#524202]/60 hover:dark:bg-[#524202]/100">
                <Space size={24} />
                {plant?.spaceBetween} cm
              </Badge>
              {/* <h6>Distance entre les plantes : </h6> */}
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-[#CBCFCD]/60 p-2 hover:bg-[#CBCFCD]/100 dark:bg-[#4D3C2F]/60 hover:dark:bg-[#4D3C2F]/100">
                <AlignHorizontalSpaceAround size={24} />
                {plant?.spaceOnRow} cm sur le rang
              </Badge>

              {/* <h6>Distance entre les rangs : </h6> */}
            </div>
          </div>
          <div className="flex flex-wrap">
            <h4 className="text-lg font-bold">Calendrier de culture</h4>
            <MdxProse
              markdown={
                plant?.content ||
                "Aucune information complémentaire renseignée .."
              }
            />
            <Tabs defaultValue="nursery" className="w-full">
              <TabsList className="w-full overflow-x-auto bg-secondary">
                <TabsTrigger
                  className="data-[state=active]:bg-[#E9C2EC] dark:data-[state=active]:bg-[#5E3061]"
                  value="nursery"
                >
                  Semis sous abri
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-[#FFDFB5] dark:data-[state=active]:bg-[#462100]"
                  value="seedling"
                >
                  Semis
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-[#F0E4D9]  dark:data-[state=active]:bg-[#322922]"
                  value="plantation"
                >
                  Plantation
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-[#D5EFFF] dark:data-[state=active]:bg-[#003362]"
                  value="flowering"
                >
                  Floraison
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-[#D6F1DF]  dark:data-[state=active]:bg-[#113B29]"
                  value="harvest"
                >
                  Récolte
                </TabsTrigger>
              </TabsList>
              <>
                {calendarTypes.map((calendarType, index) => {
                  return (
                    <TabsContent key={index} value={calendarType.type}>
                      {plant && (
                        <CalendarTabContent
                          calendarType={calendarType.type}
                          plant={plant}
                          data={calendarType.data}
                          bgColor={calendarType.bgColor}
                          darkBgColor={calendarType.darkBgColor}
                          color={calendarType.color}
                          isStillPotager={isStillPotager !== 0}
                          isReadOnly={!Boolean(session)}
                        />
                      )}
                    </TabsContent>
                  );
                })}
              </>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
