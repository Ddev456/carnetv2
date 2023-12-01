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
import Image from "next/image.js";
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
        <DropdownMenuTrigger
          className="rounded-full border border-borders"
          asChild
        >
          {/* <Button
            className="bg-transparent text-background hover:bg-muted md:flex md:bg-foreground"
            variant="default"
            size="sm"
          > */}
          {/* <Avatar className="relative h-6 w-6 overflow-visible">
            <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
            {props.user.image && (
              <AvatarImage
                src={props.user.image}
                alt={props.user.name ?? "user picture"}
              />
            )}
            <span className="absolute left-7 top-0  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
          </Avatar> */}
          {/* <span className="hidden md:block">{props.user.name}</span> */}
          {/* </Button> */}
          <div className="relative cursor-pointer">
            <Image
              className="h-8 w-8 rounded-full"
              src={props.user.image || ""}
              alt="avatar"
              width={26}
              height={26}
            />
            <span className="absolute left-6 top-0 h-3.5 w-3.5 rounded-full border-2 border-borders bg-primary"></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={clsx(buttonVariants({ variant: "ghost" }))}
            asChild
          >
            <Link href="/account">
              <User2 className="mr-2" size={12} />
              Mon compte
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <LogOut className="mr-2" size={12} />
              Déconnexion
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
