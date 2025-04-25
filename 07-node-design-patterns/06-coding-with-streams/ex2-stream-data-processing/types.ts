import type { PathLike } from 'fs'

export type CrimeByYear = {
  [year: string]: number
}

export type CrimesByArea = {
  [area: string]: number
}

export type CrimeTypesByArea = {
  [area: string]: {
    [crimeType: string]: number
  }
}

export type TotalCrimesByType = {
  [crimeType: string]: number
}

export type ProcessLondonCrimeData = (filePath: PathLike) => Promise<{
  crimesByYear: CrimeByYear
  crimesByArea: CrimesByArea
  crimeTypesByArea: CrimeTypesByArea
  totalCrimesByType: TotalCrimesByType
}>

export type FindMostCommonCrimePerArea = (
  crimeTypesByArea: CrimeTypesByArea
) => CrimeTypesByArea

export type AnalyzeYearlyTrend = (crimesByYear: CrimeByYear) => string

export type FindLeastCommonCrime = (totalCrimesByType: TotalCrimesByType) => {
  type: string
  count: number
}

export type FindMostDangerousAreas = (
  crimesByArea: CrimeByYear,
  limit?: number
) => string[]
