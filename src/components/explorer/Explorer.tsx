"use client";

import React from "react";
import { PlantsComboBox } from "../ui/PlantsComboBox";
import { CalendarView } from "./CalendarView";
import { CategoryView } from "./CategoryView";
import { SheetView } from "./SheetView";
import { type Plants, type Plant } from "@/db/query/plant.query";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserNotifications } from "@/db/query/user.query.js";
import clsx from "clsx";

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
    <div
      className={clsx(
        "flex h-full flex-col justify-between gap-2 px-4 pt-12 md:max-w-[80vw] md:p-4",
        {
          "md:pt-[6rem]": !data.isConnected,
        }
      )}
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
        <CalendarView plant={selected} plants={data.plants} />
      </div>
    </div>
  );
};
