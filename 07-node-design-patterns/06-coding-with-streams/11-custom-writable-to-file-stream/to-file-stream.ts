import { writeFile, mkdir } from 'fs/promises'
import { dirname } from 'path'
import { Writable, type WritableOptions } from 'stream'
import type { Chunk } from './types.js'

export class ToFileStream extends Writable {
  constructor(options?: WritableOptions) {
    super({ ...options, objectMode: true })
  }

  _write(chunk: Chunk, _, cb: (error?: Error | null) => void) {
    mkdir(dirname(chunk.path), { recursive: true })
      .then(() => writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb)
  }
}
