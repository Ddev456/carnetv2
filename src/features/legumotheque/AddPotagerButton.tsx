"use client";

import { SubmitButton } from "@/components/form/SubmitButton";
import {
  handleEventState,
  handleRemovePotager,
} from "../../../app/categories/[categoryId]/plants/[plantId]/plant.action";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const AddPotagerButton = ({
  plantId,
  plantName,
  plantCategory,
  isPotager,
}: {
  plantId: string;
  plantName: string;
  plantCategory: string;
  isPotager: boolean;
}) => {
  const mutation = useMutation({ mutationFn: handleEventState });
  const removeMutation = useMutation({ mutationFn: handleRemovePotager });

  const handleRemove = async () => {
    const response = await removeMutation.mutateAsync({
      plantId: plantId,
    });

    // const response = await handleRemovePotager({
    //   plantId: plantId,
    // });

    if (response?.data?.update) {
      toast.warning("Plante supprimée du potager avec succès");
    }
  };
  const handleSubmit = async () => {
    const response = await mutation.mutateAsync({
      plantId: plantId,
      plantName: plantName,
      plantCategory: plantCategory,
      startDate: null,
      typeEvent: null,
    });
    // const response = await handleEventState({
    //   plantId: plantId,
    //   plantName: plantName,
    //   plantCategory: plantCategory,
    //   startDate: null,
    //   typeEvent: null,
    // });
    // if (response?.data?.warning) {
    //   toast.warning("Veuillez sélectionner une date");
    //   return;
    // }
    if (response?.data?.error) {
      toast.error("Limite d'ajout au potager atteinte ! [Mode démo]");
    }

    if (response?.data?.success) {
      toast.success("Plante ajoutée avec succès");
    }
  };
  // const handleSubmit = handleEventState.bind({plantId: plantId, plantName: plantName, plantCategory: plantCategory});
  return (
    <>
      {!isPotager ? (
        <form action={handleSubmit}>
          <SubmitButton>Ajouter</SubmitButton>
        </form>
      ) : (
        <form action={handleRemove}>
          <SubmitButton className="bg-secondary">Retirer</SubmitButton>
        </form>
      )}
    </>
  );
};
