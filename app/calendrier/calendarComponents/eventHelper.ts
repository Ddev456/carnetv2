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
  const filteredEvents = events.filter(
    (event) =>
      event.eventDate.getDate() === day.getDate() &&
      event.eventDate.getMonth() === day.getMonth() &&
      event.eventDate.getFullYear() === day.getFullYear()
  );

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

type Filters = {
  semisSousAbri: boolean;
  semisEnPleineTerre: boolean;
  plantation: boolean;
  floraison: boolean;
  recolte: boolean;
};

export function filterEvents(
  events: EventCalendar[],
  searchValue: string,
  filters: Record<string, boolean>
): EventCalendar[] {
  return events.filter(
    (event) =>
      filters[event.type] &&
      event.title.toLowerCase().includes(searchValue.toLowerCase())
  );
}
