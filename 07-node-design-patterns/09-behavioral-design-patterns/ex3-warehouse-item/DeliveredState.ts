import type { IItemState } from './IItemState.ts'
import { WarehouseItem } from './WarehouseItem.ts'

export class DeliveredState implements IItemState {
  constructor(
    readonly item: WarehouseItem,
    readonly address: string
  ) {}

  store(_locationId: string): void {
    throw new Error('Item cannot be moved back to stored.')
  }
  deliver(_address: string): void {
    throw new Error(
      `Cannot store item ${this.item.id} because it's already delivered.`
    )
  }
  describe(): string {
    return `Item ${this.item.id} was delivered to John Smith, ${this.address}.`
  }
}
