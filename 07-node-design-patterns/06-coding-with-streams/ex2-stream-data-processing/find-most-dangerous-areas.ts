import type { FindMostDangerousAreas } from './types.js'

const findMostDangerousAreas: FindMostDangerousAreas = (
  crimesByArea: Record<string, number>,
  limit = 5
) => {
  return Object.entries(crimesByArea)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([area, count]) => `${area}: ${count} crimes`)
}

export { findMostDangerousAreas }
