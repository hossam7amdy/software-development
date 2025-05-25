import { EOL } from 'os'

import type { IStrategy } from './IStrategy.js'

export class Logger {
  constructor(private strategy: IStrategy) {}

  private _format(level: string, ...message: unknown[]) {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${level.toUpperCase()}] ${message.map(String).join(' ')}${EOL}`
  }

  private _write(level: string, message: string) {
    this.strategy.write(level, message)
  }

  debug(...message: unknown[]) {
    const level = 'debug'
    const formattedMessage = this._format(level, ...message)
    this._write(level, formattedMessage)
  }

  info(...message: unknown[]) {
    const level = 'info'
    const formattedMessage = this._format(level, ...message)
    this._write(level, formattedMessage)
  }

  warn(...message: unknown[]) {
    const level = 'warn'
    const formattedMessage = this._format(level, ...message)
    this._write(level, formattedMessage)
  }

  error(...message: unknown[]) {
    const level = 'error'
    const formattedMessage = this._format(level, ...message)
    this._write(level, formattedMessage)
  }
}
