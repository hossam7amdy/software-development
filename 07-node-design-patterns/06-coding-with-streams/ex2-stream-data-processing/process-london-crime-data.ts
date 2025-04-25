import { createReadStream } from 'fs'
import { createInterface } from 'readline'

import type { ProcessLondonCrimeData } from './types.js'

const crimesByYear = {}
const crimesByArea = {}
const crimeTypesByArea = {}
const totalCrimesByType = {}

const processLondonCrimeData: ProcessLondonCrimeData = filePath => {
  return new Promise((resolve, reject) => {
    // Create read stream and interface for line-by-line processing
    const fileStream = createReadStream(filePath)
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    let isFirstLine = true
    let headers: string[] = []

    rl.on('line', line => {
      if (isFirstLine) {
        headers = line.split(',')
        isFirstLine = false
        return
      }

      // Parse CSV line (handling potential commas in quoted values)
      const values = parseCSVLine(line)

      const area = values[headers.indexOf('borough')] // 'borough' as area column
      const year = values[headers.indexOf('year')]
      const crimeType = values[headers.indexOf('major_category')] // 'major_category' as the crime type
      const count = parseInt(values[headers.indexOf('value')]) // 'value' as the count

      if (!isNaN(count)) {
        crimesByYear[year] = (crimesByYear[year] || 0) + count

        crimesByArea[area] = (crimesByArea[area] || 0) + count

        if (!crimeTypesByArea[area]) {
          crimeTypesByArea[area] = {}
        }
        crimeTypesByArea[area][crimeType] =
          (crimeTypesByArea[area][crimeType] || 0) + count

        totalCrimesByType[crimeType] =
          (totalCrimesByType[crimeType] || 0) + count
      }
    })

    rl.on('close', () => {
      resolve({
        crimesByYear,
        crimesByArea,
        crimeTypesByArea,
        totalCrimesByType
      })
    })

    fileStream.on('error', err => {
      reject(err)
    })
  })
}

function parseCSVLine(line: string) {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current) // Push the last field
  return result
}

export { processLondonCrimeData }
