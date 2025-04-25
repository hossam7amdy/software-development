import type { FindMostCommonCrimePerArea } from './types.js'

const findMostCommonCrimePerArea: FindMostCommonCrimePerArea =
  crimeTypesByArea => {
    const result = {}

    for (const area in crimeTypesByArea) {
      const crimeTypes = crimeTypesByArea[area]
      let maxCount = 0
      let mostCommonType = ''

      for (const type in crimeTypes) {
        if (crimeTypes[type] > maxCount) {
          maxCount = crimeTypes[type]
          mostCommonType = type
        }
      }

      result[area] = { type: mostCommonType, count: maxCount }
    }

    return result
  }

export { findMostCommonCrimePerArea }
