import {
  Transform,
  type TransformCallback,
  type TransformOptions
} from 'stream'
import type { Record } from './types.js'

export class FilterByCountry extends Transform {
  country: string

  constructor(country: string, options: TransformOptions = {}) {
    options.objectMode = true
    super(options)
    this.country = country
  }

  _transform(
    record: Record,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    if (record.country === this.country) {
      this.push(record, encoding)
    }
    callback()
  }

  _flush(callback: TransformCallback): void {
    callback()
  }
}
