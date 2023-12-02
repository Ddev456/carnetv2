"use client";

import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, AlignLeft } from "lucide-react";
import { useSideBarStore } from "@/store/SideBarStore";

export const ToggleSidebar = () => {
  const { isOpen, toggle } = useSideBarStore();
  return (
    <Button
      variant={"ghost"}
      className="hidden hover:bg-primary/10 hover:text-foreground md:flex"
      onClick={() => toggle()}
    >
      {isOpen ? <AlignLeft size={24} /> : <AlignJustify size={24} />}
    </Button>
  );
};
