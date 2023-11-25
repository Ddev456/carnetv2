import { PlantSkeleton } from "./[plantId]/PlantSkeleton";
import { PlantsNavigationSkeleton } from "./PlantsNavigationSkeleton";

export default function PlantLoading() {
  return (
    <div className="flex items-start gap-4 p-4">
      <PlantsNavigationSkeleton />
      <PlantSkeleton />
    </div>
  );
}
