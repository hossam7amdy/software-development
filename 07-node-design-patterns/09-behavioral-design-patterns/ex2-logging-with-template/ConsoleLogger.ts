import { stdout } from 'process'
import { styleText } from 'util'

import { Logger } from './Logger.ts'

export class ConsoleLogger extends Logger {
  private _write(message: string) {
    return stdout.write(message, err => {
      if (err) this.emit('error', err)
    })
  }

  debug(...messages: unknown[]): void {
    const formattedMessage = this._format('debug', ...messages)
    const coloredMessage = styleText('magenta', formattedMessage)
    this._write(coloredMessage)
  }

  info(...messages: unknown[]): void {
    const formattedMessage = this._format('info', ...messages)
    const coloredMessage = styleText('blue', formattedMessage)
    this._write(coloredMessage)
  }

  warn(...messages: unknown[]): void {
    const formattedMessage = this._format('warn', ...messages)
    const coloredMessage = styleText('yellow', formattedMessage)
    this._write(coloredMessage)
  }

  error(...messages: unknown[]): void {
    const formattedMessage = this._format('error', ...messages)
    const coloredMessage = styleText('red', formattedMessage)
    this._write(coloredMessage)
  }
}
