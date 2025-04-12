import { createReadStream, createWriteStream } from 'fs'
import Stream, { Readable, Transform, type TransformCallback } from 'stream'

export const concatFiles = (dest: string, files: string[]): Promise<void> => {
  return new Promise((resolve, rejects) => {
    const destStream = createWriteStream(dest)
    Readable.from(files)
      .pipe(
        new Transform({
          objectMode: true,
          transform: (
            filename: string,
            _enc: BufferEncoding,
            done: TransformCallback
          ) => {
            const src = createReadStream(filename)
            src.pipe(destStream, { end: false })
            src.on('error', done)
            src.on('end', done)
          }
        })
      )
      .on('error', rejects)
      .on('finish', () => {
        destStream.end()
        resolve()
      })
  })
}
