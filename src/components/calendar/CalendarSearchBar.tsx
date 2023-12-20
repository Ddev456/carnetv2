import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCalendarSearchBar } from "./useCalendarSearchBar";

export const CalendarSearchBar = () => {
  const { searchValue, handleSearchChange } = useCalendarSearchBar();
  return (
    <Input
      type="text"
      value={searchValue}
      onChange={handleSearchChange}
      placeholder="Rechercher des événements"
    />
  );
};
