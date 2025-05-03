import util from 'util'
import { Level } from 'level'
import { resolve } from 'path'

type FSAdapter = Pick<typeof import('fs'), 'readFile' | 'writeFile'>

export const createFSAdapter = (db: Level): FSAdapter => {
  const readFile = (filename: string, options?: any, callback?: Function) => {
    if (typeof options === 'function') {
      callback = options
      options = {}
    } else if (typeof options === 'string') {
      options = { encoding: options }
    }

    db.get(
      resolve(filename),
      { valueEncoding: options.encoding },
      (err, data) => {
        if (err) {
          if (err['code'] === 'LEVEL_NOT_FOUND') {
            err = new Error(`ENOENT, open "${filename}"`)
            err['code'] = 'ENOENT'
            err['errno'] = 34
            err['filename'] = filename
          }
          return callback && callback(err)
        }
        callback && callback(null, data)
      }
    )
  }
  const writeFile = (
    filename: string,
    data: any,
    options?: any,
    callback?: any
  ) => {
    if (typeof options === 'function') {
      callback = options
      options = {}
    } else if (typeof options === 'string') {
      options = { encoding: options }
    }

    db.put(
      resolve(filename),
      data,
      { valueEncoding: options.encoding },
      callback
    )
  }

  // @ts-expect-error Property '__promisify__' is missing
  return { readFile, writeFile }
}

export const createFSAdapter2 = (db: Level): FSAdapter => {
  const getCallbackified = util.callbackify(db.get)
  const putCallbackified = util.callbackify(db.put)

  return {
    readFile: getCallbackified.bind(db),
    writeFile: putCallbackified.bind(db)
  }
}
