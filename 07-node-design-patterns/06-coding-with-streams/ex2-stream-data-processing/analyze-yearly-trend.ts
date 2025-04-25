import type { AnalyzeYearlyTrend } from './types.js'

const analyzeYearlyTrend: AnalyzeYearlyTrend = crimesByYear => {
  const years = Object.keys(crimesByYear).sort()

  if (years.length < 2) {
    return 'Insufficient data to determine trend'
  }

  const firstYear = years[0]
  const lastYear = years[years.length - 1]

  if (crimesByYear[lastYear] > crimesByYear[firstYear]) {
    return `Crime increased from ${crimesByYear[firstYear]} in ${firstYear} to ${crimesByYear[lastYear]} in ${lastYear}`
  } else if (crimesByYear[lastYear] < crimesByYear[firstYear]) {
    return `Crime decreased from ${crimesByYear[firstYear]} in ${firstYear} to ${crimesByYear[lastYear]} in ${lastYear}`
  } else {
    return `Crime remained stable at ${crimesByYear[firstYear]} between ${firstYear} and ${lastYear}`
  }
}

export { analyzeYearlyTrend }
