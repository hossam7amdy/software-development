import { Buffer } from 'buffer'

const MODIFIER_NAMES = ['write', 'swap', 'fill']

type Executor = (executor: Buffer) => void

export class ImmutableBuffer {
  constructor(size: number, executor: Executor) {
    const buffer = Buffer.alloc(size)
    const modifiers: Buffer = {} as Buffer

    for (const prop in buffer) {
      if (typeof buffer[prop] !== 'function') {
        continue
      }

      if (MODIFIER_NAMES.some(m => prop.startsWith(m))) {
        modifiers[prop] = (buffer[prop] as Buffer['write']).bind(buffer)
      } else {
        this[prop] = (buffer[prop] as Buffer['readInt8']).bind(buffer)
      }
    }

    executor(modifiers)
  }
}

export interface ImmutableBuffer extends Buffer {}
