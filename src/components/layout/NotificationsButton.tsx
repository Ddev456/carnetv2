import { BellDot } from "lucide-react";

import { Button, buttonVariants } from "../ui/button";
import { prisma } from "@/lib/prisma";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/auth";
import { NotificationsList } from "./NotificationsList";
import clsx from "clsx";

export const NotificationsButton = async () => {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    return <></>;
  }

  const userId = session.user.id;

  const notifications = await prisma.userNotifications.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "asc",
    },
  });

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
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
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
        <NotificationsList notifications={notifications} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
