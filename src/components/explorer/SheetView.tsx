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
        <div className="mt-[2.5rem] flex flex-row flex-wrap items-start gap-3 rounded-xl bg-[#0f8b8d]/20 p-2 md:justify-between">
          <Image
            className="mt-[-4rem]"
            alt="plant thumbnail"
            src={
              plant.thumbnail
                ? plant.thumbnail
                : "https://carnetv2.s3.eu-west-3.amazonaws.com/public/icons/novegetable.png"
            }
            width={180}
            height={180}
          />
          <span className="p-4 text-2xl capitalize text-foreground/80">
            {/* Plante sélectionnée : */}
            {plant.name}
          </span>
          {isReadOnly ? (
            <MustLoggedAlert />
          ) : (
            <AddButton
              plant={plant}
              buttonState={checkExist(userPotager, plant.id)}
            />
          )}
          {/* <div className="flex w-full justify-between">
            
          </div> */}
          <div className="mb-[5%] flex flex-wrap gap-4 md:w-full md:justify-between">
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="text-capitalize bg-secondary/80 p-2 hover:bg-secondary/60">
                      {/* <Sprout size={24} /> */}
                      ⏱️ {plant?.type}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary/90 p-4 text-foreground">
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
                    <Badge className="bg-secondary/80 p-2 hover:bg-secondary/60">
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
                    <Badge className="bg-secondary/80 p-2 hover:bg-secondary/60">
                      💧
                      {water[plant?.water ?? 0]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary/90 p-4 text-foreground">
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
                    <Badge className="bg-secondary/80 p-2 hover:bg-secondary/60">
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
                    <Badge className="bg-secondary/80 p-2 hover:bg-secondary/60">
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
