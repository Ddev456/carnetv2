"use client";

import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { Notifications } from "@/db/query/user.query";

type NotificationButtonProps = {
  notifications: Notifications;
};

export const NotificationsButton = ({
  notifications,
}: NotificationButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-secondary/80 hover:text-foreground"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bell-ringing stroke-foreground/60"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
          <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="translate-x-[-4rem]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-borders" />
        <DropdownMenuItem>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center">
              {/* <div className="flex"> */}
              <div className="relative h-auto w-[3rem]">
                {/* emoji */}{" "}
                <span className="h-full w-full rounded bg-primary/80 p-1.5">
                  {" "}
                  🥕{" "}
                </span>
                <span className="absolute bottom-0 left-4 h-3.5 w-3.5 translate-y-[0.5rem]">
                  ➕
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-md">
                  <span className="font-semibold text-accent/80">
                    {" "}
                    Potager :{" "}
                  </span>{" "}
                  Tomate ajouté(e)
                </p>
                <span className="text-accent/50">il y a 2 min</span>
              </div>
            </li>
            <li className="flex items-center">
              {/* <div className="flex"> */}
              <div className="relative h-auto w-[3rem]">
                {/* emoji */}{" "}
                <span className="h-full w-full rounded bg-primary/80 p-1.5">
                  {" "}
                  ✏️{" "}
                </span>
                <span className="absolute bottom-0 left-4 h-3.5 w-3.5 translate-y-[0.5rem]">
                  ➕
                </span>
              </div>
              {/* </div> */}
              <div className="flex flex-col">
                <p className="text-md">
                  {" "}
                  <span className="font-semibold text-accent/80">
                    {" "}
                    Journal :{" "}
                  </span>{" "}
                  acheter du terreau
                </p>
                <span className="text-accent/50">il y a 47 min</span>
              </div>
            </li>
          </ul>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
