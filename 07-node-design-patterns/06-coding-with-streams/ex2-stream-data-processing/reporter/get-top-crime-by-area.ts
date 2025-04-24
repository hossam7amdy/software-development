import { PassThrough } from 'stream'

type Area = string & {
  __tag: 'Area'
}
type Crime = string & {
  __tag: 'Crime'
}

const crimesByArea: Map<Area, Map<Crime, number>> = new Map()

const getTopCrimeByArea = new PassThrough({
  objectMode: true
})

getTopCrimeByArea.on('data', obj => {
  const area = obj['borough'] as Area
  const crime = obj['major_category'] as Crime
  const value = +obj['value']

  if (crimesByArea.has(area)) {
    const prevVal = crimesByArea.get(area)?.get(crime) || 0
    crimesByArea.get(area)?.set(crime, value + prevVal)
  } else {
    crimesByArea.set(area, new Map().set(crime, value))
  }
})

getTopCrimeByArea.on('end', () => {
  let index = 1
  for (const [area, dataMap] of crimesByArea) {
    let topCrime = ''
    let maxCount = 0

    for (const [crime, count] of dataMap) {
      if (count > maxCount) {
        topCrime = crime
        maxCount = count
      }
    }

    console.log(
      `${index++}. Area ${area} has top crime ${topCrime} of ${maxCount.toLocaleString()} times.`
    )
  }
})

export { getTopCrimeByArea }
