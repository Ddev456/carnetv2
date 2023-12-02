export type PlantInfos = {
  id: string;
  name: string;
  categoryId: string;
  water: number;
  exposition: number;
  nursery: number[];
  seedling: number[];
  flowering: number[];
  plantation: number[];
  harvest: number[];
  eventFlowering: number | null;
  eventHarvest: number | null;
  eventPlantation: number | null;
  spaceBetween: number;
  spaceOnRow: number;
  type: string;
  categoryType: string;
};
