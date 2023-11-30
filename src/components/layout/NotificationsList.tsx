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
      {notifications.map((plant) => {
        return <DropdownMenuItem>{plant.plantName} ajouté</DropdownMenuItem>;
      })}
    </>
  );
};
