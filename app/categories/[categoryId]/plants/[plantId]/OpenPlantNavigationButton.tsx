"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftOpen } from "lucide-react";
import {
  usePlantNavigationState,
  usePlantNavigationStore,
} from "../plant-navigation.store";

export const OpenPlantNavigationButton = () => {
  const setState = usePlantNavigationStore((s) => s.setState);
  const state = usePlantNavigationState();

  if (state === "sticky") return;

  return (
    <Button onClick={() => setState("open")} size="sm" variant="ghost">
      <PanelLeftOpen />
    </Button>
  );
};
