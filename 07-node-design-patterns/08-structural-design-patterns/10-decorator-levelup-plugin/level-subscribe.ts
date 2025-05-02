import { Level } from 'level'

export const levelSubscribeAugmentation = (db: Level) => {
  db['subscribe'] = (pattern: any, listener: Function) => {
    db.on('put', (key, value) => {
      const match = Object.keys(pattern).every(k => pattern[k] === value[k])
      if (match) {
        listener(key, value)
      }
    })
  }

  return db as Level & { subscribe: (pattern: any, handler: Function) => void }
}

export const levelSubscribeProxy = (db: Level) =>
  new Proxy(db, {
    get(targe, property) {
      if (property === 'subscribe') {
        return (pattern: any, listener: Function) => {
          db.on('put', (key, value) => {
            const match = Object.keys(pattern).every(
              k => pattern[k] === value[k]
            )
            if (match) {
              listener(key, value)
            }
          })
        }
      }
      return targe[property]
    }
  })
