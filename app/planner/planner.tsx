"use client";

import { MouseEvent, memo, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createPortal } from "react-dom";

import { Arrow2 } from "./Arrow2";
import { Arrow1 } from "./Arrow1";
import { Arrow3 } from "./Arrow3";
import { useMediaQuery } from "../../src/hooks/useMediaQuery";
import Link from "next/link";

type Plant = {
  value: string;
  label: string;
  image: string;
};

type PlannerMenuProps = {
  isMultiSelectEnabled: boolean;
  isGrabMode: boolean;
  isGridMode: boolean;
  handleGrabButtonClick: () => void;
  handleMultiSelectButtonClick: () => void;
  toggleGridMode: () => void;
  zoom: number;
  resetTranslation: () => void;
};

export const PlannerMenu = ({
  isMultiSelectEnabled,
  isGrabMode,
  isGridMode,
  handleGrabButtonClick,
  handleMultiSelectButtonClick,
  toggleGridMode,
  zoom,
  resetTranslation,
}: PlannerMenuProps) => {
  const cantGrab = zoom === 1;
  return (
    <div
      id="plannerMenu"
      className="absolute right-10 z-10 flex h-64 flex-col items-center justify-center space-x-1 rounded-xl bg-slate-200 p-4"
    >
      <div className="flex flex-col text-sm font-semibold text-foreground">
        <span className="text-center">Zoom:</span>
        <span className="text-center">{Math.round((zoom - 1) * 100)}%</span>
      </div>

      <div className="flex">
        <div className="flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={resetTranslation}
                className={clsx(
                  buttonVariants({ variant: "secondary", size: "icon" })
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrows-minimize stroke-foreground/80 hover:stroke-orange-400"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 9l4 0l0 -4" />
                  <path d="M3 3l6 6" />
                  <path d="M5 15l4 0l0 4" />
                  <path d="M3 21l6 -6" />
                  <path d="M19 9l-4 0l0 -4" />
                  <path d="M15 9l6 -6" />
                  <path d="M19 15l-4 0l0 4" />
                  <path d="M15 15l6 6" />
                </svg>
              </TooltipTrigger>

              <TooltipContent>
                <p>Recentrer la position</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={handleGrabButtonClick}
                disabled={cantGrab}
                className={clsx(
                  buttonVariants({ variant: "secondary", size: "icon" })
                )}
              >
                {zoom > 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={clsx(
                      "icon icon-tabler icon-tabler-hand-grab hover:stroke-orange-400",
                      cantGrab
                        ? "stroke-foreground/30"
                        : "stroke-foreground/80",
                      isGrabMode && "stroke-orange-400"
                    )}
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 11v-3.5a1.5 1.5 0 0 1 3 0v2.5" />
                    <path d="M11 9.5v-3a1.5 1.5 0 0 1 3 0v3.5" />
                    <path d="M14 7.5a1.5 1.5 0 0 1 3 0v2.5" />
                    <path d="M17 9.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-pointer stroke-foreground/80"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563z" />
                  </svg>
                )}
              </TooltipTrigger>

              <TooltipContent>
                <p>Déplacement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={toggleGridMode}
                className={clsx(
                  buttonVariants({ variant: "secondary", size: "icon" })
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    isGridMode ? "stroke-orange-500" : "stroke-foreground/80",
                    "icon icon-tabler icon-tabler-grid-dots hover:stroke-orange-400"
                  )}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M19 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M19 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Afficher la grille</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={handleMultiSelectButtonClick}
                className={clsx(
                  buttonVariants({ variant: "secondary", size: "icon" })
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    isMultiSelectEnabled
                      ? "stroke-orange-500"
                      : "stroke-foreground/80",
                    "icon icon-tabler icon-tabler-squares-filled hover:stroke-orange-400"
                  )}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                  <path d="M8 14.5l6.492 -6.492" />
                  <path d="M13.496 20l6.504 -6.504l-6.504 6.504z" />
                  <path d="M8.586 19.414l10.827 -10.827" />
                  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sélection multiple</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
type ToolbarProps = {
  selectedPlant: Plant;
  updateSelectedPlant: (plant: Plant) => void;
  plants: Plant[];
  savePlan: () => void;
  loadPlan: () => void;
  printPlan: () => void;
  savedPlan: string | null;
  resetGrid: () => void;
};
export const Toolbar = ({
  selectedPlant,
  updateSelectedPlant,
  plants,
  savePlan,
  loadPlan,
  printPlan,
  savedPlan,
  resetGrid,
}: ToolbarProps) => {
  const [open, setOpen] = useState(false);
  const [plantsOpen, setPlantsOpen] = useState(false);
  return (
    <div className="absolute left-10 z-10 flex h-64 flex-col items-center justify-between space-x-1 rounded-xl bg-slate-200 p-4">
      <div className="flex flex-col gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={clsx(
              buttonVariants({ variant: "secondary" }),
              "w-10 p-0"
            )}
            asChild
          >
            <Button role="combobox" aria-expanded={open}>
              {selectedPlant ? (
                <>
                  <Image
                    width={32}
                    height={32}
                    src={
                      plants.find(
                        (plant) => plant.value === selectedPlant.value
                      )?.image || ""
                    }
                    alt={
                      plants.find(
                        (plant) => plant.value === selectedPlant.value
                      )?.label || ""
                    }
                    className="h-8 w-8"
                  />
                  {/* {
                    plants.find((plant) => plant.value === selectedPlant.value)
                      ?.label
                  } */}
                </>
              ) : (
                "Ajouter..."
              )}
              {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] translate-x-[200px] translate-y-[-50px] p-0">
            <Command>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    if (plants.length > 0) {
                      updateSelectedPlant(plants[2]);
                      setOpen(false);
                    }
                  }}
                >
                  <Image
                    width={32}
                    height={32}
                    src={plants[2].image}
                    alt={plants[2].label}
                    className="mr-2 h-8 w-8 rounded-full"
                  />
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPlant.value === plants[2].value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {plants[2].label}
                </CommandItem>
              </CommandGroup>

              <CommandInput placeholder="Plante à ajouter..." />
              <CommandEmpty>Aucune plante trouvée.</CommandEmpty>
              <CommandGroup className="max-h-[17rem]">
                {plants.map((plant) => (
                  <CommandItem
                    key={plant.value}
                    value={plant.value}
                    onSelect={(currentValue) => {
                      const selectedPlant = plants.find(
                        (plant) => plant.value === currentValue
                      );
                      if (selectedPlant) {
                        updateSelectedPlant(selectedPlant);
                        setOpen(false);
                      }
                    }}
                  >
                    <Image
                      width={32}
                      height={32}
                      src={plant.image}
                      alt={plant.label}
                      className="mr-2 h-8 w-8 rounded-full"
                    />
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPlant.value === plant.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {plant.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={printPlan}
              className={clsx(
                buttonVariants({ variant: "secondary", size: "icon" })
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-printer stroke-foreground/80 hover:stroke-orange-400"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
              </svg>
            </TooltipTrigger>
            <TooltipContent>
              <p>Imprimer le plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={savePlan}
              className={clsx(
                buttonVariants({ variant: "secondary", size: "icon" })
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-device-floppy stroke-foreground/80 hover:stroke-orange-400"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M14 4l0 4l-6 0l0 -4" />
              </svg>
            </TooltipTrigger>

            <TooltipContent>
              <p>Sauvegarder le plan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={resetGrid}
              className={clsx(
                buttonVariants({ variant: "secondary", size: "icon" })
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash stroke-foreground/80 hover:stroke-orange-400"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </TooltipTrigger>
            <TooltipContent>
              <p>Réinitialiser</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {savedPlan && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={loadPlan}
                className={clsx(
                  buttonVariants({ variant: "secondary", size: "icon" })
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-file-report stroke-foreground/80"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M17 13v4h4" />
                  <path d="M12 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4" />
                </svg>
              </TooltipTrigger>

              <TooltipContent>
                <p>Charger le dernier plan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* <div className="flex flex-col">
        <Popover open={open} onOpenChange={setOpen}>
          
          
        </Popover>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        
        
      </Popover> */}
    </div>
  );
};

type Cell = {
  plant: Plant | null;
};

type CellProps = {
  rowIndex: number;
  colIndex: number;
  cell: Cell;
  handleMouseDown: (rowIndex: number, colIndex: number) => void;
  handleMouseOver: (rowIndex: number, colIndex: number) => void;
  handleMouseUp: (rowIndex: number, colIndex: number) => void;
  isGridMode: boolean;
};

const Cell = memo(function Cell({
  rowIndex,
  colIndex,
  cell,
  handleMouseDown,
  handleMouseOver,
  handleMouseUp,
  isGridMode,
}: CellProps) {
  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      onMouseDown={() => {
        handleMouseDown(rowIndex, colIndex);
      }}
      onMouseOver={() => {
        handleMouseOver(rowIndex, colIndex);
      }}
      onMouseUp={() => {
        handleMouseUp(rowIndex, colIndex);
      }}
      className={clsx(
        "border-box select-none hover:bg-[#a2d5b0]",
        { "border border-[#a2d5b0]/0": !isGridMode },
        { "border border-white": isGridMode },
        { "bg-amber-950/10": cell.plant }
      )}
    >
      {cell.plant && (
        <Image
          className="pointer-events-none h-8 w-8"
          width={32}
          height={32}
          src={cell.plant.image}
          alt={cell.plant.label}
        />
      )}
    </div>
  );
});

type GridProps = {
  cells: Cell[][];
  updateCells: (newCells: Cell[][]) => void;
  numRows: number;
  numCols: number;
  handleMouseDown: (i: number, j: number) => void;
  handleMouseOver: (i: number, j: number) => void;
  handleMouseUp: (i: number, j: number) => void;
  isGridMode: boolean;
  isGrabMode: boolean;
  isGrabbing: boolean;
  translation: { x: number; y: number };
  zoom: number;
  divRef: React.RefObject<HTMLDivElement>;
  grabMouseDown: (event: MouseEvent) => void;
  grabMouseUp: () => void;
  grabMouseMove: (event: MouseEvent) => void;
};

const Grid = ({
  cells,
  updateCells,
  numRows,
  numCols,
  handleMouseDown,
  handleMouseOver,
  handleMouseUp,
  isGridMode,
  isGrabMode,
  isGrabbing,
  translation,
  zoom,
  divRef,
  grabMouseDown,
  grabMouseUp,
  grabMouseMove,
}: GridProps) => {
  return (
    <div
      id="plan"
      className="relative max-h-[85vh] overflow-hidden bg-[#a2d5b0]/60"
    >
      <div
        ref={divRef}
        onMouseDown={(event) => isGrabMode && zoom > 1 && grabMouseDown(event)}
        onMouseUp={() => isGrabMode && zoom > 1 && grabMouseUp()}
        onMouseMove={(event) => isGrabMode && zoom > 1 && grabMouseMove(event)}
        style={{
          cursor: isGrabMode && zoom > 1 ? "grab" : "default",
          transform: `scale(${zoom}) translate(${translation.x}px, ${translation.y}px)`,
        }}
        className={`grid h-[200vh] w-[200vh] grid-cols-76 grid-rows-57`}
      >
        {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cell={cell}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
              handleMouseUp={handleMouseUp}
              isGridMode={isGridMode}
            />
          ))
        )}
        {/* {cells.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={rowIndex - colIndex}
              onMouseDown={() => {
                handleMouseDown(rowIndex, colIndex);
              }}
              onMouseOver={() => {
                handleMouseOver(rowIndex, colIndex);
              }}
              onMouseUp={() => {
                handleMouseUp(rowIndex, colIndex);
              }}
              className={clsx(
                "border-box select-none hover:bg-[#a2d5b0]",
                { "border border-[#a2d5b0]/0": !isGridMode },
                { "border border-white": isGridMode },
                { "bg-amber-950/10": cell.plant }
              )}
            >
              {cell.plant && (
                <Image
                  className="h-8 w-8"
                  width={32}
                  height={32}
                  src={cell.plant.image}
                  alt={cell.plant.label}
                />
              )}
            </div>
          ))
        )} */}
      </div>
    </div>
  );
};

type PlannerProps = {
  plants: Plant[];
};

export const Planner = ({ plants }: PlannerProps) => {
  const isMobileScreen = useMediaQuery("(max-width: 1024px)");

  // const plants = [
  //   {
  //     value: "path",
  //     label: "Chemin",
  //     image: "/path.png",
  //   },
  //   {
  //     value: "poivron",
  //     label: "Poivron",
  //     image: "/poivron.png",
  //   },
  //   {
  //     value: "carotte",
  //     label: "Carotte",
  //     image: "/carotte.png",
  //   },
  //   {
  //     value: "aubergine",
  //     label: "Aubergine",
  //     image: "/aubergine.png",
  //   },
  //   {
  //     value: "absinthe",
  //     label: "Absinthe",
  //     image: "/absinthe.png",
  //   },
  //   {
  //     value: "agastache",
  //     label: "Agastache",
  //     image: "/agastache.png",
  //   },
  //   {
  //     value: "ail",
  //     label: "Ail",
  //     image: "/ail.png",
  //   },
  //   {
  //     value: "arroche",
  //     label: "Arroche",
  //     image: "/arroche.png",
  //   },
  //   {
  //     value: "basilic",
  //     label: "Basilic",
  //     image: "/basilic.png",
  //   },
  //   {
  //     value: "betterave",
  //     label: "Betterave",
  //     image: "/betterave.png",
  //   },
  // ];

  const [selectedPlant, setSelectedPlant] = useState<Plant>(plants[0]);
  const [tempSelectedCells, setTempSelectedCells] = useState(new Set<string>());
  const [addedPlants, setAddedPlants] = useState<{ [key: string]: string }>({});
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [numRows, setNumRows] = useState(57);
  const [numCols, setNumCols] = useState(76);

  const maxRows = 57;
  const maxCols = 76;

  const [previewCols, setPreviewCols] = useState(numCols);
  const [previewRows, setPreviewRows] = useState(numRows);

  const [isMultiSelectEnabled, setIsMultiSelectEnabled] = useState(false);

  const resetAddedPlants = () => {
    setAddedPlants({}); // Réinitialisez les plantes ajoutées à un objet vide
  };

  const resetGrid = () => {
    setCells(initialGrid);
    setSelectedCells(new Set());
  };

  const setSize = (colSize: number, rowSize: number) => {
    setNumCols(colSize);
    setNumRows(rowSize);
  };

  // Redimensionnement
  const updateGridSize = (newNumRows: number, newNumCols: number) => {
    setNumRows(newNumRows);
    setNumCols(newNumCols);
  };

  const handleMultiSelectButtonClick = () => {
    setIsMultiSelectEnabled(!isMultiSelectEnabled);
  };

  const updateSelectedPlant = (plant: Plant) => {
    // Désactiver le mode merge et réinitialisez toMergeCells
    setIsMergeMode(false);
    setToMergeCells([]);

    setSelectedPlant(plant);
  };
  const updateAddedPlants = (newPlants: { [key: string]: string }) => {
    setAddedPlants((prevPlants: { [key: string]: string }) => ({
      ...prevPlants,
      ...newPlants,
    }));
  };

  // État pour suivre si le mode de sélection est activé
  const [isMergeMode, setIsMergeMode] = useState(false);
  // État pour suivre les cellules sélectionnées
  const [toMergeCells, setToMergeCells] = useState<{ i: number; j: number }[]>(
    []
  );
  const [mergedCells, setMergedCells] = useState<{ i: number; j: number }[]>(
    []
  );

  // Gestionnaire pour le bouton de fusion
  const handleMergeButtonClick = () => {
    if (isMergeMode && toMergeCells.length > 0) {
      // Si le mode de fusion est activé et que des cellules ont été sélectionnées,
      // ajoutez-les à mergedCells et réinitialisez toMergeCells
      setMergedCells([...mergedCells, ...toMergeCells]);
      cancelMergeButtonClick();
      setToMergeCells([]);
    } else {
      // Sinon, activez ou désactivez simplement le mode de fusion
      setIsMergeMode(!isMergeMode);
    }
  };

  const cancelMergeButtonClick = () => {
    setIsMergeMode(false);
    setToMergeCells([]);
  };

  // Gestionnaire pour le clic sur une cellule
  const handleCellClick = (i: number, j: number) => {
    if (isMergeMode) {
      setToMergeCells([...toMergeCells, { i, j }]);
    }
  };

  const [isGridMode, setIsGridMode] = useState<boolean>(false);
  const toggleGridMode = () => {
    setIsGridMode(!isGridMode);
  };

  type Cell = {
    plant: Plant | null;
  };

  const initialGrid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => ({ plant: null }))
  );
  // ------------------------------------------
  const [cells, setCells] = useState<Cell[][]>(initialGrid);

  const [startCell, setStartCell] = useState<{ i: number; j: number } | null>(
    null
  );
  const [isSelecting, setIsSelecting] = useState(false);

  const updateCells = (newCells: Cell[][]) => {
    setCells(newCells);
  };

  const handleMouseDown = (i: number, j: number) => {
    if (isMergeMode) {
      return;
    }
    if (isGrabMode) {
      return;
    }
    const newSelectedCells = new Set(selectedCells);
    const key = `${i}-${j}`;
    newSelectedCells.add(key);
    setSelectedCells(newSelectedCells);
    setIsSelecting(true);
    setStartCell({ i, j });
  };

  const handleMouseOver = (i: number, j: number) => {
    if (isMergeMode) {
      return;
    }
    if (isGrabMode) {
      return;
    }
    if (isSelecting && startCell && isMultiSelectEnabled) {
      const newSelectedCells = new Set(selectedCells);
      const minI = Math.min(startCell.i, i);
      const maxI = Math.max(startCell.i, i);
      const minJ = Math.min(startCell.j, j);
      const maxJ = Math.max(startCell.j, j);
      for (let i = minI; i <= maxI; i++) {
        for (let j = minJ; j <= maxJ; j++) {
          const key = `${i}-${j}`;
          newSelectedCells.add(key);
        }
      }
      setSelectedCells(newSelectedCells);
    }
  };

  const handleMouseUp = (i: number, j: number) => {
    if (isMergeMode) {
      return;
    }
    if (isGrabMode) {
      return;
    }
    setIsSelecting(false);
    if (startCell && startCell.i === i && startCell.j === j) {
      const newSelectedCells = new Set(selectedCells);
      const key = `${i}-${j}`;
      if (newSelectedCells.has(key)) {
        newSelectedCells.delete(key);
      } else {
        newSelectedCells.add(key);
      }
      setSelectedCells(newSelectedCells);
    }
    if (selectedPlant) {
      const newCells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const key = `${rowIndex}-${colIndex}`;
          if (selectedCells.has(key)) {
            return { ...cell, plant: selectedPlant };
          }
          return cell;
        })
      );
      updateCells(newCells);
    }
    setSelectedCells(new Set());
  };

  // ---------------ZOOM------------------
  const [zoom, setZoom] = useState(1.5);
  const increaseZoom = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Limite le zoom à 2x
  };

  const decreaseZoom = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Limite le zoom à 0.5x
  };

  const [isGrabMode, setIsGrabMode] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [translation, setTranslation] = useState({ x: 0, y: 0 });

  const resetTranslation = () => {
    setTranslation({ x: 0, y: 0 });
  };

  const handleGrabButtonClick = () => {
    setIsGrabMode((prevIsGrabMode) => !prevIsGrabMode);
  };

  const initialPositionRef = useRef({ x: 0, y: 0 });

  const isGrabbingRef = useRef(false);

  const grabMouseDown = (event: React.MouseEvent) => {
    isGrabbingRef.current = true;
    initialPositionRef.current = { x: event.clientX, y: event.clientY };
  };

  const grabMouseUp = () => {
    isGrabbingRef.current = false;
  };

  const grabMouseMove = (event: React.MouseEvent) => {
    if (isGrabbingRef.current) {
      const deltaX = (event.clientX - initialPositionRef.current.x) / zoom;
      const deltaY = (event.clientY - initialPositionRef.current.y) / zoom;
      setTranslation((prevTranslation) => ({
        x: prevTranslation.x + deltaX,
        y: prevTranslation.y + deltaY,
      }));
      initialPositionRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  useEffect(() => {
    if (zoom === 1) {
      setIsGrabMode(false);
    }
  }, [zoom]);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const scale = event.deltaY < 0 ? 1.1 : 0.9; // Ajustez ces valeurs pour modifier la vitesse de zoom
    setZoom((prevZoom) => {
      const newZoom = prevZoom * scale;
      if (newZoom < 1) return 1; // Limite le zoom à un minimum de 1
      if (newZoom > 2) return 2; // Limite le zoom à un maximum de 2
      return newZoom;
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel as EventListener, {
        passive: false,
      });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel as EventListener);
      }
    };
  }, []);

  const [savedPlan, setSavedPlan] = useState<string | null>(null);

  const savePlan = () => {
    const planString = JSON.stringify(cells);
    setSavedPlan(planString);
  };

  const loadPlan = () => {
    if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      setCells(plan);
    }
  };

  const printPlan = () => {
    window.print();
  };
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal &&
        isMobileScreen &&
        createPortal(
          <MobileModalContent closeModal={closeModal} />,
          document.body
        )}
      {showModal &&
        !isMobileScreen &&
        createPortal(<ModalContent closeModal={closeModal} />, document.body)}
      <div className="relative flex min-h-screen items-center justify-center bg-[#F9F3F3] p-4 text-[#000001]">
        <Toolbar
          selectedPlant={selectedPlant}
          updateSelectedPlant={updateSelectedPlant}
          plants={plants}
          savePlan={savePlan}
          loadPlan={loadPlan}
          savedPlan={savedPlan}
          printPlan={printPlan}
          resetGrid={resetGrid}
        />
        <PlannerMenu
          isMultiSelectEnabled={isMultiSelectEnabled}
          isGrabMode={isGrabMode}
          isGridMode={isGridMode}
          handleGrabButtonClick={handleGrabButtonClick}
          handleMultiSelectButtonClick={handleMultiSelectButtonClick}
          toggleGridMode={toggleGridMode}
          zoom={zoom}
          resetTranslation={resetTranslation}
        />

        <div
          id="plan_legend"
          className="absolute bottom-10 flex flex-row items-center text-sm font-semibold text-foreground"
        >
          <span className="text-center">Échelle du plan:</span>
          <span className="w-10 bg-red-400 p-1 text-center">1m</span>
        </div>

        <Grid
          cells={cells}
          updateCells={updateCells}
          numRows={numRows}
          numCols={numCols}
          handleMouseDown={handleMouseDown}
          handleMouseOver={handleMouseOver}
          handleMouseUp={handleMouseUp}
          isGridMode={isGridMode}
          isGrabMode={isGrabMode}
          isGrabbing={isGrabbing}
          translation={translation}
          zoom={zoom}
          divRef={containerRef}
          grabMouseDown={grabMouseDown}
          grabMouseUp={grabMouseUp}
          grabMouseMove={grabMouseMove}
        />
      </div>
    </>
  );
};

