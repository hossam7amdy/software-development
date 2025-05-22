import { callbackify } from 'util'
import { salesDb } from './db'

const totalSalesAsync = async (product: string): Promise<number> => {
  let sum = 0
  const now = Date.now()
  for await (const [_, transaction] of salesDb.iterator()) {
    if (!product || transaction.product === product) {
      sum += transaction.amount
    }
  }
  console.log(`totalSales() took: ${Date.now() - now}ms`)
  return sum
}

export const totalSales = callbackify(totalSalesAsync)
