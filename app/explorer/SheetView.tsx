import React from "react";
import { PlantInfos } from "../dashboard/plant.query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  AlignHorizontalSpaceAround,
  ArrowUpRight,
  CloudSun,
  Droplets,
  MousePointerSquareDashed,
  Space,
  Sprout,
} from "lucide-react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Helper } from "./Helper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleEventState } from "./plant.action";
import { MustLoggedAlert } from "@/components/ui/mustLoggedAlert";
import { AddButton } from "./AddButton";

type SheetViewProps = {
  plant: PlantInfos;
  isReadOnly: Boolean;
  userPotager?: string[];
};

const exposition = ["Non renseigné", "Ombragé", "Mi-ombre", "Ensoleillé"];
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
              Plante sélectionnée :{" "}
              <span className="font-bold text-primary/60">{plant.name}</span>
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
                    <Badge className="bg-[#C4E8D1]/60 p-2 hover:bg-[#C4E8D1]/100 dark:bg-[#20573E]/60 hover:dark:bg-[#20573E]/100">
                      <Sprout size={24} />
                      {plant?.type}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#C4E8D1] dark:bg-[#20573E]">
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
                    <Badge className="bg-[#FFDFB5]/60 p-2 hover:bg-[#FFDFB5]/100 dark:bg-[#104D87]/60 hover:dark:bg-[#104D87]/100">
                      <CloudSun size={24} />
                      {exposition[plant?.exposition ?? 0]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#FFDFB5] p-2 dark:bg-[#104D87]">
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
                    <Badge className="bg-[#D5EFFF]/60 p-2 hover:bg-[#D5EFFF]/100 dark:bg-[#B658C4]/60 hover:dark:bg-[#B658C4]/100">
                      <Droplets size={24} />
                      {water[plant?.water ?? 0]}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#D5EFFF] p-2 dark:bg-[#B658C4]">
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
                    <Badge className="bg-[#E3DFE6]/60 p-2 hover:bg-[#E3DFF6]/100 dark:bg-[#524202]/60 hover:dark:bg-[#524202]/100">
                      <Space size={24} />
                      {plant?.spaceBetween} cm
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#E3DFE6] p-2 hover:dark:bg-[#524202]">
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
                    <Badge className="bg-[#CBCFCD]/60 p-2 hover:bg-[#CBCFCD]/100 dark:bg-[#4D3C2F]/60 hover:dark:bg-[#4D3C2F]/100">
                      <AlignHorizontalSpaceAround size={24} />
                      {plant?.spaceOnRow} cm sur le rang
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#CBCFCD] p-2 dark:bg-[#4D3C2F]">
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
