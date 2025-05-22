import { totalSales as totalSalesRaw } from './totalSales.ts'

type Callback = (err: Error | null, result: number) => void

const runningRequests = new Map<string, Callback[]>()

export const totalSales = (product: string, cb: Callback) => {
  if (runningRequests.has(product)) {
    console.log('Batching')
    const waitingList = runningRequests.get(product)!
    waitingList.push(cb)
    return
  }

  const newWaitingList = [cb]
  runningRequests.set(product, newWaitingList)

  totalSalesRaw(product, (err, result) => {
    const waitingCallbacks = runningRequests.get(product)!
    runningRequests.delete(product)
    waitingCallbacks.forEach(cb => cb(err, result))
  })
}
