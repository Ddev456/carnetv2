"use client";

import React from "react";
import { PlantsComboBox } from "./PlantsComboBox";
import { CalendarView } from "./CalendarView";
import { PlantInfos, plantsDataTable } from "../dashboard/plant.query";
import { CategoryView } from "./CategoryView";
import { SheetView } from "./SheetView";
import { useSidebarStore } from "@/components/layout/Sidebar.store";
import clsx from "clsx";

type ExplorerData = {
  plants: plantsDataTable;
  // categories: CategoriesCard[];
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

// type calendarTypesT = {
//   type: calendarType;
//   data: number[];
//   bgColor: string;
//   color: string;
//   darkBgColor: string;
// };

export type categoryId =
  | "fruits"
  | "vegetables"
  | "herbs"
  | "flowers"
  | "greens"
  | "others"
  | "*";

export type categoriesT = {
  id: categoryId;
  identifier: string;
  name: string;
  plants: plantsDataTable;
  emoji: string;
};

export const Explorer = ({ data }: ExplorerProps) => {
  const { state } = useSidebarStore();

  const categories = [
    {
      id: "*",
      identifier: "TOUT",
      name: "Toutes les plantes",
      plants: data.plants,
      emoji: "🌱",
    },
    {
      id: "fruits",
      identifier: "FRUITIERS",
      name: "Fruitiers",
      plants: data.plants.filter((plant) => plant.categoryType === "FRUITIERS"),
      emoji: "🍇",
    },
    {
      id: "vegetables",
      identifier: "LEGUMES",
      name: "Légumes",
      plants: data.plants.filter((plant) => plant.categoryType === "LEGUMES"),
      emoji: "🥕",
    },
    {
      id: "herbs",
      identifier: "AROMATIQUES",
      name: "Aromatiques",
      plants: data.plants.filter(
        (plant) => plant.categoryType === "AROMATIQUES"
      ),
      emoji: "🌿",
    },
    {
      id: "flowers",
      identifier: "FLEURS",
      name: "Fleurs",
      plants: data.plants.filter((plant) => plant.categoryType === "FLEURS"),
      emoji: "🌸",
    },
    {
      id: "greens",
      identifier: "ENGRAISVERTS",
      name: "Engrais verts",
      plants: data.plants.filter(
        (plant) => plant.categoryType === "ENGRAISVERTS"
      ),
      emoji: "☘️",
    },
    {
      id: "others",
      identifier: "AUTRES",
      name: "Autres",
      plants: data.plants.filter((plant) => plant.categoryType === "AUTRES"),
      emoji: "📌",
    },
  ] as categoriesT[];
  const [selected, onSelect] = React.useState<PlantInfos>(
    categories[0].plants[0]
  );
  const [selectedCategory, onSelectCategory] = React.useState<categoryId>("*");
  const [isSelected, toggleListOfPlants] = React.useState(false);

  const handleListOfPlants = () => {
    toggleListOfPlants(!isSelected);
  };

  const handleSelect = (plant: PlantInfos) => {
    onSelect(plant);
  };

  return (
    <div
      className={clsx("flex w-full flex-col gap-4 pt-[4rem]", {
        "md:pl-[4rem]": state,
        "md:pl-[12rem]": !state,
      })}
    >
      <PlantsComboBox
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelect={handleSelect}
        onSelectCategory={onSelectCategory}
      />
      <CategoryView
        selected={selected}
        selectedCategory={selectedCategory}
        categories={categories}
        plants={data.plants}
        handleListOfPlants={handleListOfPlants}
        onSelect={handleSelect}
        onSelectCategory={onSelectCategory}
      />
      <div className="flex flex-col gap-4">
        <SheetView
          plant={selected}
          isReadOnly={!data.isConnected}
          userPotager={data.userPotager}
        />
        <CalendarView plant={selected} />
      </div>
    </div>
  );
};
