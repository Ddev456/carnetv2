import React from "react";
import { PlantInfos } from "../dashboard/plant.query";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { handleEventState } from "./plant.action";
import { toast } from "sonner";

type AddButtonProps = {
  plant: PlantInfos;
  buttonState: boolean;
  updateButton: (value: boolean) => void;
};

export const AddButton = ({
  plant,
  buttonState,
  updateButton,
}: AddButtonProps) => {
  const mutation = useMutation({ mutationFn: handleEventState });

  const handleAction = async () => {
    const response = await mutation.mutateAsync({
      plantId: plant.id,
      plantName: plant.name,
      plantCategory: plant.category.name,
      startDate: null,
      typeEvent: null,
    });
    if (response?.data?.error) {
      toast.error("Limite d'ajout au potager atteinte ! [Mode démo]");
    }

    if (response?.data?.success) {
      toast.success("Plante ajoutée avec succès");
    }
  };
  return (
    <>
      {" "}
      {buttonState === false ? (
        <form action={handleAction}>
          <Button className="bg-lime-500/60 hover:bg-lime-500">
            Ajouter à mon potager
          </Button>
        </form>
      ) : (
        <Button disabled variant={"secondary"}>
          Ajouté
        </Button>
      )}
    </>
  );
};
