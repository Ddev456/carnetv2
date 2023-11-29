import React from "react";
import { PlantInfos } from "../dashboard/plant.query";
import { CultureDisplay } from "./CultureDisplay";

export type Plant = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  water: number;
  exposition: number;
  isPotager: boolean;
  isReadOnly: boolean;
  nursery: number[];
  seedling: number[];
  flowering: number[];
  plantation: number[];
  harvest: number[];
  eventFlowering: number;
  eventHarvest: number;
  eventPlantation: number;
};

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

type CalendarViewProps = {
  plant: PlantInfos;
  calendarTypes?: calendarTypesT;
  bgColor?: string;
  darkBgColor?: string;
};

export const CalendarView = ({
  plant,
  calendarTypes,
  bgColor,
  darkBgColor,
}: CalendarViewProps) => {
  return (
    <div className="min-h-[300px]">
      {/* <div className="hidden w-full md:block">
        <Tabs defaultValue="nursery" className="w-full">
          <TabsList className="text-text w-full overflow-x-auto bg-secondary">
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
            {calendarTypes?.map((calendarType, index) => {
              return (
                <TabsContent key={index} value={calendarType.type}>
                  {plant && (
                    <CalendarTabContentReadOnly
                      calendarType={calendarType.type}
                      plant={{
                        ...plant,
                        state: "PUBLIE",
                        content: "",
                        type: "",
                        spaceBetween: 0,
                        spaceOnRow: 0,
                      }}
                      data={calendarType.data}
                      bgColor={calendarType.bgColor}
                      darkBgColor={calendarType.darkBgColor}
                      color={calendarType.color}
                    />
                  )}
                </TabsContent>
              );
            })}
          </>
        </Tabs>
      </div> */}
      <CultureDisplay
        period={{
          name: plant?.name || "",
          nursery: plant?.nursery || [],
          seedling: plant?.seedling || [],
          plantation: plant?.plantation || [],
          flowering: plant?.flowering || [],
          harvest: plant?.harvest || [],
        }}
      />
    </div>
  );
};
