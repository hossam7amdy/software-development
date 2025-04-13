import {
  Transform,
  type TransformCallback,
  type TransformOptions
} from 'stream'

type TransformFn = (chunk: any, callback: TransformCallback) => void

export class ParallelTransform extends Transform {
  queue: Array<{ chunk: any; callback: TransformCallback }>
  running: number
  maxParallel: number
  transformFn: TransformFn

  constructor(
    maxParallel: number,
    transformFn: TransformFn,
    options?: TransformOptions
  ) {
    super({ ...options, objectMode: true })
    this.maxParallel = maxParallel
    this.transformFn = transformFn
    this.running = 0
    this.queue = []
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.queue.push({ chunk, callback })
    this._next()
  }

  _next() {
    while (this.running < this.maxParallel && this.queue.length) {
      const { chunk, callback } = this.queue.shift()!
      this.running++
      this.transformFn(chunk, (err, data) => {
        this.running--
        if (err) {
          this.emit('error', err)
        } else if (data) {
          this.push(data)
        }
        callback()
        this._next()
      })
    }
  }
}
