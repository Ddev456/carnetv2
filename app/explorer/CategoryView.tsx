"use client";

import React from "react";
import { CategoriesCard } from "./category.query";

import { PlantInfos, plantsDataTable } from "../dashboard/plant.query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import clsx from "clsx";
import { Typography } from "@/components/ui/typography";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type CategoryViewProps = {
  selected?: PlantInfos;
  selectedCategory: string | null;
  categories: CategoriesCard[];
  plants: plantsDataTable;
  handleListOfPlants: (selected: boolean) => void;
  onSelect: (plant: PlantInfos) => void;
  onSelectCategory: (category: string) => void;
};

export const CategoryView = ({
  selected,
  selectedCategory,
  categories,
  plants,
  handleListOfPlants,
  onSelect,
  onSelectCategory,
}: CategoryViewProps) => {
  // const [selectCategory, handleCategory] = React.useState<string | null>(null);
  // const [selected, handleSelect] = React.useState(plants[0]);
  const [isSelected, toggleListOfPlants] = React.useState(false);

  const selectionOfPlants = !selected
    ? plants
    : selectedCategory === "*"
    ? plants
    : plants.filter((plant) => plant.category.id === selectedCategory);
  return (
    <>
      {/* <div className="flex grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"> */}
      {/* <button
        onClick={() => {
          handleListOfPlants(!isSelected);
          toggleListOfPlants(!isSelected);
        }}
      >
        Retour
      </button> */}
      <div className="w-full flex-1">
        <div className="flex flex-row gap-2 overflow-x-auto">
          <Card
            onClick={() => {
              onSelectCategory("*");
            }}
            className={clsx(
              selectedCategory === "*"
                ? "bg-primary/60 hover:bg-primary/60"
                : "bg-background hover:bg-secondary",
              "w-[40%] cursor-pointer"
            )}
          >
            <p className="text-md mx-auto flex flex-col items-center justify-center p-2 font-medium leading-normal">
              <span>🌱</span>
              <span>Toutes les plantes</span>
            </p>
          </Card>
          {categories.map((category) => (
            <Card
              key={category.id}
              onClick={() => {
                if (category.id === selectedCategory) {
                  // handleCategory(null);
                  onSelectCategory("*");
                  handleListOfPlants(false);
                  toggleListOfPlants(false);
                  return;
                }
                // if (selectCategory !== null) {
                //   onSelectCategory(null);
                //   handleListOfPlants(!isSelected);
                //   toggleListOfPlants(!isSelected);
                //   return;
                // }
                // handleCategory(category.id);
                onSelectCategory(category.id);
                onSelect(
                  plants.filter((plant) => {
                    return plant.id === category.plants[0].id;
                  })[0]
                );
                handleListOfPlants(true);
                toggleListOfPlants(true);
              }}
              className={clsx(
                category.id === selectedCategory
                  ? "bg-primary/60 hover:bg-primary/60"
                  : "bg-background hover:bg-secondary",
                "w-[40%] cursor-pointer"
              )}
            >
              <p className="text-md mx-auto flex flex-col items-center justify-center p-2 font-medium leading-normal">
                <span>
                  {category.name === "Légume-Grain"
                    ? "🫛"
                    : category.name === "Légume-Feuille"
                    ? "🥬"
                    : category.name === "Légume-Racine"
                    ? "🥕"
                    : category.name === "Légume-Fruit"
                    ? "🫑"
                    : category.name === "Courges & Courgettes"
                    ? "🍈"
                    : category.name === "Bulbes & Tubercules"
                    ? "🧅"
                    : category.name === "Petits Fruits"
                    ? "🍓"
                    : ""}
                </span>
                <span>{category.name}</span>
              </p>
            </Card>
          ))}
        </div>
      </div>
      <Card className="w-full flex-1">
        <CardHeader>
          <CardTitle>Liste de Plantes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-2 overflow-x-auto">
          {selectionOfPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => {
                onSelect(plant);
              }}
              className={clsx(
                selected === plant
                  ? "border-primary/40 bg-primary/10 hover:bg-primary/30"
                  : "bg-card",
                "flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:cursor-pointer hover:bg-secondary"
              )}
            >
              <Typography variant="small" className="flex-1">
                {plant.name}
              </Typography>
            </div>
          ))}
          {plants.length === 0 ? (
            <Alert>
              <AlertTriangle />
              <AlertTitle>
                Il n'y a aucune plantes ici pour le moment, Revenez plus tard.
              </AlertTitle>
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      {/* // <ListOfPlants plants={selectionOfPlants} />} */}
    </>
  );
};
