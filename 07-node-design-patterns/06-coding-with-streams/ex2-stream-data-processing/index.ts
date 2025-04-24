import { createReadStream } from 'fs'

import { Parser } from './parser'
import {
  compareYearlyTrends,
  getMostDangerousAreas,
  getTopCrimeByArea,
  getLeastFrequentCrimeType
} from './reporter'

const filename = process.argv[2]
const reader = createReadStream(filename)
const parser = new Parser({ highWaterMark: 1024 })

const source = reader.pipe(parser)

// 1) Did the number of crimes go up or down over the years?
source.pipe(compareYearlyTrends)

// 2) What are the most dangerous areas of London?
source.pipe(getMostDangerousAreas)

// 3) What is the most common crime per area?
source.pipe(getTopCrimeByArea)

// 4) What is the least common crime?
source.pipe(getLeastFrequentCrimeType)
