"use client";

import React from "react";
import clsx from "clsx";
import { useSidebarStore } from "@/components/layout/Sidebar.store";
import { Session } from "next-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { AuthButton } from "@/features/auth/AuthButton";
import { LoggedInButton } from "@/features/auth/LoggedInButton";

type SidebarProps = {
  user?: Session["user"];
};

export const Sidebar = ({ user }: SidebarProps) => {
  const { state } = useSidebarStore();
  if (!user) return;
  return (
    <div
      className={clsx(
        "duration-600 text-semibold text-md fixed top-0 hidden h-screen border-r border-borders bg-background pt-[4rem] text-foreground/80 transition-all md:flex md:flex-col md:items-center md:justify-between md:gap-8 md:space-y-8 md:px-4 md:pb-8",
        {
          "w-[4rem] group hover:w-[12rem]": state,
        },
        {
          "w-[12rem]": !state,
        }
      )}
    >
      <ul className="flex w-full flex-col items-center justify-around gap-2 pt-[8rem]">
        <li
          className={clsx("w-full rounded-xl py-2 hover:bg-secondary/50", {
            hidden: !user,
          })}
        >
          <Link
            href="/dashboard"
            className={clsx(
              "sidebar-menu-link flex items-center justify-start gap-4"
            )}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-fence stroke-foreground/60"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 12v4h16v-4z" />
                <path d="M6 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6" />
                <path d="M14 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6" />
              </svg>
              {/* <LayoutDashboard size={20} /> */}
            </span>
            <span
              className={clsx("text-center group-hover:inline-flex", {
                hidden: state,
              })}
            >
              Mon potager
            </span>
          </Link>
        </li>
        <li className={clsx("w-full rounded-xl py-2 hover:bg-secondary/50")}>
          <Link
            href="/explorer"
            className={clsx(
              "sidebar-menu-link flex items-center justify-start gap-4"
            )}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-books stroke-foreground/60"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M5 8h4" />
                <path d="M9 16h4" />
                <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
                <path d="M14 9l4 -1" />
                <path d="M16 16l3.923 -.98" />
              </svg>
              {/* <Search size={20} /> */}
            </span>
            <span
              className={clsx("text-center group-hover:inline-flex", {
                hidden: state,
              })}
            >
              Légumothèque
            </span>
          </Link>
        </li>
        <li
          className={clsx("w-full rounded-xl py-2 hover:bg-secondary/50", {
            hidden: !user,
          })}
        >
          <Link
            href="#"
            className={clsx(
              "sidebar-menu-link flex items-center justify-start gap-4"
            )}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-layout-dashboard stroke-foreground/60"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4h6v8h-6z" />
                <path d="M4 16h6v4h-6z" />
                <path d="M14 12h6v8h-6z" />
                <path d="M14 4h6v4h-6z" />
              </svg>
            </span>
            <span
              className={clsx("text-center group-hover:inline-flex", {
                hidden: state,
              })}
            >
              Mon Journal
            </span>
          </Link>
        </li>
      </ul>
      <nav
        className={clsx("bottom-0 flex items-center justify-center gap-1", {
          "flex-col": state,
        })}
      >
        {/* <a
          href="#"
          className={clsx(
            "flex items-center justify-start gap-4 py-2 hover:bg-secondary/50"
          )}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-adjustments-filled cursor-not-allowed stroke-foreground/60"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M6 3a1 1 0 0 1 .993 .883l.007 .117v3.171a3.001 3.001 0 0 1 0 5.658v7.171a1 1 0 0 1 -1.993 .117l-.007 -.117v-7.17a3.002 3.002 0 0 1 -1.995 -2.654l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-3.17a1 1 0 0 1 1 -1z"
                stroke-width="0"
                fill="currentColor"
              />
              <path
                d="M12 3a1 1 0 0 1 .993 .883l.007 .117v9.171a3.001 3.001 0 0 1 0 5.658v1.171a1 1 0 0 1 -1.993 .117l-.007 -.117v-1.17a3.002 3.002 0 0 1 -1.995 -2.654l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-9.17a1 1 0 0 1 1 -1z"
                stroke-width="0"
                fill="currentColor"
              />
              <path
                d="M18 3a1 1 0 0 1 .993 .883l.007 .117v.171a3.001 3.001 0 0 1 0 5.658v10.171a1 1 0 0 1 -1.993 .117l-.007 -.117v-10.17a3.002 3.002 0 0 1 -1.995 -2.654l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-.17a1 1 0 0 1 1 -1z"
                stroke-width="0"
                fill="currentColor"
              />
            </svg>
          </span>
        </a> */}

        <a
          href="#"
          className={clsx(
            "flex items-center justify-start gap-4 pt-2 hover:bg-secondary/50"
          )}
        >
          <span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/account/settings">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-settings stroke-foreground/60"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    </svg>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Paramètres</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </a>
        {user && <LoggedInButton user={user} />}
      </nav>
    </div>
  );
};
