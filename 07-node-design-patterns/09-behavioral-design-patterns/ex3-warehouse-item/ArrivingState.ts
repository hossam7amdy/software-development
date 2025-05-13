import type { IItemState } from './IItemState.ts'
import { StoredState } from './StoredState.ts'
import { WarehouseItem } from './WarehouseItem.ts'

export class ArrivingState implements IItemState {
  constructor(readonly item: WarehouseItem) {}

  store(locationId: string): void {
    this.item.state = new StoredState(this.item, locationId)
  }
  deliver(_address: string): void {
    throw new Error('Cannot deliver non existing item.')
  }
  describe(): string {
    return `Item ${this.item.id} is on its way to the warehouse.`
  }
}
