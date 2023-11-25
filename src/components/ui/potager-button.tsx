"use client";

import React from "react";
import { handleEventState } from "../../../app/categories/[categoryId]/plants/[plantId]/plant.action";
import { PlantInfosType } from "../../../app/categories/[categoryId]/plants/[plantId]/plant.query";
import clsx from "clsx";
import { Button } from "./button";

type PotagerButtonProps = {
  plant: PlantInfosType;
  isSelected: boolean;
  startDate: Date;
  typeEvent: "nursery" | "seedling" | "plantation";
};

export const PotagerButton = ({
  plant,
  isSelected,
  startDate,
  typeEvent,
}: PotagerButtonProps) => {
  const handleAction = async () => {
    // await handlePlantState({
    //   plantId: plant.id,
    //   progress: plant.progress === "AJOUTE" ? "NONFAVORI" : "AJOUTE",
    // });
    await handleEventState({
      plantId: plant.id,
      plantName: plant.name,
      plantCategory: plant.category.name,
      startDate: startDate,
      typeEvent: typeEvent,
    });
  };
  return (
    <form action={handleAction}>
      <Button
        type="submit"
        className={clsx(isSelected ? "bg-primary" : "bg-background")}
      >
        Ajouter au potager
        {/* {plant.progress === "AJOUTE" ? "Retirer" : "Ajouter au potager"} */}
      </Button>
      )
    </form>
  );
};
