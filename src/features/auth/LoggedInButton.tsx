"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { LogOut, User2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut({ callbackUrl: "/" });
    },
  });

  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-foreground text-background hover:bg-muted"
            variant="default"
            size="sm"
          >
            <Avatar className="mr-2 h-6 w-6">
              <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
              {props.user.image && (
                <AvatarImage
                  src={props.user.image}
                  alt={props.user.name ?? "user picture"}
                />
              )}
            </Avatar>
            {props.user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={clsx(
              buttonVariants({ variant: "ghost" }),
              "hover:bg-secondary"
            )}
            asChild
          >
            <Link href="/account">
              <User2 className="mr-2" size={12} />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <LogOut className="mr-2" size={12} />
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Êtes-vous sur de vouloir vous déconnecter ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Annuler</Button>
            </AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={mutation.isPending}
              onClick={() => {
                mutation.mutate();
              }}
            >
              {mutation.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <LogOut className="mr-2" size={12} />
              )}
              Déconnexion
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};
