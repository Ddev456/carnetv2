"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type TypeEvent =
  | "nursery"
  | "seedling"
  | "plantation"
  | "flowering"
  | "harvest";

type NotificationItem = {
  id: string;
  userId: string;
  plantId: string;
  plantName: string;
  startDate: Date;
  typeEvent: TypeEvent;
  updatedAt: Date;
};

type NotificationListProps = {
  notifications: NotificationItem[];
};

export const NotificationsList = ({ notifications }: NotificationListProps) => {
  return (
    <>
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
    </>
  );
};
