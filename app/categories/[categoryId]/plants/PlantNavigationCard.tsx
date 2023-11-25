"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { CategoryType } from "../category.query";
import { PlantItem } from "./PlantItem";
import {
  usePlantNavigationState,
  usePlantNavigationStore,
} from "./plant-navigation.store";

export default function PlantNavigationCard({
  category,
}: {
  category: CategoryType;
}) {
  const setState = usePlantNavigationStore((s) => s.setState);
  const state = usePlantNavigationState();

  if (state === "sticky") {
    return (
      <Card className="max-w-xs flex-1">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>{category.name}</CardTitle>
          <Button onClick={() => setState("close")} size="sm" variant="ghost">
            <PanelLeftClose />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {category.plants.map((plant) => (
            <PlantItem plant={plant} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Sheet open={state === "open"} onOpenChange={() => setState("close")}>
      <SheetContent side="left">
        <SheetHeader className="flex-row items-center gap-4 space-y-0">
          <SheetTitle>Plants</SheetTitle>
          <Button
            onClick={() => setState("sticky")}
            size="sm"
            variant="ghost"
            className="hidden lg:block"
          >
            <PanelLeftOpen />
          </Button>
        </SheetHeader>
        <ul
          className="my-8 flex flex-col gap-2"
          onClick={() => {
            setState("close");
          }}
        >
          {category.plants.map((plant) => (
            <PlantItem plant={plant} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
