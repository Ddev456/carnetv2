import { CalendarResponsive } from "./calendarComponents/CalendarResponsive";
import { type Plant, getPlants } from "@/db/query/plant.query";
import { dynamic } from "./calendarComponents/dynamicGen";
import temperatureAvg from "./calendarComponents/tempsByWeek.json";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home() {
  // Récupérer le département de l'utilisateur
  const userDept = "02";
  // jours de jardinage préférés par l'utilisateur
  // 0 = sowing 1 = planting 2 = coverSowing 3 = transplanting 4 = flowering 5 = harvesting

  // 0 = lundi 1 = mardi 2 = mercredi 3 = jeudi 4 = vendredi 5 = samedi 6 = dimanche
  const userGardeningDays = [1, 3, 5];
  // Filtrer le tableau pour éliminer les valeurs null
  const filteredTemperatureAvg = temperatureAvg.map((item) => {
    return {
      ...item,
      temps: item.temps.filter((temp) => temp !== null),
    };
  });

  // Récupérer les températures de l'utilisateur en fonction de son code dept
  const temps = filteredTemperatureAvg.find(
    (temp) => temp.deptCode === userDept
  );

  if (!temps) {
    throw new Error(
      `No temperature data found for department code ${userDept}`
    );
  }

  let userTemps = temps.temps;
  const plants = await getPlants();
  const dynamicData = dynamic(plants.data);

  return <CalendarResponsive dynamicData={dynamicData} />;
}
