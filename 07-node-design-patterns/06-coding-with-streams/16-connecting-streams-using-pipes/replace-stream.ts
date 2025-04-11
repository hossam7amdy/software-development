import {
  Transform,
  type TransformCallback,
  type TransformOptions
} from 'stream'

export class ReplaceStream extends Transform {
  #searchStr: string
  #replaceStr: string
  #tail: string

  constructor(
    searchStr: string,
    replaceStr: string,
    options?: TransformOptions
  ) {
    super(options)
    this.#searchStr = searchStr
    this.#replaceStr = replaceStr
    this.#tail = ''
  }

  _transform(
    chunk: string,
    _encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const pieces = (this.#tail + chunk).split(this.#searchStr)
    const lastPieces = pieces[pieces.length - 1]
    const tailLen = this.#searchStr.length - 1
    this.#tail = lastPieces.slice(-tailLen)
    pieces[pieces.length - 1] = lastPieces.slice(0, -tailLen)
    this.push(pieces.join(this.#replaceStr))
    callback()
  }

  _flush(callback: TransformCallback): void {
    this.push(this.#tail)
    callback()
  }
}
