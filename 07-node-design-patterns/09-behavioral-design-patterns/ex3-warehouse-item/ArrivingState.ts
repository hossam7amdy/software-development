import type { IItemState } from './IItemState.js'
import { StoredState } from './StoredState.js'
import { WarehouseItem } from './WarehouseItem.js'

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
