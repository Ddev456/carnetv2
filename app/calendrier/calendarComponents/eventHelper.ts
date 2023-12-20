import {
  GardenAction,
  GardenActions,
} from "../../../src/components/calendar/useFilter";

type EventCalendar = {
  title: string;
  eventDate: Date;
  description: string;
  colorCode: string;
  type: string;
};

interface EventData {
  groupedEvents: Record<string, EventCalendar[]>;
  flatEvents: EventCalendar[];
  totalEvents: number;
}

export function getEventDataForDay(
  day: Date,
  events: EventCalendar[]
): EventData {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    const comparisonDate = new Date(day);

    return (
      eventDate.getDate() === comparisonDate.getDate() &&
      eventDate.getMonth() === comparisonDate.getMonth() &&
      eventDate.getFullYear() === comparisonDate.getFullYear()
    );
  });

  const groupedEvents = filteredEvents.reduce(
    (groups: Record<string, EventCalendar[]>, event) => {
      // Formattez la date de l'événement en tant que clé
      const eventDate = event.eventDate;

      const key = `${eventDate.getFullYear()}-${
        eventDate.getMonth() + 1
      }-${eventDate.getDate()}`;

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
      return groups;
    },
    {}
  );
  const totalEvents = filteredEvents.length;

  const flatEvents = Object.values(groupedEvents).flat();

  return { groupedEvents, flatEvents, totalEvents };
}

export function filterEvents(
  events: EventCalendar[],
  searchValue: string,
  filters: GardenAction[]
): EventCalendar[] {
  return events.filter(
    (event) =>
      filters.some((filter) => filter.type === event.type) &&
      event.title.toLowerCase().includes(searchValue.toLowerCase())
  );
}
