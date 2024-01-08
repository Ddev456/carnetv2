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
  {
    type: "Non renseigné",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-cloud-off h-4 w-4 stroke-foreground/80"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9.58 5.548c.24 -.11 .492 -.207 .752 -.286c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 .957 -.383 1.824 -1.003 2.454m-2.997 1.033h-11.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.13 -.582 .37 -1.128 .7 -1.62" />
        <path d="M3 3l18 18" />
      </svg>
    ),
  },
  {
    type: "Ombragé",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-cloud h-4 w-4 stroke-foreground/80"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
      </svg>
    ),
  },
  {
    type: "Mi-ombre",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-haze h-4 w-4 stroke-foreground/80"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12h1" />
        <path d="M12 3v1" />
        <path d="M20 12h1" />
        <path d="M5.6 5.6l.7 .7" />
        <path d="M18.4 5.6l-.7 .7" />
        <path d="M8 12a4 4 0 1 1 8 0" />
        <path d="M3 16h18" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    type: "Ensoleillé",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-sun-high h-4 w-4 stroke-foreground/80"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
        <path d="M6.343 17.657l-1.414 1.414" />
        <path d="M6.343 6.343l-1.414 -1.414" />
        <path d="M17.657 6.343l1.414 -1.414" />
        <path d="M17.657 17.657l1.414 1.414" />
        <path d="M4 12h-2" />
        <path d="M12 4v-2" />
        <path d="M20 12h2" />
        <path d="M12 20v2" />
      </svg>
    ),
  },
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
  const checkExist = (array: string[], value: number) => {
    return array.some((id) => Number(id) === value);
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
        <>
          <div className="mt-[2.5rem] flex flex-col items-start gap-3 rounded-xl bg-secondary/40 p-2">
            <div className="flex w-full justify-between">
              <Image
                className="mt-[-4rem]"
                alt="plant thumbnail"
                src={
                  plant.icon
                    ? plant.icon
                    : "https://carnetv2.s3.eu-west-3.amazonaws.com/public/icons/noicon.png"
                }
                width={150}
                height={150}
              />
              <div className="flex flex-col">
                <span className="p-4 text-xl capitalize text-foreground/80">
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
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="text-capitalize bg-secondary/80 p-2 hover:bg-secondary/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-calendar-stats h-4 w-4 stroke-foreground/80"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
                          <path d="M18 14v4h4" />
                          <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                          <path d="M15 3v4" />
                          <path d="M7 3v4" />
                          <path d="M3 11h16" />
                        </svg>
                        <p className="ml-1">{plant.type || "Non renseigné"}</p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary p-4 text-foreground">
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
                        {exposition[plant?.exposition ?? 0].icon}
                        <p className="ml-1">
                          {exposition[plant?.exposition ?? 0].type}
                        </p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary p-4 text-foreground">
                      <p>L'exposition de la plante est importante</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="bg-secondary/80 p-2 hover:bg-secondary/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-droplet h-4 w-4 stroke-foreground/80"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546z" />
                        </svg>
                        <p className="ml-1">{water[plant?.water ?? 0]}</p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary/90 p-4 text-foreground">
                      <p>
                        Niveau d'arrosage (Arrosage léger, modéré ou régulier)
                      </p>
                      <p>
                        L'arrosage est à adapter en fonction de son type de sol
                        et de sa rétention en eau et des conditions climatiques
                        ..
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-dimensions h-4 w-4 stroke-foreground/80"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 5h11" />
                          <path d="M12 7l2 -2l-2 -2" />
                          <path d="M5 3l-2 2l2 2" />
                          <path d="M19 10v11" />
                          <path d="M17 19l2 2l2 -2" />
                          <path d="M21 12l-2 -2l-2 2" />
                          <path d="M3 10m0 2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2z" />
                        </svg>
                        <p className="ml-1">
                          {plant?.spaceBetween} cm entre les rangs
                        </p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary/90 p-4 text-foreground">
                      <p>Espace entre les plantes</p>
                      <p>
                        L'espace en cm préconisé à respecter entre chaque
                        plantes pour leur bon développment
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-ruler-measure h-4 w-4 stroke-foreground/80"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z" />
                          <path d="M9 12v2" />
                          <path d="M6 12v3" />
                          <path d="M12 12v3" />
                          <path d="M18 12v3" />
                          <path d="M15 12v2" />
                          <path d="M3 3v4" />
                          <path d="M3 5h18" />
                          <path d="M21 3v4" />
                        </svg>
                        <p className="ml-1">
                          {plant?.spaceOnRow} cm sur le rang
                        </p>
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
            <div className="p-2 text-base text-foreground/80">
              {plant.description}
            </div>
          </div>
        </>
      )}
    </>
  );
};
