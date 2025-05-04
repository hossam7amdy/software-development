import { setTimeout as wait } from 'timers/promises'

export function createInMemoryCache<K, V>(expiration: number = 3000) {
  const cache = new Map<K, V>()

  const set = (key: K, value: V) => {
    cache.set(key, value)
    wait(expiration).then(() => cache.delete(key))
  }

  return {
    set,
    get: cache.get.bind(cache)
  }
}
