import { totalSales as totalSalesRaw } from './totalSales.js'

const runningRequests = new Map<string, Promise<number>>()

export const totalSales = (product: string): Promise<number> => {
  if (runningRequests.has(product)) {
    console.log('Batching')
    return runningRequests.get(product)!
  }

  const resultPromise = totalSalesRaw(product)
  runningRequests.set(product, resultPromise)
  resultPromise.finally(() => {
    runningRequests.delete(product)
  })
  return resultPromise
}
