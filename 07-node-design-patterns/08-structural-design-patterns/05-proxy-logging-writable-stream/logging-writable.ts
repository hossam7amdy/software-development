import type { TransformCallback, Writable } from 'stream'

export const createLoggingWritable = (writable: Writable) =>
  new Proxy(writable, {
    get(target, method) {
      if (method === 'write') {
        return (chunk, cb: TransformCallback) => {
          console.log('writing: ', chunk)
          return writable.write(chunk, cb)
        }
      }
      return target[method]
    }
  })
