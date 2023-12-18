import { getPlants } from "../../src/db/query/plant.query";
import { Planner } from "./planner";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home() {
  const plantsData = await getPlants();
  const plants = plantsData.data.map((plant) => ({
    value: plant.name,
    label: plant.name,
    image:
      plant.icon ||
      "https://carnetv2.s3.eu-west-3.amazonaws.com/public/icons/novegetable.png",
  }));
  return <Planner plants={plants} />;
}
