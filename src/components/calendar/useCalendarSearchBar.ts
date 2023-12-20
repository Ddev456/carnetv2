import React, { useState } from "react";

export const useCalendarSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };
  return { searchValue, handleSearchChange };
};
