import EventEmitter from 'events'
import { EOL } from 'os'

export abstract class Logger extends EventEmitter {
  protected _format(level: string, ...messages: unknown[]): string {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${level.toUpperCase()}] ${messages.map(String).join(' ')}${EOL}`
  }

  abstract debug(...messages: unknown[]): void

  abstract info(...messages: unknown[]): void

  abstract warn(...messages: unknown[]): void

  abstract error(...messages: unknown[]): void
}
