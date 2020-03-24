type InventoryItem = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  HospitalInventory: {
    id: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type Tag = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  HospitalTag: any;
};

export type Hospital = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  inventory: InventoryItem[];
};

export type TagColors = {
  [s: string]: string;
};
