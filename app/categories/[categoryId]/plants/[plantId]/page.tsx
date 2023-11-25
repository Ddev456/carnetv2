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
    "Besoin en eau faible",
    "Besoin en eau modéré",
    "Besoin en eau important",
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
      <Card className="w-full flex-1">
        <CardHeader className="flex-row items-center gap-2 space-y-0">
          {/* <OpenPlantNavigationButton /> */}
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
          <MdxProse markdown={plant?.content || ""} />

          <div className="flex flex-col justify-around lg:flex-row">
            <Card className="">
              <CardHeader>
                <CardTitle>Caractéristiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-around">
                  <div className="flex items-center justify-between">
                    <Sprout
                      size={48}
                      className="rounded-full bg-[#C4E8D1] p-2 dark:bg-[#20573E]"
                    />
                    <h6>Plante de type : {plant?.type}</h6>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <CloudSun
                      size={48}
                      className="rounded-full bg-[#FFDFB5] p-2 dark:bg-[#104D87]"
                    />
                    <h6>Exposition : {exposition[plant?.exposition ?? 0]}</h6>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <Droplets
                      size={48}
                      className="rounded-full bg-[#D5EFFF] p-2 dark:bg-[#B658C4]"
                    />
                    <h6>Irrigation : {water[plant?.water ?? 0]}</h6>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <Space
                      size={48}
                      className="rounded-full bg-[#E3DFE6] p-2 dark:bg-[#FFD60A]"
                    />
                    <h6>
                      Distance entre les plantes : {plant?.spaceBetween} cm
                    </h6>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <AlignHorizontalSpaceAround
                      size={48}
                      className="rounded-full bg-[#CBCFCD] p-2 dark:bg-[#4D3C2F]"
                    />
                    <h6>Distance entre les rangs : {plant?.spaceOnRow} cm</h6>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Calendrier de culture</CardTitle>
                <CardContent className="p-0 md:p-6">
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
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
