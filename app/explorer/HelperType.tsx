import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

export const HelperType = () => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Assistant Potager</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            De quelle étape souhaitez-vous partir ?
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant={"secondary"}
              className={cn("w-[280px] justify-start text-left font-normal")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Semis sous abri
            </Button>
            <Button
              variant={"secondary"}
              className={cn("w-[280px] justify-start text-left font-normal")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Semis
            </Button>
            <Button
              variant={"secondary"}
              className={cn("w-[280px] justify-start text-left font-normal")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Plantation
            </Button>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mx-auto">
        <AlertDialogCancel
          className={clsx(
            buttonVariants({ variant: "destructive" }),
            "border-borders bg-destructive/60"
          )}
        >
          Annuler
        </AlertDialogCancel>
        {/* <AlertDialogAction
          className={clsx(
            buttonVariants({ variant: "default" }),
            "hover:bg-primary/60"
          )}
        >
          Ajouter
        </AlertDialogAction> */}
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
