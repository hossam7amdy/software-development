import type { FindLeastCommonCrime } from './types.js'

const findLeastCommonCrime: FindLeastCommonCrime = totalCrimesByType => {
  let minCount = Infinity
  let leastCommonType = ''

  for (const type in totalCrimesByType) {
    if (totalCrimesByType[type] < minCount) {
      minCount = totalCrimesByType[type]
      leastCommonType = type
    }
  }

  return { type: leastCommonType, count: minCount }
}

export { findLeastCommonCrime }
