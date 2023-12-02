"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams || "");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`explorer?${params.toString()}`);
    // replace(`${pathname}?${params.toString()}`);
  }, 700);
  return (
    <div className="relative flex flex-1 shrink-0">
      <Input
        className="peer block w-full rounded-md border border-borders py-[9px] pl-10 text-sm outline-2 placeholder:text-foreground/60"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.currentTarget.value);
        }}
        defaultValue={searchParams?.get("query")?.toString()}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-search absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 stroke-foreground/80"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    </div>
  );
};
