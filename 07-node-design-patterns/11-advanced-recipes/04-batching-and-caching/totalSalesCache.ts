import { totalSales as totalSalesRaw } from './totalSales.js'

const CACHE_TTL = 30 * 1000 // 30 seconds TTL
const cache = new Map<string, Promise<number>>()

export const totalSales = (product: string): Promise<number> => {
  if (cache.has(product)) {
    console.log('Cache hit')
    return cache.get(product)!
  }

  const resultPromise = totalSalesRaw(product)
  cache.set(product, resultPromise)
  resultPromise
    .then(() => {
      setTimeout(() => {
        cache.delete(product)
      }, CACHE_TTL)
    })
    .catch(err => {
      cache.delete(product)
      throw err
    })
  return resultPromise
}
