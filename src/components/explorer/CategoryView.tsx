"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { categoriesT, categoryId } from "./Explorer";
import { Button } from "@/components/ui/button";
import { type Plant, type Plants } from "@/db/query/plant.query";
import Image from "next/image";

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

  return (
    <div className="flex h-52 w-full flex-col justify-between md:h-[40rem] md:max-w-[20rem] md:flex-row">
      <div className="flex flex-col gap-2">
        <h4>Catégories</h4>
        <div className="hide-scrollbar flex overflow-x-scroll md:flex-col md:overflow-x-hidden">
          {categories.map((category) => (
            <div
              style={{
                backgroundImage: `url(${
                  category.plants[0]?.thumbnail || plants[2].thumbnail
                }`,
                backgroundSize: "cover",
                opacity: 0.4,
              }}
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
                "m-1 h-[50px] w-[100px] cursor-pointer rounded-lg px-4 py-2 text-sm hover:opacity-80"
              )}
            >
              <p className="text-md items-center justify-center font-medium leading-normal">
                {/* <span>{category.emoji}</span> */}
                <span>{category.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-[700px] flex-col gap-2">
        <h4 className="font-bold text-secondary/80">Plantes</h4>
        <div className="hide-scrollbar flex h-24 overflow-x-scroll md:h-[400px] md:flex-col md:overflow-y-auto md:overflow-x-hidden">
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
                    : "hover:bg-primary/20",
                  "m-1 w-[120px] rounded-lg border border-secondary/80 px-4 py-2 text-sm transition-colors hover:cursor-pointer"
                )}
              >
                <Image
                  alt={plant.name}
                  src={
                    plant.icon ||
                    "https://carnetv2.s3.eu-west-3.amazonaws.com/public/thumbnails/novegetable.png"
                  }
                  width={16}
                  height={16}
                />
                {plant.name}
              </div>
            ))}
        </div>
        {plants.length === 0 ? (
          <Alert>
            <AlertTriangle />
            <AlertTitle>
              Il n'y a aucune plantes ici pour le moment, Revenez plus tard.
            </AlertTitle>
          </Alert>
        ) : null}
      </div>
    </div>
  );
};
