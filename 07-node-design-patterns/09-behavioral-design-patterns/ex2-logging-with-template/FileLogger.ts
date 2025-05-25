import { createWriteStream, mkdirSync, WriteStream } from 'fs'
import type { PathLike } from 'fs'
import { join } from 'path'

import { Logger } from './Logger.js'

const createWriteStreamLazy = (path: string) => {
  let stream: WriteStream | null = null
  const noop = () => {}

  const handler: ProxyHandler<WriteStream> = {
    get(_, prop) {
      if (prop === 'write' && stream === null) {
        stream = createWriteStream(path, {
          flags: 'a' // append mode
        })
      }
      return stream ? stream[prop].bind(stream) : noop
    }
  }

  return new Proxy(Object.create(WriteStream.prototype), handler)
}

const streamMap = (path: string) => ({
  error: createWriteStreamLazy(join(path, 'error.log')),
  warn: createWriteStreamLazy(join(path, 'warn.log')),
  info: createWriteStreamLazy(join(path, 'info.log')),
  debug: createWriteStreamLazy(join(path, 'debug.log'))
})

export class FileLogger extends Logger {
  private streams: Record<string, WriteStream>

  constructor(filePath: PathLike) {
    super()
    mkdirSync(filePath, { recursive: true })
    this.streams = streamMap(filePath.toString())

    process.once('beforeExit', () => this._close())
  }

  private _write(level: string, message: string) {
    this.streams[level].write(message, err => {
      if (err) this.emit('error', err)
    })
  }

  private _close() {
    for (const stream in this.streams) {
      this.streams[stream].close(err => {
        if (err) this.emit('error', err)
      })
    }
  }

  debug(...messages: unknown[]): void {
    const level = 'debug'
    const formattedMessage = this._format(level, ...messages)
    this._write(level, formattedMessage)
  }

  info(...messages: unknown[]): void {
    const level = 'info'
    const formattedMessage = this._format(level, ...messages)
    this._write(level, formattedMessage)
  }

  warn(...messages: unknown[]): void {
    const level = 'warn'
    const formattedMessage = this._format(level, ...messages)
    this._write(level, formattedMessage)
  }

  error(...messages: unknown[]): void {
    const level = 'error'
    const formattedMessage = this._format(level, ...messages)
    this._write(level, formattedMessage)
  }
}
