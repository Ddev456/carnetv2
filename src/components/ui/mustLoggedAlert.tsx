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

export const MustLoggedAlert = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mt-4 bg-primary" variant="default">
          Ajouter au potager
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
              ici
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
