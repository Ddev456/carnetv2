import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PlantsCard } from "./plant.query";

export type CategoryCardProps = {
  plant: PlantsCard;
};

export const PlantCard = (props: CategoryCardProps) => {
  return (
    <Card className="transition-transform hover:scale-105 hover:bg-accent">
      <CardHeader className="flex flex-row gap-3 space-y-0">
        <Avatar className="h-16 w-16 rounded">
          <AvatarFallback>{props.plant.name[0]}</AvatarFallback>
          {props.plant.thumbnail ? (
            <AvatarImage src={props.plant.thumbnail} />
          ) : null}
        </Avatar>
        <div className="flex flex-col gap-3">
          <CardTitle>{props.plant.name}</CardTitle>
          <div className="flex flex-row gap-2"></div>
        </div>
      </CardHeader>
    </Card>
  );
};
