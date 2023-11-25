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
          "hover:bg-primary/75 hover:text-foreground"
        )}
      >
        <BellDot />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Plante(s) ajoutée(s) au potager</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <NotificationsList notifications={notifications} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
