"use client";

import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { categoriesT, categoryId } from "./Explorer";
import { Button } from "@/components/ui/button";
import { type Plant, type Plants } from "@/db/query/plant.query";

type CategoryViewProps = {
  selected?: Plant;
  selectedCategory: categoryId;
  categories: categoriesT[];
  plants: Plants;
  handleListOfPlants: (selected: boolean) => void;
  onSelect: (plant: Plant) => void;
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
      <div className="w-full">
        <div className="flex flex-row gap-2 overflow-auto scroll-smooth md:overflow-hidden">
          {categories.map((category) => (
            <Card
              key={category.id}
              onClick={() => {
                if (category.id === selectedCategory) {
                  onSelectCategory("*");
                  handleListOfPlants(false);
                  return;
                }
                onSelectCategory(category.id);
                onSelect(category.plants[0]);
                handleListOfPlants(true);
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
      <Card className="w-full bg-secondary/30">
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            onClick={handleScrollLeft}
            className="hidden rounded hover:bg-transparent md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left stroke-foreground/80"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </Button>
          <CardContent
            ref={scrollAreaRef}
            className="inline-flex items-center gap-2 overflow-x-scroll scroll-smooth p-1 md:overflow-hidden"
          >
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
                    "min-w-[120px] rounded border border-borders bg-primary/10 px-4 py-2 align-middle text-sm transition-colors hover:cursor-pointer hover:bg-primary/20"
                  )}
                >
                  {plant.name}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right stroke-foreground/80"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </Button>
        </div>
      </Card>
    </>
  );
};
