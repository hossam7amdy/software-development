import {
  Transform,
  type TransformCallback,
  type TransformOptions
} from 'stream'

type TransformFn = (chunk: any, callback: TransformCallback) => void

export class ParallelTransform extends Transform {
  running: number
  maxParallel: number
  transformFn: TransformFn
  continueCb: TransformCallback | null
  terminateCb: TransformCallback | null
  top: number
  bottom: number
  buffer: Map<number, any>

  constructor(
    maxParallel: number,
    transformFn: TransformFn,
    options?: TransformOptions & { ordered?: boolean }
  ) {
    super({ ...options, objectMode: true })
    this.maxParallel = maxParallel
    this.transformFn = transformFn
    this.running = 0
    this.continueCb = null
    this.terminateCb = null
    this.top = this.bottom = 0
    this.buffer = new Map()
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.running++
    const pos = this.top++

    this.transformFn(chunk, (err, data) => this._onComplete(pos, err, data))

    if (this.running < this.maxParallel) {
      callback()
    } else {
      this.continueCb = callback
    }
  }

  _flush(callback: TransformCallback): void {
    if (this.running > 0) {
      this.terminateCb = callback
    } else {
      callback()
    }
  }

  _onComplete(pos: number, err?: any, data?: any) {
    this.running--
    if (err) {
      this.emit('error', err)
    } else {
      this.buffer.set(pos, data)
    }

    this._continue()
    this._drain()

    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }

  _continue() {
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
  }

  _drain() {
    while (this.buffer.has(this.bottom)) {
      const data = this.buffer.get(this.bottom)
      this.push(data === undefined ? null : data)
      this.bottom++
    }
  }
}
