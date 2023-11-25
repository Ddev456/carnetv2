import { getAuthSession } from "@/lib/auth";
import { getCategory } from "../category.query";
import PlantNavigationCard from "./PlantNavigationCard";

export type PlantsNavigationProps = {
  categoryId: string;
};

export const PlantsNavigation = async (props: PlantsNavigationProps) => {
  const session = await getAuthSession();
  const category = await getCategory({
    categoryId: props.categoryId,
    userId: session?.user.id,
  });

  if (!category) {
    return null;
  }

  return <PlantNavigationCard category={category} />;
};
