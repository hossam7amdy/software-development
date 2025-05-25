import { strictEqual } from 'assert'
import { createLazyBuffer } from './lazy-buffer.js'

const size = 10
const buf = createLazyBuffer(size)

// whitelisted props
strictEqual(buf.length, size)
strictEqual(buf.byteLength, size)
strictEqual(buf.toString(), '')
strictEqual(buf instanceof Buffer, true)

buf.write('Hi') // Writes 'Hi' at position 0 (utf8 encoding).

// actual props
strictEqual(buf.length, size)
strictEqual(buf.byteLength, size)
strictEqual(buf instanceof Buffer, true)

console.log(buf.toString('utf8')) // 'Hi' (remaining bytes are zeros).

console.log(buf.toJSON()) // { type: 'Buffer', data: [ 72, 105, 0, 0, 0 ] }

console.log(buf.toString('base64')) // 'SGkAAAA='

console.log(buf[0]) // 72 (ASCII code for 'H').

console.log(buf.at(1)) // 105 (ASCII code for 'i').
