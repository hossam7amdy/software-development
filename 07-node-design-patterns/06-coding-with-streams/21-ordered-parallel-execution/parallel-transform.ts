import {
  Transform,
  type TransformOptions,
  type TransformCallback
} from 'stream'

type OnTransform = (
  chunk: any,
  push: typeof Transform.prototype.push,
  done: TransformCallback
) => void

export class ParallelTransform extends Transform {
  running: number
  terminateCb: TransformCallback | null
  continueCb: TransformCallback | null
  readonly concurrent: number
  readonly onTransform: OnTransform
  order: number
  queue: Array<{ order: number; chunk: any; done?: boolean }>

  constructor(
    concurrent: number,
    onTransform: OnTransform,
    options?: TransformOptions
  ) {
    super({ objectMode: true, ...options })
    this.onTransform = onTransform
    this.running = 0
    this.terminateCb = null
    this.concurrent = concurrent
    this.continueCb = null
    this.order = 0
    this.queue = []
  }

  async _transform(
    chunk: any,
    _encoding: BufferEncoding,
    done: TransformCallback
  ): Promise<void> {
    this.running++

    const curOrder = this.order
    this.queue.push({ order: this.order++, chunk })

    this.onTransform(
      chunk,
      chunk => {
        this._onPush(curOrder, chunk)
        return true
      },
      this._onComplete.bind(this)
    )

    if (this.running < this.concurrent) {
      done()
    } else {
      this.continueCb = done
    }
  }

  _flush(done: TransformCallback): void {
    this._drainQueue()
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
    this._drainQueue()
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }

  _onContinue() {
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
  }

  _onPush(order: number, chunk: any) {
    this.queue.forEach(d => {
      if (d.order === order) {
        d.done = true
        d.chunk = chunk
      }
    })
  }

  _drainQueue() {
    let top = this.queue.at(0)
    while (top && (top.done || !top.chunk)) {
      if (!this._isEmpty(top.chunk)) {
        super.push(top.chunk)
      }
      this.queue.shift()
      top = this.queue.at(0)
    }
  }

  _isEmpty(data: any) {
    return data === undefined || data === null || data.toString().trim() === ''
  }
}
