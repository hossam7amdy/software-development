import { createProfiler } from './profiler.js'

function getAllFactors(intNumber: number) {
  const profiler = createProfiler(`Finding all factors of ${intNumber}`)

  profiler.start()
  const factors: number[] = []
  for (let factor = 2; factor <= intNumber; factor++) {
    while (intNumber % factor === 0) {
      factors.push(factor)
      intNumber = intNumber / factor
    }
  }
  profiler.end()

  return factors
}

const myNumber = parseInt(process.argv[2])
const myFactors = getAllFactors(myNumber)
console.log(`Factors of ${myNumber} are: `, myFactors)
