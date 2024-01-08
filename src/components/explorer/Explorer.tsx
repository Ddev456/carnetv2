"use client";

import React from "react";
import { PlantsComboBox } from "../ui/PlantsComboBox";
import { CalendarView } from "./CalendarView";
import { CategoryView } from "./CategoryView";
import { SheetView } from "./SheetView";
import { type Plants, type Plant } from "@/db/query/plant.query";
import clsx from "clsx";
import { Advices } from "./Advices";

type ExplorerData = {
  plants: Plant[];
  isConnected: Boolean;
  userPotager?: string[];
};

type ExplorerProps = {
  data: ExplorerData;
  query: string;
};

// type calendarType =
//   | "nursery"
//   | "seedling"
//   | "plantation"
//   | "flowering"
//   | "harvest";

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
  plants: Plants;
  emoji: string;
};

export const Explorer = ({ data, query }: ExplorerProps) => {
  const categories = [
    {
      id: "*",
      identifier: "TOUT",
      name: "Tout",
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
  const [selected, onSelect] = React.useState<Plant>(categories[0].plants[0]);
  const [selectedCategory, onSelectCategory] = React.useState<categoryId>("*");
  const [isSelected, toggleListOfPlants] = React.useState(false);

  const handleListOfPlants = () => {
    toggleListOfPlants(!isSelected);
  };

  const handleSelect = (plant: Plant) => {
    onSelect(plant);
  };

  return (
    <div className="flex flex-col gap-2  md:flex-row ">
      <div className="flex w-full flex-col p-4 md:w-[40%] xl:w-[20%]">
        <div className="w-full rounded-xl bg-secondary/40 p-4">
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
        </div>
      </div>

      <div className="hide-scrollbar flex w-full flex-col gap-4 p-4 md:h-[80vh] md:w-[60%] md:overflow-y-scroll xl:w-[80%] ">
        <SheetView
          plant={selected}
          isReadOnly={!data.isConnected}
          userPotager={data.userPotager}
        />
        {selected.cultivationPeriods.length > 0 && (
          <CalendarView plant={selected} plants={data.plants} />
        )}

        <Advices plant={selected} />
      </div>
    </div>
  );
};
