import { SubmitButton } from "@/components/form/SubmitButton";
import React from "react";
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

type UpdateConfirmationProps = {
  handleAction: () => Promise<void>;
};

export const UpdateConfirmation = ({
  handleAction,
}: UpdateConfirmationProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-amber-700">Mettre à jour mon potager</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Merci de confirmer l'action</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va écraser les données précédentes générées avec
            l'ajout de la plante au potager par celles qui viennent d'être
            saisies.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction>
            <form action={handleAction}>
              <SubmitButton>Confirmer</SubmitButton>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
