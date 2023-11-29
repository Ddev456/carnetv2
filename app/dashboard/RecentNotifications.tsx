import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { NotificationsType } from "./notifications.action";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type RecentNotificationsProps = {
  notifications: NotificationsType | null;
};

export const RecentNotifications = ({
  notifications,
}: RecentNotificationsProps) => {
  const locale = fr;
  return (
    <div className="space-y-8">
      {notifications &&
        notifications?.map((notification) => {
          return (
            <div className="flex items-center">
              {notification.plantCategory === "Légume-Grain"
                ? "🫛"
                : notification.plantCategory === "Légume-Feuille"
                ? "🥬"
                : notification.plantCategory === "Légume-Racine"
                ? "🥕"
                : notification.plantCategory === "Légume-Fruit"
                ? "🫑"
                : notification.plantCategory === "Courges & Courgettes"
                ? "🍈"
                : notification.plantCategory === "Bulbes & Tubercules"
                ? "🧅"
                : notification.plantCategory === "Petits fruits"
                ? "🍓"
                : ""}
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.plantName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.plantCategory}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {format(notification.updatedAt, "MMMM d, yyyy h:mm a", {
                  locale: locale,
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};
