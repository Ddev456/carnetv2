import { Calendar } from "../../src/components/calendar/Calendar";
import { getPlants } from "../../src/db/query/plant.query";
import { getUserPreferences } from "../../src/db/query/user.query";
import { getAuthSession } from "../../src/lib/auth";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function CalendarPage() {
  const plants = await getPlants();
  const user = await getAuthSession();
  const userId = user?.user?.id;
  const userPreferences = await getUserPreferences(userId);

  return <Calendar plants={plants.data} userPreferences={userPreferences} />;
}
