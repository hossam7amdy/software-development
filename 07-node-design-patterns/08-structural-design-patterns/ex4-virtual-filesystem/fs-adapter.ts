import { Level } from 'level'
import type {
  NoParamCallback,
  ObjectEncodingOptions,
  PathOrFileDescriptor
} from 'fs'

type FSAdapter = typeof import('fs')

export const createFSAdapter = (_db: Level): FSAdapter => {
  const store = new Map<string, Buffer>()

  const readFile = (
    path: PathOrFileDescriptor,
    options: ObjectEncodingOptions | undefined | null,
    callback: (err: Error | null, data?: string | Buffer) => void
  ): void => {
    if (typeof options === 'function') {
      callback = options
      options = null
    }

    const filename = path.toString()
    const file = store.get(filename)
    if (!file) {
      const err = new Error(`ENOENT, open "${filename}"`)
      err['code'] = 'ENOENT'
      err['errno'] = 34
      err['path'] = filename
      return callback(err)
    }
    callback(null, file)
  }

  const writeFile = (
    path: PathOrFileDescriptor,
    data: string | NodeJS.ArrayBufferView,
    callback: NoParamCallback
  ): void => {
    const buffer = Buffer.from(data.toString())
    store.set(path.toString(), buffer)
    callback(null)
  }

  return { readFile, writeFile } as FSAdapter
}

export const createFSAdapter2 = (db: Level): FSAdapter => {
  const store = new Map<string, Buffer>()

  const proxy = new Proxy(db, {
    get(_, property) {
      if (property === 'readFile') {
        return (
          path: PathOrFileDescriptor,
          options: ObjectEncodingOptions | undefined | null,
          callback: (err: Error | null, data?: string | Buffer) => void
        ): void => {
          if (typeof options === 'function') {
            callback = options
            options = null
          }

          const filename = path.toString()
          const file = store.get(filename)
          if (!file) {
            const err = new Error(`ENOENT, open "${filename}"`)
            err['code'] = 'ENOENT'
            err['errno'] = 34
            err['path'] = filename
            return callback(err)
          }

          callback(null, file)
        }
      } else if (property === 'writeFile') {
        return (
          path: PathOrFileDescriptor,
          data: string | NodeJS.ArrayBufferView,
          callback: NoParamCallback
        ): void => {
          const buffer = Buffer.from(data.toString())
          store.set(path.toString(), buffer)
          callback(null)
        }
      } else {
        throw new Error('Not implemented!')
      }
    }
  })

  return proxy as unknown as FSAdapter
}
