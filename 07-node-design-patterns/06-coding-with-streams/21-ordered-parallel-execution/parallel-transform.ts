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

  constructor(
    maxParallel: number,
    transformFn: TransformFn,
    options?: TransformOptions
  ) {
    super({ ...options, objectMode: true })
    this.maxParallel = maxParallel
    this.transformFn = transformFn
    this.running = 0
    this.continueCb = null
    this.terminateCb = null
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.running++
    this.transformFn(chunk, this._onComplete.bind(this))

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

  _onComplete(err?: any, data?: any) {
    this.running--
    if (err) {
      this.emit('error', err)
    } else if (data !== undefined) {
      this.push(data)
    }

    this._continue()
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }

  _continue() {
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
  }
}
