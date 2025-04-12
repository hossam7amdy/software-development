import {
  Transform,
  type TransformCallback,
  type TransformOptions
} from 'stream'

type UserTransform = (
  data: unknown,
  push: (data: unknown) => void,
  callback: (err?: unknown) => void
) => void

export class ParallelStream extends Transform {
  running: number
  terminateCb: TransformCallback | null
  userTransform: UserTransform

  constructor(userTransform: UserTransform, options: TransformOptions = {}) {
    super({ objectMode: true, ...options })
    this.running = 0
    this.userTransform = userTransform
    this.terminateCb = null
  }

  _transform(
    chunk: any,
    _enc: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.running++
    this.userTransform(chunk, this.push.bind(this), this._onComplete.bind(this))
    callback()
  }

  _flush(callback: TransformCallback): void {
    if (this.running > 0) {
      this.terminateCb = callback
    } else {
      callback()
    }
  }

  _onComplete(err: unknown) {
    this.running--
    if (err) {
      return this.emit('error', err)
    }
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}
