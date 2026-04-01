import { describe, expect, it } from 'vitest'
import { selectForecastViewModel, selectTopPerformers } from './forecastSelectors'
import { forecastApiRows } from '../test/fixtures/forecastFixtures'

describe('forecast selectors', () => {
  it('builds a filter-aware dashboard view model', () => {
    const result = selectForecastViewModel(
      forecastApiRows,
      { region: 'Europe', period: 'all' },
      { sortBy: 'revenue', topN: 'all' },
    )

    expect(result.meta).toMatchObject({
      totalRows: 3,
      filteredRows: 1,
      visibleRows: 1,
      hasActiveFilters: true,
      hasVisibleData: true,
    })
    expect(result.cards[0].value).toBe('$341,500')
    expect(result.records[0].group).toBe('Europe')
    expect(result.meta.activeFilterLabels).toContain('Region: Europe')
  })

  it('selects top performers by metric', () => {
    const result = selectTopPerformers(
      selectForecastViewModel(forecastApiRows).records,
    )

    expect(result.revenue.group).toBe('North America')
    expect(result.sales.group).toBe('North America')
    expect(result.growth.group).toBe('North America')
  })
})
