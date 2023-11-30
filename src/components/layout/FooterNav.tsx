"use client";

import React from "react";
import { Typography } from "../ui/typography";
import { useSelectedLayoutSegment } from "next/navigation";

export const FooterNav = () => {
  const segment = useSelectedLayoutSegment();

  const notAppPage = segment === null;

  if (!notAppPage) return;
  return (
    <>
      <div className="flex">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground"></div>
        </div>
        <div className="flex w-full items-center justify-center py-6">
          <Typography variant="base" className="text-xs text-foreground/60">
            &copy; {new Date().getFullYear()} Carnet Potager
          </Typography>
        </div>
      </div>
    </>
  );
};
