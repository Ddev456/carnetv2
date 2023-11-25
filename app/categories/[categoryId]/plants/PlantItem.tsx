"use client";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, CircleDashed, Globe } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CategoryPlantItem } from "../category.query";

export type PlantItemProps = {
  plant: CategoryPlantItem;
};

export const getPlantIcon = (status: CategoryPlantItem["progress"]) => {
  if (status === "AJOUTE") {
    return CheckCircle;
  }

  if (status === "NONFAVORI") {
    return Circle;
  }

  return CircleDashed;
};

export const PlantItem = ({ plant }: PlantItemProps) => {
  const Icon = getPlantIcon(plant.progress);
  const params = useParams();

  const plantId = String(params?.plantId);

  const isCurrentPlant = plantId === plant.id;
  return (
    <Link href={`/categories/${plant.categoryId}/plants/${plant.id}`}>
      <div
        className={cn(
          "flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-secondary",
          {
            "bg-primary/10 border-primary/40 hover:bg-primary/30":
              isCurrentPlant,
          }
        )}
      >
        <Typography variant="small" className="flex-1">
          {plant.name}
        </Typography>
      </div>
    </Link>
  );
};
