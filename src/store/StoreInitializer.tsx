"use client";

import { useRef } from "react";
import { useSidebarStore } from "@/components/layout/Sidebar.store";

function StoreInitializer({ state }: { state: boolean }) {
  const initialized = useRef(false);
  const { setState } = useSidebarStore();
  if (!initialized.current) {
    setState(state);
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
