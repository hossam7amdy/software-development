export interface IStrategy {
  write(level: string, message: string): void
}
