export type Data = {
  id: number,
  name: string,
  description: string,
  inventory: Array<{
    id: number,
    name: string;
    HospitalInventory: {
      quantity: number
    };
  }>,
  events: Array<{
    time: string;
    type: string;
    inventoryType: string;
    userId: string;
  }>,
  tags: Tag[]
}

export type Tag = {
  id: number;
  name: string;
  description: string;
}

export const defaultData = {
  id: 0,
  name: '',
  description: '',
  inventory: [],
  events: [],
  tags: []
}