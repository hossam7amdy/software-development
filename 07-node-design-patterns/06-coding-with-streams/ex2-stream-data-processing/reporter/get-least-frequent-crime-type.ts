import { PassThrough } from 'stream'

const crimeTypeByArea: Map<string, number> = new Map()

const getLeastFrequentCrimeType = new PassThrough({
  objectMode: true
})

getLeastFrequentCrimeType.on('data', obj => {
  const crime = obj['major_category']
  const value = +obj['value']

  if (crimeTypeByArea.has(crime)) {
    const prevVal = crimeTypeByArea.get(crime) || 0
    crimeTypeByArea.set(crime, value + prevVal)
  } else {
    crimeTypeByArea.set(crime, value)
  }
})

getLeastFrequentCrimeType.on('end', () => {
  let leastCrime = ''
  let leastCount = Number.MAX_SAFE_INTEGER
  for (const [crime, count] of crimeTypeByArea) {
    if (count < leastCount) {
      leastCount = count
      leastCrime = crime
    }
  }

  console.log(
    `Least common crime is ${leastCrime} with count of ${leastCount.toLocaleString()} times.`
  )
})

export { getLeastFrequentCrimeType }
