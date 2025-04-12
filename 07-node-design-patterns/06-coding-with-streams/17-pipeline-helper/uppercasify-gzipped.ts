import { createUnzip } from 'zlib'
import { pipeline, Transform, type TransformCallback } from 'stream'

const toUpperCase = new Transform({
  transform(
    chunk: any,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

pipeline(process.stdin, createUnzip(), toUpperCase, process.stdout, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
