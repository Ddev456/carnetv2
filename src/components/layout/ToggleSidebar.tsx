"use client";

import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, AlignLeft } from "lucide-react";
import { useSidebarStore } from "./Sidebar.store";

export const ToggleSidebar = () => {
  //   const [isCollapsed, setIsCollapsed] = useState(false);
  const { state, setState } = useSidebarStore();
  return (
    <Button
      variant={"ghost"}
      className="hidden hover:bg-primary/10 hover:text-foreground md:flex"
      onClick={() => setState(!state)}
    >
      {state ? <AlignLeft size={24} /> : <AlignJustify size={24} />}
    </Button>
  );
};
