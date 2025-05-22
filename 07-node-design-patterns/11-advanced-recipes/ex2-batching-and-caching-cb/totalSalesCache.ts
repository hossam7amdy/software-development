import { totalSales as totalSalesRaw } from './totalSales.ts'

type Callback = (err: Error | null, result: number) => void

const TTL = 5000
const cache = new Map<string, { err: Error | null; result: number }>()

export const totalSales = (product: string, cb: Callback) => {
  if (cache.has(product)) {
    console.log('Cache hit')
    const { err, result } = cache.get(product)!
    setImmediate(() => cb(err, result))
    return
  }

  totalSalesRaw(product, (err, result) => {
    cache.set(product, { err, result })
    setImmediate(() => cb(err, result))
    setTimeout(() => cache.delete(product), TTL)
  })
}
