import { createWriteStream, mkdirSync } from 'fs'
import { WriteStream } from 'fs'
import type { PathLike } from 'fs'
import { join } from 'path'

import type { IStrategy } from './IStrategy.js'

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

export class FileStrategy implements IStrategy {
  private streams: Record<string, WriteStream>

  constructor(filePath: PathLike) {
    mkdirSync(filePath, { recursive: true })
    this.streams = streamMap(filePath.toString())

    process.once('beforeExit', () => this.close())
  }

  write(level: string, message: string) {
    this.streams[level].write(message, err => {
      if (err) throw err
    })
  }

  close() {
    for (const stream in this.streams) {
      this.streams[stream].close()
    }
  }
}
