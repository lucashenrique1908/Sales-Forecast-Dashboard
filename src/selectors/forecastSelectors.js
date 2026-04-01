import { formatForecastDate } from '../utils/forecast/forecastHelpers'
import { buildForecastChartData } from '../utils/forecast/forecastCharts'
import {
  applyForecastFilters,
  buildForecastFilterFeedback,
  buildForecastFilterOptions,
  getDefaultForecastFilters,
  getDefaultForecastViewOptions,
  limitForecastRecords,
  sortForecastRecords,
} from '../utils/forecast/forecastFilters'
import {
  buildForecastCards,
  buildForecastEmptyState,
  buildForecastHighlights,
  calculateForecastKpis,
} from '../utils/forecast/forecastKpis'
import { normalizeForecastData } from '../utils/forecast/normalizeForecast'

export function selectTopPerformers(records = []) {
  if (records.length === 0) {
    return {
      revenue: null,
      sales: null,
      growth: null,
    }
  }

  const byMetric = (metric) => [...records].sort((left, right) => right[metric] - left[metric])[0]

  return {
    revenue: byMetric('revenue'),
    sales: byMetric('sales'),
    growth: byMetric('growth'),
  }
}

export function selectForecastMeta(normalizedRecords, filteredRecords, visibleRecords, filters) {
  const hasActiveFilters = filters.region !== 'all' || filters.period !== 'all'
  const filterFeedback = buildForecastFilterFeedback(filters, {
    totalRows: normalizedRecords.length,
  })

  return {
    totalRows: normalizedRecords.length,
    filteredRows: filteredRecords.length,
    visibleRows: visibleRecords.length,
    hasRawData: normalizedRecords.length > 0,
    hasActiveFilters,
    hasVisibleData: visibleRecords.length > 0,
    ...filterFeedback,
  }
}

export function selectForecastViewModel(
  rawRows = [],
  filters = getDefaultForecastFilters(),
  viewOptions = getDefaultForecastViewOptions(),
) {
  const normalizedRecords = normalizeForecastData(rawRows)
  const filterOptions = buildForecastFilterOptions(normalizedRecords)
  const filteredRecords = applyForecastFilters(normalizedRecords, filters)
  const sortedRecords = sortForecastRecords(filteredRecords, viewOptions.sortBy)
  const visibleRecords = limitForecastRecords(sortedRecords, viewOptions.topN)
  const { period, totals } = calculateForecastKpis(visibleRecords)
  const topPerformers = selectTopPerformers(visibleRecords)
  const meta = selectForecastMeta(normalizedRecords, filteredRecords, visibleRecords, filters)
  const chartData = buildForecastChartData(visibleRecords, totals)
  const emptyState = buildForecastEmptyState(meta.hasActiveFilters)
  const selectedPeriod = filters.period === 'all' ? period || 'All periods' : filters.period

  return {
    period: selectedPeriod,
    filters,
    viewOptions,
    totals,
    cards: buildForecastCards(totals, selectedPeriod, meta.visibleRows),
    chartData,
    revenueChartData: chartData,
    growthChartData: chartData,
    highlights: buildForecastHighlights(
      visibleRecords,
      totals,
      topPerformers,
      meta.hasActiveFilters,
    ),
    records: visibleRecords,
    rawData: normalizedRecords,
    filterOptions,
    meta,
    topPerformers,
    emptyState,
    lastUpdated: new Date().toISOString(),
    lastUpdatedFormatted: formatForecastDate(new Date().toISOString()),
  }
}
