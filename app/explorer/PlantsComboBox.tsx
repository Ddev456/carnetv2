"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { PlantInfos, plantsDataTable } from "../dashboard/plant.query";
import { categoriesT, categoryId } from "./Explorer";

interface PlantsComboboxProps {
  categories: categoriesT[];
  selectedCategory: categoryId;
  // plants: plantsDataTable;
  handleSelect: (plant: PlantInfos) => void;
  onSelectCategory: (category: categoryId) => void;
}

export const PlantsComboBox = ({
  categories,
  selectedCategory,
  handleSelect,
  onSelectCategory,
}: PlantsComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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

  const selection = !selectedCategory
    ? categories[0].plants
    : categories.filter((cat) => cat.id === selectedCategory)[0].plants;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border border-borders bg-primary/10 shadow transition-colors hover:bg-primary/20 hover:text-foreground md:w-[45%]"
        >
          {value
            ? categories.find((cat) => cat.id === selectedCategory)?.name
            : // ? plants.find((plant) => plant.name === value)?.name
              "Sélectionner une plante ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-[18rem] md:w-[34rem]">
          <CommandInput
            className="text-foregound"
            placeholder="Rechercher une plante ..."
          />
          <CommandEmpty>Aucune plante trouvée.</CommandEmpty>
          <CommandGroup>
            {/* {plants.map((plant) => ( */}
            {selection.map((plant) => (
              <CommandItem
                key={plant.id}
                value={plant.name}
                className="hover:bg-primary/80"
                onSelect={(currentValue: string) => {
                  handleSelect(plant);
                  onSelectCategory(categoryId(plant.categoryType));
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === plant.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {plant.name.toUpperCase()}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
