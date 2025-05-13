import type { IItemState } from './IItemState.ts'
import { DeliveredState } from './DeliveredState.ts'
import { WarehouseItem } from './WarehouseItem.ts'

export class StoredState implements IItemState {
  constructor(
    readonly item: WarehouseItem,
    readonly locationId: string
  ) {}

  store(_locationId: string): void {
    throw new Error(
      `Cannot store item ${this.item.id} because it's already stored.`
    )
  }
  deliver(address: string): void {
    this.item.state = new DeliveredState(this.item, address)
  }
  describe(): string {
    return `Item ${this.item.id} is stored in location ${this.locationId}.`
  }
}
