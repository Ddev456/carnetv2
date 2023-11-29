"use client";

import React from "react";
import { PlantsComboBox } from "./PlantsComboBox";
import { CalendarView } from "./CalendarView";
import { PlantInfos, plantsDataTable } from "../dashboard/plant.query";
import { CategoryView } from "./CategoryView";
import { CategoriesCard } from "./category.query";
import { SheetView } from "./SheetView";

type ExplorerData = {
  plants: plantsDataTable;
  categories: CategoriesCard[];
  isConnected: Boolean;
  userPotager?: string[];
};

type ExplorerProps = {
  data: ExplorerData;
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

export const Explorer = ({ data }: ExplorerProps) => {
  const [selected, onSelect] = React.useState<PlantInfos>(data.plants[0]);
  const [selectedCategory, onSelectCategory] = React.useState<string>("*");
  const [isSelected, toggleListOfPlants] = React.useState(false);

  const handleListOfPlants = () => {
    toggleListOfPlants(!isSelected);
  };

  const handleSelect = (plant: PlantInfos) => {
    onSelect(plant);
  };

  const calendarTypes = [
    {
      type: "nursery",
      data: selected?.nursery ?? [],
      bgColor: "#E9C2EC",
      color: "#A144AF",
      darkBgColor: "#B658C4",
    },
    {
      type: "seedling",
      data: selected?.seedling ?? [],
      bgColor: "#FFDFB5",
      color: "#FFBA18",
      darkBgColor: "#FFBA18",
    },
    {
      type: "plantation",
      data: selected?.plantation ?? [],
      bgColor: "#F0E4D9",
      color: "#E4CDB7",
      darkBgColor: "#4D3C2F",
    },
    {
      type: "flowering",
      data: selected?.flowering ?? [],
      bgColor: "#D5EFFF",
      color: "#ACD8FC",
      darkBgColor: "#104D87",
    },
    {
      type: "harvest",
      data: selected?.harvest ?? [],
      bgColor: "#D6F1DF",
      color: "#ADDDC0",
      darkBgColor: "#20573E",
    },
  ] as calendarTypesT;
  return (
    <div className="flex flex-col gap-4">
      <PlantsComboBox
        plants={data.plants}
        handleSelect={handleSelect}
        onSelectCategory={onSelectCategory}
      />
      <CategoryView
        selected={selected}
        selectedCategory={selectedCategory}
        categories={data.categories}
        plants={data.plants}
        handleListOfPlants={handleListOfPlants}
        onSelect={handleSelect}
        onSelectCategory={onSelectCategory}
      />
      <div className="flex flex-col">
        <SheetView
          plant={selected}
          isReadOnly={!data.isConnected}
          userPotager={data.userPotager}
        />
        <CalendarView
          plant={selected}
          calendarTypes={calendarTypes}
          bgColor=""
          darkBgColor=""
        />
      </div>
    </div>
  );
};
