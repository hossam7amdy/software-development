import { Buffer } from 'buffer'

export function createLazyBuffer(size: number): Buffer {
  let buf: Buffer | null = null
  const readWhitelist = new Set(['length', 'byteLength', 'toString'])

  const handler: ProxyHandler<Buffer> = {
    get(_, property) {
      const method = property.toString()
      // if it’s a write call, allocate first
      if (method.startsWith('write') && buf === null) {
        buf = Buffer.alloc(size)
      }
      // allow reads of whitelisted props before allocation
      if (buf === null && readWhitelist.has(method)) {
        return method === 'toString' ? () => '' : size
      }
      if (buf === null && !readWhitelist.has(method)) {
        throw new Error('Buffer not initialized. Call write* first.')
      }

      const fn = Reflect.get(buf!, property)
      return typeof fn === 'function' ? fn.bind(buf) : fn
    }
  }

  const dummy = Object.create(Buffer.prototype)
  return new Proxy(dummy, handler)
}
