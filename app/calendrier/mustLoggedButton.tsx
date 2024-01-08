import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const MustLoggedButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-accent/60" variant={"ghost"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-calendar-bolt stroke-foreground/80"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13.5 21h-7.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <path d="M19 16l-2 3h4l-2 3" />
          </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Vous devez être authentifié pour effectuer cette action
          </AlertDialogTitle>
          <AlertDialogDescription>
            Inscrivez-vous / ou connectez-vous
            <Link className="underline" href="http://localhost:3000/login">
              {""} ici
            </Link>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
