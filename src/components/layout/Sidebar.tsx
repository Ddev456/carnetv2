"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SIDEBARITEMS } from "./constants";

export const Sidebar = () => {
  const session = useSession();
  const user = session.data?.user;
  const [isCollapsed, toggle] = useState(false);

  if (!user) return;
  return (
    <div
      className={clsx(
        "duration-600 text-semibold text-md sticky top-0 hidden h-screen border-r border-borders bg-background pt-[2rem] text-foreground/80 transition-all md:flex md:flex-col md:items-center md:justify-between md:gap-8 md:space-y-8 md:px-4 md:pb-8",
        {
          "w-[4rem]": isCollapsed,
        },
        {
          "w-[12rem]": !isCollapsed,
        }
      )}
    >
      <div className="flex pb-4">
        <Link href="/" className={clsx({ hidden: isCollapsed })}>
          Carnet Potager
        </Link>
        🥕
      </div>
      <Button
        className="absolute right-0 top-14 translate-x-6 border-0"
        onClick={() => toggle(!isCollapsed)}
      >
        {isCollapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevrons-right stroke-foreground/80"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7l5 5l-5 5" />
            <path d="M13 7l5 5l-5 5" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevrons-left stroke-foreground/80"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11 7l-5 5l5 5" />
            <path d="M17 7l-5 5l5 5" />
          </svg>
        )}
      </Button>
      <aside className="flex  h-screen flex-col justify-between">
        <ul className="flex w-full flex-col items-center justify-around gap-2">
          {SIDEBARITEMS.map(({ name, href, icon: Icon }) => (
            <li
              key={name}
              className={clsx("w-full rounded-xl py-2 hover:bg-secondary/50")}
            >
              <Link
                href={href}
                className={clsx(
                  "sidebar-menu-link flex items-center justify-start gap-4"
                )}
              >
                <span>
                  <Icon />
                </span>
                <span
                  className={clsx("text-center", {
                    "text-center hidden": isCollapsed,
                  })}
                >
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <nav
          className={clsx("bottom-0 flex items-center justify-center gap-1", {
            "flex-col": isCollapsed,
          })}
        >
          <ThemeToggle />
          <LoggedInButton user={user} />
        </nav>
      </aside>
    </div>
  );
};
