import { PropsWithChildren, Suspense } from "react";
import { PlantsNavigation } from "./PlantsNavigation";
import { PlantsNavigationSkeleton } from "./PlantsNavigationSkeleton";

export default function layout({
  children,
  params,
}: PropsWithChildren<{
  params: {
    categoryId: string;
  };
}>) {
  return (
    <div className="relative flex items-start gap-4 p-4">
      <Suspense fallback={<PlantsNavigationSkeleton />}>
        <PlantsNavigation categoryId={params.categoryId} />
      </Suspense>
      {children}
    </div>
  );
}
