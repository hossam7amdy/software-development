import { createUnzip } from 'zlib'
import { pipeline, Transform, type TransformCallback } from 'stream'
import { promisify } from 'util'

const pipelinePromise = promisify(pipeline)

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

async function main() {
  try {
    await pipelinePromise(
      process.stdin,
      createUnzip(),
      toUpperCase,
      process.stdout
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
