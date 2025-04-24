import { PassThrough } from 'stream'

const groupByArea: Map<string, number> = new Map()

const getMostDangerousAreas = new PassThrough({
  objectMode: true
})

getMostDangerousAreas.on('data', obj => {
  const area = obj['borough'] as string
  const value = +obj['value']
  if (groupByArea.has(area)) {
    const prevVal = groupByArea.get(area) || 0
    groupByArea.set(area, prevVal + value)
  } else {
    groupByArea.set(area, value)
  }
})

getMostDangerousAreas.on('end', () => {
  const sortedCrimesByArea = Array.from(groupByArea).sort(
    ([, count1], [, count2]) => (count1 < count2 ? 1 : -1)
  )
  for (let index = 0; index < 3; index++) {
    const [area, count] = sortedCrimesByArea[index]
    console.log(`Rank #${index + 1} is ${area} with ${count} crimes.`)
  }
})

export { getMostDangerousAreas }
