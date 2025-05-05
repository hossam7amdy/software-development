import { createLazyBuffer } from './lazy-buffer.ts'

const buf = createLazyBuffer(10)

// whitelisted props
console.log(buf.length)
console.log(buf.byteLength)
console.log(buf instanceof Buffer)

buf.write('Hi') // Writes 'Hi' at position 0 (utf8 encoding).

console.log(buf.toString('utf8')) // 'Hi' (remaining bytes are zeros).

console.log(buf.toJSON()) // { type: 'Buffer', data: [ 72, 105, 0, 0, 0 ] }

console.log(buf.toString('base64')) // 'SGkAAAA='

console.log(buf[0]) // 72 (ASCII code for 'H').

console.log(buf.at(1)) // 105 (ASCII code for 'i').
