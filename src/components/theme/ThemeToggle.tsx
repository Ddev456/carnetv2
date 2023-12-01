"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="hover:bg-secondary/80"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {/* <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-sun-high stroke-foreground/60 dark:hidden"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
        <path d="M6.343 17.657l-1.414 1.414" />
        <path d="M6.343 6.343l-1.414 -1.414" />
        <path d="M17.657 6.343l1.414 -1.414" />
        <path d="M17.657 17.657l1.414 1.414" />
        <path d="M4 12h-2" />
        <path d="M12 4v-2" />
        <path d="M20 12h2" />
        <path d="M12 20v2" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-moon-stars hidden stroke-foreground/60 dark:block"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
        <path d="M19 11h2m-1 -1v2" />
      </svg>
      {/* <Moon className="hidden h-5 w-5 dark:block" /> */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
