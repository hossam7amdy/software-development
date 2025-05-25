import {
  Transform,
  type TransformCallback,
  type TransformOptions
} from 'stream'
import type { Record } from './types.js'

export class SumProfit extends Transform {
  total: number

  constructor(options: TransformOptions = {}) {
    options.objectMode = true
    super(options)
    this.total = 0
  }

  _transform(
    record: Record,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    this.total += parseFloat(record.profit)
    callback()
  }

  _flush(callback: TransformCallback): void {
    this.push(this.total.toString())
    callback()
  }
}
