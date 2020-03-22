type InventoryItem = {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  HospitalInventory: {
    quantity: number
  }
}

type Tag = {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  HospitalTag: any
}

export type Hospital = {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  tags: Tag[]
  inventory: InventoryItem[]
  events: Array<{
    time: string
    type: string
    inventoryType: string
    userId: string
  }>
}
