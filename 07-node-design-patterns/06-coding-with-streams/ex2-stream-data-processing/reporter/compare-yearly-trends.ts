import { PassThrough } from 'stream'

const groupByYear: Record<string, number> = {}

const compareYearlyTrends = new PassThrough({
  objectMode: true
})

compareYearlyTrends.on('data', obj => {
  const year = obj['year']
  const value = +obj['value']
  if (groupByYear[year]) {
    groupByYear[year] += value
  } else {
    groupByYear[year] = value
  }
})

compareYearlyTrends.on('end', () => {
  Object.entries(groupByYear).reduce(
    ([prevYear, prevValue], [curYear, curValue]) => {
      if (curValue > prevValue) {
        console.log(
          `The number of crimes go up from ${prevYear} to ${curYear} by ${(curValue - prevValue).toLocaleString()} crimes`
        )
      } else if (curValue < prevValue) {
        console.log(
          `The number of crimes go down from ${prevYear} to ${curYear} by ${(prevValue - curValue).toLocaleString()} crimes`
        )
      } else {
        console.log(
          `The number of crimes is same from ${prevValue} to ${curYear}`
        )
      }

      return [curYear, curValue]
    }
  )
})

export { compareYearlyTrends }
