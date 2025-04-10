import { Transform, type TransformCallback } from 'stream'

const searchStr = 'World'
const replaceStr = 'Nodejs'
let tail = ''

const replaceStream = new Transform({
  defaultEncoding: 'utf8',

  transform(chunk: string, _: BufferEncoding, cb: TransformCallback) {
    const pieces = (tail + chunk).split(searchStr)
    const lastPieces = pieces[pieces.length - 1]
    const tailLen = searchStr.length - 1
    tail = lastPieces.slice(-tailLen)
    pieces[pieces.length - 1] = lastPieces.slice(0, -tailLen)
    this.push(pieces.join(replaceStr))
    cb()
  },

  flush(cb) {
    this.push(tail)
    cb()
  }
})

replaceStream.on('data', chunk => console.log(chunk.toString()))

replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end()
