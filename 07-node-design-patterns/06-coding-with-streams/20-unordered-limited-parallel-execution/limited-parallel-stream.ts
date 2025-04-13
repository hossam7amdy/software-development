import {
  Transform,
  type TransformOptions,
  type TransformCallback
} from 'stream'

type UserTransform = (
  chunk: any,
  push: typeof Transform.prototype.push,
  done: TransformCallback
) => void

export class LimitedParallelStream extends Transform {
  running: number
  terminateCb: TransformCallback | null
  continueCb: TransformCallback | null
  readonly concurrent: number
  readonly userTransform: UserTransform

  constructor(
    concurrent: number,
    userTransform: UserTransform,
    options?: TransformOptions
  ) {
    super({ objectMode: true, ...options })
    this.userTransform = userTransform
    this.running = 0
    this.terminateCb = null
    this.concurrent = concurrent
    this.continueCb = null
  }

  async _transform(
    chunk: any,
    _encoding: BufferEncoding,
    done: TransformCallback
  ): Promise<void> {
    this.running++
    this.userTransform(chunk, this.push.bind(this), this._onComplete.bind(this))

    if (this.running < this.concurrent) {
      done()
    } else {
      this.continueCb = done
    }
  }

  _flush(done: TransformCallback): void {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete(err: any) {
    this.running--
    if (err) {
      this.emit('error', err)
    }
    this._onContinue()
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }

  _onContinue() {
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
  }
}
