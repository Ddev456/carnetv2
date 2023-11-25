import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlantItemPlaceholder } from "./PlantItemPlaceholder";

export const PlantsNavigationSkeleton = () => {
  return (
    <Card className="max-w-xs flex-1">
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <PlantItemPlaceholder key={i} />
        ))}
      </CardContent>
    </Card>
  );
};
