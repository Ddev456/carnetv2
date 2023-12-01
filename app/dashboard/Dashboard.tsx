"use client";

import { useSidebarStore } from "@/components/layout/Sidebar.store";
import clsx from "clsx";
import React from "react";

export const Dashboard = () => {
  const { state } = useSidebarStore();
  return (
    <div
      className={clsx("flex w-full flex-col gap-4 pt-[4rem]", {
        "md:pl-[4rem]": state,
        "md:pl-[12rem]": !state,
      })}
    >
      Dashboard
    </div>
  );
};
