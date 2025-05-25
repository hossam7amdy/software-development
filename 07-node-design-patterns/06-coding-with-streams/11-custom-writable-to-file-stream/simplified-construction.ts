import { Writable } from 'stream'
import type { Chunk } from './types.js'
import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

const tfs = new Writable({
  objectMode: true,
  write: (chunk: Chunk, _, cb) => {
    mkdir(dirname(chunk.path), { recursive: true })
      .then(() => writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb)
  }
})

tfs.write({ path: join('files', 'file1.txt'), content: 'Hello' })
tfs.write({ path: join('files', 'file2.txt'), content: 'Node.js' })
tfs.write({ path: join('files', 'file3.txt'), content: 'streams' })
tfs.end(() => console.log('All files created'))
