// Générer un identifiant unique
function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Générer un nombre aléatoire entre 0 et 6
function generateRandomDay() {
  return Math.floor(Math.random() * 7);
}

// Générer un nombre aléatoire entre 48 et 52
function generateRandomNumber() {
  return Math.floor(Math.random() * (52 - 1 + 1)) + 1;
}

const names = [
  "Artichaut",
  "Asperge",
  "Aubergine",
  "Avocat",
  "Bette",
  "Betterave",
  "Blette",
  "Brocoli",
  "Carotte",
  "Céleri",
  "Champignon",
  "Chou",
  "Chou de Bruxelles",
  "Chou-fleur",
  "Chou-rave",
  "Concombre",
  "Courge",
  "Courgette",
  "Cresson",
  "Daikon",
  "Endive",
  "Épinard",
  "Fenouil",
  "Fève",
  "Gombo",
  "Haricot",
  "Igname",
  "Jicama",
  "Kale",
  "Laitue",
  "Lentille",
  "Mâche",
  "Maïs",
  "Navet",
  "Oignon",
  "Panais",
  "Patate douce",
  "Piment",
  "Pois",
  "Poireau",
  "Poivron",
  "Pomme de terre",
  "Potiron",
  "Radis",
  "Rhubarbe",
  "Rutabaga",
  "Salade",
  "Salsifis",
  "Tomate",
  "Topinambour",
  "Truffe",
  "Crosne",
  "Pak-choï",
  "Pourpier",
  "Chayote",
  "Tétragone",
  "Pâtisson",
  "Palmier",
  "Cerfeuil tubéreux",
  "Cœur de palmier",
  "Chou Romanesco",
  "Chou de Chine",
  "Chou frisé",
  "Chou de Milan",
];

// Générer un tableau de données
// const gData = Array.from({ length: names.length }, generateData);

// Générer le jeu de données de base pour le climat méditerranéen
const baseData = names.map((name) => {
  return {
    id: generateId(),
    name: name,
    type: "annuelle",
    nursery: [generateRandomNumber(), generateRandomNumber()],
    seedling: [generateRandomNumber(), generateRandomNumber()],
    plantation: [generateRandomNumber(), generateRandomNumber()],
    flowering: [generateRandomNumber(), generateRandomNumber()],
    harvest: [generateRandomNumber(), generateRandomNumber()],
    dayOfWeek: generateRandomDay(),
  };
});

type Plant = {
  id: string;
  name: string;
  type: string;
  nursery: number[];
  seedling: number[];
  plantation: number[];
  flowering: number[];
  harvest: number[];
};

type EventCalendar = {
  title: string;
  eventDate: Date;
  description: string;
  colorCode: string;
  type: string;
};

const transformPlantToEventCalendar = (plant: Plant): EventCalendar[] => {
  const events: EventCalendar[] = [];
  let globalIndex = 0;

  const addEvents = (
    week: number,
    title: string,
    description: string,
    colorCode: string,
    type: string
  ) => {
    events.push({
      title,
      eventDate: new Date(2023, 0, week * 7 + (globalIndex % 7)),
      description,
      colorCode,
      type,
    });
    globalIndex++;
  };

  plant.nursery.forEach((week) => {
    addEvents(
      week,
      `🪴 ${plant.name}`,
      `🪴 Semis sous abri de ${plant.name}`,
      "bg-[#BEE7F5]",
      "Semis sous abri"
    );
  });

  plant.seedling.forEach((week) => {
    addEvents(
      week,
      `🌱 ${plant.name}`,
      `🌱 Semis de ${plant.name}`,
      "bg-[#D3E7A6]",
      "Semis en pleine terre"
    );
  });

  plant.plantation.forEach((week) => {
    addEvents(
      week,
      `👨‍🌾 ${plant.name}`,
      `👨‍🌾 Plantation de ${plant.name}`,
      "bg-[#EBDACA]",
      "Plantation"
    );
  });

  plant.flowering.forEach((week) => {
    addEvents(
      week,
      `🌷 ${plant.name}`,
      `🌷 Floraison de ${plant.name}`,
      "bg-[#FFD19A]",
      "Floraison"
    );
  });

  plant.harvest.forEach((week) => {
    addEvents(
      week,
      `🌽${plant.name}`,
      `🌽 Récolte de ${plant.name}`,
      "bg-[#E1D9FF]",
      "Récolte"
    );
  });

  return events;
};

const baseCalendarEvents: EventCalendar[] = baseData
  .map(transformPlantToEventCalendar)
  .flat();

// Ajuster un tableau de nombres pour un climat
function adjustForClimate(date: Date, climate: string): Date {
  let adjustment = 0;
  switch (climate) {
    case "Méditérannéen":
      adjustment = -7; // ajuster d'une semaine en arrière
      break;
    case "Océanique":
      adjustment = 0; // pas d'ajustement
      break;
    case "Tempéré":
      adjustment = 7; // ajuster d'une semaine en avant
      break;
    case "Continental":
      adjustment = 14; // ajuster de deux semaines en avant
      break;
    case "Montagnard":
      adjustment = 21; // ajuster de trois semaines en avant
      break;
    default:
      adjustment = 0; // pas d'ajustement
  }

  const adjustedDate = new Date(date);
  adjustedDate.setDate(date.getDate() + adjustment);
  return adjustedDate;
}

// Créer une fonction qui ajuste les événements de calendrier pour un climat spécifique
function adjustCalendarEventsForClimate(
  events: EventCalendar[],
  climate: string
): EventCalendar[] {
  return events.map((event) => {
    const eventDate = event.eventDate;
    const adjustedEventDate = adjustForClimate(eventDate, climate);

    return {
      ...event,
      eventDate: adjustedEventDate,
    };
  });
}

type Climate =
  | "Méditérannéen"
  | "Océanique"
  | "Tempéré"
  | "Continental"
  | "Montagnard";
const climates: Climate[] = [
  "Méditérannéen",
  "Océanique",
  "Tempéré",
  "Continental",
  "Montagnard",
];

type ClimateData = {
  Méditérannéen: EventCalendar[];
  Océanique: EventCalendar[];
  Tempéré: EventCalendar[];
  Continental: EventCalendar[];
  Montagnard: EventCalendar[];
};

const climateCalendarEvents: ClimateData = {
  Méditérannéen: [],
  Océanique: [],
  Tempéré: [],
  Continental: [],
  Montagnard: [],
};

for (const climate of climates) {
  climateCalendarEvents[climate] = adjustCalendarEventsForClimate(
    baseCalendarEvents,
    climate
  );
}

// const climateCalendarEvents = climates.map((climate) => {
//   return {
//     climate,
//     events: adjustCalendarEventsForClimate(baseCalendarEvents, climate),
//   };
// });

export const climateData = climateCalendarEvents;
