import { CalendarResponsive } from "./calendarComponents/CalendarResponsive";
import { CalendarWeek } from "./calendarComponents/CalendarWeek";
import { climateData } from "./calendarComponents/data";

type EventCalendar = {
  title: string;
  eventDate: Date;
  description: string;
  colorCode: string;
  type: string;
};

type DataPlants = {
  data: EventCalendar[];
};

type ClimateData = {
  [climate: string]: EventCalendar[];
};

export default function Home() {
  return <CalendarResponsive climateData={climateData} />;
}