type ModalContentProps = {
  closeModal: () => void;
};

export const ModalContent = ({ closeModal }: ModalContentProps) => {
  return (
    <>
      <div onClick={closeModal} className="fixed inset-0 bg-slate-800/75"></div>
      <div className="fixed z-50 flex h-full w-full translate-y-[-90%] items-center justify-center">
        <Arrow1 />
        <Arrow3 />
        <div className="fixed w-[40%] rounded bg-white p-8">
          <h2 className="mb-4 text-2xl">Guide d utilisation rapide</h2>
          <p className="mb-4">
            Dessine ton potager à l aide de zones comme la pelouse, les arbres,
            les murs, les haies, les plantes etc ...
          </p>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={closeModal}
          >
            Passer
          </button>
        </div>
        <Arrow2 />
      </div>
    </>
  );
};
type MobileModalContentProps = {
  closeModal: () => void;
};

export const MobileModalContent = ({ closeModal }: MobileModalContentProps) => {
  return (
    <>
      <div onClick={closeModal} className="fixed inset-0 bg-slate-800/75"></div>
      <div className="fixed z-50 flex h-full w-full translate-y-[-100%] items-center justify-center">
        <div className="fixed w-[40%] rounded bg-white p-8">
          <h2 className="mb-4 text-2xl">Plan du potager</h2>
          <h4 className="text-red-300">Avertissement</h4>
          <p className="mb-4">
            Cette section n'est pas adaptée aux écrans mobiles, afin d'optimiser
            votre expérience veuilez utiliser un écran plus grand.
          </p>
          <Link href="/">Retour</Link>
        </div>
      </div>
    </>
  );
};
