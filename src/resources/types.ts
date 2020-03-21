export type Data = {
  id: number,
  name: string,
  description: string,
  inventory: { name: string; HospitalInventory: {
    quantity: number
  }; }[],
  events: { time: string; type: string; inventoryType: string; userId: string; }[]
}

export const defaultData = {
  id: 0,
  name: '',
  description: '',
  inventory: [],
  events: []
}