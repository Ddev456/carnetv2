import React from "react";
import { type PlantInfos } from "../../../app/explorer/plant.type";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { handleEventState } from "../../../app/explorer/plant.action";
import { toast } from "sonner";
import { Plant } from "../../db/query/plant.query";

type AddButtonProps = {
  plant: Plant;
  buttonState: boolean;
};

export const AddButton = ({ plant, buttonState }: AddButtonProps) => {
  const mutation = useMutation({ mutationFn: handleEventState });

  const handleAction = async () => {
    const response = await mutation.mutateAsync({
      plantId: plant.id,
      plantName: plant.name,
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
