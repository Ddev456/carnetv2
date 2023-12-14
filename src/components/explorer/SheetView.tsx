import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MustLoggedAlert } from "@/components/ui/mustLoggedAlert";
import { AddButton } from "../ui/AddButton";
import { type Plant } from "@/db/query/plant.query";

type SheetViewProps = {
  plant: Plant;
  isReadOnly: Boolean;
  userPotager?: string[];
};

const exposition = [
  "Non renseigné",
  "☁️ Ombragé",
  "🌤️ Mi-ombre",
  "☀️ Ensoleillé",
];
const water = [
  "Non renseigné",
  "Arrosage léger",
  "Arrosage modéré",
  "Arrosage régulier",
];

export const SheetView = ({
  plant,
  isReadOnly,
  userPotager = [],
}: SheetViewProps) => {
  const checkExist = (array: string[], value: string) => {
    return array.some((id) => id === value);
  };

  return (
    <>
      {!plant && (
        <Image
          src="/helper_nothing.svg"
          width={100}
          height={100}
          alt="helper_nothing"
        />
      )}
      {plant && (
        <div className="flex flex-row flex-wrap items-start gap-3 md:flex-col">
          <div className="flex w-full justify-between">
            <h4 className="">
              Plante sélectionnée :
              <Image
                className="rounded-xl"
                alt="plant thumbnail"
                src={plant.thumbnail}
                width={120}
                height={120}
              />
              <span className="font-bold uppercase text-primary">
                {plant.name}
              </span>
            </h4>

            {isReadOnly ? (
              <MustLoggedAlert />
            ) : (
              <AddButton
                plant={plant}
                buttonState={checkExist(userPotager, plant.id)}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="text-capitalize bg-accent/30 p-2 hover:bg-accent/40">
                      {/* <Sprout size={24} /> */}
                      ⏱️ {plant?.type}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-accent/90 p-4 text-foreground">
                    <p>Type de plante: Annuelle/ Bisannuelle ou Vivace</p>
                    <p>
                      Les plantes vivaces sont pérennes alors que les autres
                      doivent être re-semé/planté chaque année
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-secondary/30 p-2 hover:bg-secondary/40">
                      {/* <CloudSun size={24} /> */}
                      {exposition[plant?.exposition ?? 0]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary/90  p-4 text-foreground">
                    <p>
                      L'exposition optimale pour la plante (Ombragée, Mi-Ombre
                      ou Ensoleillée)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-primary/30 p-2 hover:bg-primary/40">
                      💧
                      {water[plant?.water ?? 0]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary/90 p-4 text-foreground">
                    <p>
                      Niveau d'arrosage (Arrosage léger, modéré ou régulier)
                    </p>
                    <p>
                      L'arrosage est à adapter en fonction de son type de sol et
                      de sa rétention en eau et des conditions climatiques ..
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-destructive/10 p-2 hover:bg-destructive/20">
                      {/* <Space size={24} /> */}
                      📏 {plant?.spaceBetween} cm
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary/90 p-4 text-foreground">
                    <p>Espace entre les plantes</p>
                    <p>
                      L'espace en cm préconisé à respecter entre chaque plantes
                      pour leur bon développment
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="bg-destructive/10 p-2 hover:bg-destructive/20">
                      {/* <AlignHorizontalSpaceAround size={24} /> */}
                      📍 {plant?.spaceOnRow} cm sur le rang
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary/90 p-4 text-foreground">
                    <p>Espace sur le rang</p>
                    <p>
                      l'espace en cm préconisé à respecter sur une planche de
                      culture pour le bon développement des plantes
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
