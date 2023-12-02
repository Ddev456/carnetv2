import React from "react";
import { type Notifications } from "@/db/query/user.query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type RecentNotificationsProps = {
  notifications: Notifications | null;
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
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.plantName}
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
