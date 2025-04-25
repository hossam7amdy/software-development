import { processLondonCrimeData } from './process-london-crime-data.js'
import { analyzeYearlyTrend } from './analyze-yearly-trend.js'
import { findLeastCommonCrime } from './find-least-common-crime.js'
import { findMostDangerousAreas } from './find-most-dangerous-areas.js'
import { findMostCommonCrimePerArea } from './find-most-common-crime-per-area.js'

const csvFilePath = process.argv[2]

async function main() {
  try {
    console.log('Starting analysis of London Crime Data...')
    console.log('Reading and processing data from CSV file...')

    const results = await processLondonCrimeData(csvFilePath)

    console.log('\n===== ANALYSIS RESULTS =====\n')

    console.log(
      'Question 1: Did the number of crimes go up or down over the years?'
    )
    console.log(analyzeYearlyTrend(results.crimesByYear))
    console.log('\nYearly crime counts:')
    Object.keys(results.crimesByYear)
      .sort()
      .forEach(year => {
        console.log(`${year}: ${results.crimesByYear[year]} crimes`)
      })

    console.log('\nQuestion 2: What are the most dangerous areas of London?')
    const dangerousAreas = findMostDangerousAreas(results.crimesByArea)
    dangerousAreas.forEach((area, index) => {
      console.log(`${index + 1}. ${area}`)
    })

    console.log('\nQuestion 3: What is the most common crime per area?')
    const mostCommonByArea = findMostCommonCrimePerArea(
      results.crimeTypesByArea
    )
    Object.entries(mostCommonByArea).forEach(([area, { type, count }]) => {
      console.log(`${area}: ${type} (${count} incidents)`)
    })

    console.log('\nQuestion 4: What is the least common crime?')
    const leastCommonCrime = findLeastCommonCrime(results.totalCrimesByType)
    console.log(
      `${leastCommonCrime.type} with ${leastCommonCrime.count} incidents`
    )
  } catch (error) {
    console.error('Error processing London Crime Data:', error)
  }
}

main()
