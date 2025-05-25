import { ArrivingState } from './ArrivingState.js'
import type { IItemState } from './IItemState.js'

export class WarehouseItem {
  id: string
  state: IItemState

  constructor(id: string) {
    this.id = id
    this.state = new ArrivingState(this)
  }

  store(locationId: string): void {
    this.state.store(locationId)
  }

  deliver(address: string): void {
    this.state.deliver(address)
  }

  describe(): string {
    return this.state.describe()
  }
}
