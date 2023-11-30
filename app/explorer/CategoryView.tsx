"use client";

import React, { useRef } from "react";
import { PlantInfos, plantsDataTable } from "../dashboard/plant.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { Typography } from "@/components/ui/typography";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { categoriesT, categoryId } from "./Explorer";
import { Button } from "@/components/ui/button";

type CategoryViewProps = {
  selected?: PlantInfos;
  selectedCategory: categoryId;
  categories: categoriesT[];
  plants: plantsDataTable;
  handleListOfPlants: (selected: boolean) => void;
  onSelect: (plant: PlantInfos) => void;
  onSelectCategory: (category: categoryId) => void;
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
  const categoryId = (categoryType: string) => {
    switch (categoryType) {
      case "FRUITIERS":
        return "fruits";
      case "LEGUMES":
        return "vegetables";
      case "AROMATIQUES":
        return "herbs";
      case "FLEURS":
        return "flowers";
      case "ENGRAISVERTS":
        return "greens";
      case "AUTRES":
        return "others";
      default:
        return "*";
    }
  };
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft -= 100; // Adjust the scroll amount as needed
    }
  };

  const handleScrollRight = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollLeft += 100; // Adjust the scroll amount as needed
    }
  };

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
        {/* <ScrollArea className="whitespace-nowrap rounded-md"> */}
        <div className="flex flex-row gap-2 overflow-auto scroll-smooth md:overflow-hidden">
          {categories.map((category) => (
            <Card
              key={category.id}
              onClick={() => {
                if (category.id === selectedCategory) {
                  onSelectCategory("*");
                  handleListOfPlants(false);
                  // toggleListOfPlants(false);
                  return;
                }

                onSelectCategory(category.id);
                onSelect(category.plants[0]);
                // plants.filter((plant) => {
                //   return plant.id === category.plants[0].id;
                // })[0]

                handleListOfPlants(true);
                // toggleListOfPlants(true);
              }}
              className={clsx(
                category.id === selectedCategory
                  ? "bg-primary/50 hover:bg-primary/50"
                  : "bg-primary/10 hover:bg-primary/20",
                "w-[40%] cursor-pointer"
              )}
            >
              <p className="text-md mx-auto flex flex-col items-center justify-center p-2 font-medium leading-normal">
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </p>
            </Card>
          ))}
        </div>
      </div>
      <Card className="w-full flex-1 bg-secondary/30">
        <CardHeader>
          <CardTitle>Liste de Plantes</CardTitle>
        </CardHeader>
        {/* <ScrollArea className="whitespace-nowrap rounded-md"> */}
        {/* <div className="mb-4 flex items-center justify-between">
          <button
            onClick={handleScrollLeft}
            className="hidden rounded bg-primary px-2 py-1 text-white md:block"
          >
            Scroll Left
          </button>
          <button
            onClick={handleScrollRight}
            className="hidden rounded bg-primary px-2 py-1 text-white md:block"
          >
            Scroll Right
          </button>
        </div> */}
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            onClick={handleScrollLeft}
            className="hidden rounded hover:bg-transparent md:block"
          >
            <ChevronLeft />
          </Button>
          <CardContent
            ref={scrollAreaRef}
            className="flex flex-row gap-2 overflow-auto scroll-smooth md:overflow-hidden"
          >
            {/* <CardContent className="flex flex-row gap-2 overflow-x-auto"> */}
            {categories
              .filter((category) => category.id === selectedCategory)[0]
              .plants.map((plant) => (
                <div
                  key={plant.id}
                  onClick={() => {
                    onSelectCategory(categoryId(plant.categoryType));
                    onSelect(plant);
                  }}
                  className={clsx(
                    selected === plant
                      ? "border-primary/40 bg-primary/50 hover:bg-primary/30"
                      : "bg-secondary/40",
                    "flex items-center gap-3 rounded border border-borders bg-primary/10 px-4 py-2 transition-colors hover:cursor-pointer hover:bg-primary/20"
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
          <Button
            variant={"ghost"}
            onClick={handleScrollRight}
            className="hidden rounded hover:bg-transparent md:block"
          >
            <ChevronRight />
          </Button>
        </div>
        {/* <ScrollBar orientation="horizontal" />
        </ScrollArea> */}
      </Card>

      {/* // <ListOfPlants plants={selectionOfPlants} />} */}
    </>
  );
};
