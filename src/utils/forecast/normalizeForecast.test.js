import { describe, expect, it } from 'vitest'
import { calculateForecastKpis } from './forecastKpis'
import { normalizeForecastData } from './normalizeForecast'
import { forecastApiRows } from '../../test/fixtures/forecastFixtures'

describe('forecast normalization', () => {
  it('normalizes raw api data into ui-safe forecast rows', () => {
    const result = normalizeForecastData(forecastApiRows)

    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({
      id: 'north-1',
      region: 'North America',
      revenue: 482000,
      revenueFormatted: '$482,000',
      salesFormatted: '128',
      growthFormatted: '14.2%',
    })
  })

  it('calculates forecast kpis from normalized records', () => {
    const normalized = normalizeForecastData(forecastApiRows)
    const result = calculateForecastKpis(normalized)

    expect(result.period).toBe('Q2 2026 • Q1 2026')
    expect(result.totals).toMatchObject({
      revenue: 1002400,
      sales: 283,
      revenueFormatted: '$1,002,400',
      salesFormatted: '283',
    })
  })
})
