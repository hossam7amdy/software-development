export class CancelError extends Error {
  isCanceled: boolean
  constructor() {
    super('Canceled')
    this.isCanceled = true
  }
}
