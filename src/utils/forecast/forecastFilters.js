import {
  DEFAULT_FORECAST_FILTERS,
  DEFAULT_FORECAST_VIEW_OPTIONS,
  FORECAST_FILTER_OPTIONS,
} from '../../constants/forecast'
import { uniqueValues } from './forecastHelpers'

export function getDefaultForecastFilters() {
  return { ...DEFAULT_FORECAST_FILTERS }
}

export function getDefaultForecastViewOptions() {
  return { ...DEFAULT_FORECAST_VIEW_OPTIONS }
}

export function applyForecastFilters(records, filters = DEFAULT_FORECAST_FILTERS) {
  return records.filter((record) => {
    const matchesRegion = filters.region === 'all' || record.region === filters.region
    const matchesPeriod = filters.period === 'all' || record.period === filters.period

    return matchesRegion && matchesPeriod
  })
}

export function sortForecastRecords(records, sortBy = DEFAULT_FORECAST_VIEW_OPTIONS.sortBy) {
  const direction = (left, right) => right - left

  if (sortBy === 'growth') {
    return [...records].sort((left, right) => direction(left.growth, right.growth))
  }

  if (sortBy === 'sales') {
    return [...records].sort((left, right) => direction(left.sales, right.sales))
  }

  return [...records].sort((left, right) => direction(left.revenue, right.revenue))
}

export function limitForecastRecords(records, topN = DEFAULT_FORECAST_VIEW_OPTIONS.topN) {
  if (topN === 'all') return records

  const parsedTopN = Number(topN)

  if (!Number.isInteger(parsedTopN) || parsedTopN <= 0) {
    return records
  }

  return records.slice(0, parsedTopN)
}

export function buildForecastFilterOptions(records) {
  const periods = uniqueValues(records, 'period').sort()
  const regions = uniqueValues(records, 'region').sort()

  return {
    periods: periods.map((period) => ({ label: period, value: period })),
    regions: regions.map((region) => ({ label: region, value: region })),
    sortBy: FORECAST_FILTER_OPTIONS.sortBy,
    topN: FORECAST_FILTER_OPTIONS.topN,
  }
}

export function buildForecastFilterFeedback(filters, meta) {
  const activeFilterLabels = []

  if (filters.region !== 'all') {
    activeFilterLabels.push(`Region: ${filters.region}`)
  }

  if (filters.period !== 'all') {
    activeFilterLabels.push(`Period: ${filters.period}`)
  }

  return {
    activeFilterLabels,
    activeFiltersCount: activeFilterLabels.length,
    summary:
      activeFilterLabels.length > 0
        ? `${activeFilterLabels.length} filter${activeFilterLabels.length > 1 ? 's' : ''} applied`
        : `Showing all ${meta.totalRows} forecast rows`,
  }
}
