export interface IItemState {
  store(locationId: string): void
  deliver(address: string): void
  describe(): string
}
