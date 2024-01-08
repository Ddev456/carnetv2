import {
  GardenAction,
  GardenActions,
} from "../../../src/components/calendar/useFilter";

type EventCalendar = {
  title: string;
  icon: string;
  eventDate: Date;
  description: string;
  type: string;
};

interface EventData {
  groupedEvents: Record<string, EventCalendar[]>;
  flatEvents: EventCalendar[];
  totalEvents: number;
}

// export function getEventDataForDay(
//   day: Date,
//   events: EventCalendar[]
// ): EventData {
//   const comparisonDate = new Date(
//     Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())
//   );

//   const filteredEvents = events.filter((event) => {
//     const eventDate = new Date(event.eventDate);
//     const utcEventDate = new Date(
//       Date.UTC(
//         eventDate.getFullYear(),
//         eventDate.getMonth(),
//         eventDate.getDate()
//       )
//     );

//     return (
//       utcEventDate.getUTCDate() === comparisonDate.getUTCDate() &&
//       utcEventDate.getUTCMonth() === comparisonDate.getUTCMonth() &&
//       utcEventDate.getUTCFullYear() === comparisonDate.getUTCFullYear()
//     );
//   });

//   const groupedEvents = filteredEvents.reduce(
//     (groups: Record<string, EventCalendar[]>, event) => {
//       // Formattez la date de l'événement en tant que clé
//       const eventDate = new Date(event.eventDate);
//       const utcEventDate = new Date(
//         Date.UTC(
//           eventDate.getFullYear(),
//           eventDate.getMonth(),
//           eventDate.getDate()
//         )
//       );

//       const key = `${utcEventDate.getUTCFullYear()}-${
//         utcEventDate.getUTCMonth() + 1
//       }-${utcEventDate.getUTCDate()}`;

//       if (!groups[key]) {
//         groups[key] = [];
//       }
//       groups[key].push(event);
//       return groups;
//     },
//     {}
//   );
//   const totalEvents = filteredEvents.length;

//   const flatEvents = Object.values(groupedEvents).flat();

//   return { groupedEvents, flatEvents, totalEvents };
// }

import { isSameDay } from "date-fns";

export function getEventDataForDay(
  day: Date,
  events: EventCalendar[]
): EventCalendar[] {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return isSameDay(eventDate, day);
  });

  return filteredEvents;
}

export function filterEvents(
  events: EventCalendar[],
  searchValue: string,
  filters: GardenAction[]
): EventCalendar[] {
  return events.filter(
    (event) =>
      filters.some((filter) => filter.status && filter.type === event.type) &&
      event.title.toLowerCase().includes(searchValue.toLowerCase())
  );
}
