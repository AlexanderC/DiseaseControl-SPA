export type HospitalInventory = {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  HospitalId: number;
  InventoryId: number;
};

export type InventoryItem = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  HospitalInventory: HospitalInventory;
};

type SupervisorItem = {
  id: number;
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
  canManage: boolean;
  tags: Tag[];
  supervisors: SupervisorItem[];
  inventory: InventoryItem[];
};

export type TagColors = {
  [s: string]: string;
};
