import {
  FORECAST_CARD_IDS,
  FORECAST_KPI_CARD_CONTENT,
  FORECAST_UI_COPY,
} from '../../constants/forecast'
import { formatCurrency, formatInteger, formatPercent } from './forecastHelpers'

export function calculateAverageGrowth(records) {
  const growthValues = records.map((record) => record.growth).filter((value) => value !== 0)

  if (growthValues.length > 0) {
    return growthValues.reduce((total, value) => total + value, 0) / growthValues.length
  }

  if (records.length < 2 || records[0].revenue === 0) {
    return 0
  }

  const firstRevenue = records[0].revenue
  const lastRevenue = records[records.length - 1].revenue

  return ((lastRevenue - firstRevenue) / firstRevenue) * 100
}

// KPI calculation stays in the forecast domain so hooks only orchestrate state and fetches.
export function calculateForecastKpis(records = []) {
  const totalRevenue = records.reduce((total, record) => total + record.revenue, 0)
  const totalSales = records.reduce((total, record) => total + record.sales, 0)
  const growth = calculateAverageGrowth(records)
  const period =
    records.length === 1
      ? records[0].period
      : [...new Set(records.map((record) => record.period))].join(' • ') || 'Current period'

  return {
    period,
    totals: {
      revenue: totalRevenue,
      sales: totalSales,
      growth,
      revenueFormatted: formatCurrency(totalRevenue),
      salesFormatted: formatInteger(totalSales),
      growthFormatted: formatPercent(growth),
    },
  }
}

export function buildForecastCards(totals, period, visibleRows) {
  return [
    {
      id: FORECAST_CARD_IDS.revenue,
      title: FORECAST_KPI_CARD_CONTENT.revenue.title,
      value: totals.revenueFormatted,
      subtitle: FORECAST_KPI_CARD_CONTENT.revenue.subtitle(period),
      trend: FORECAST_KPI_CARD_CONTENT.revenue.trend(visibleRows, formatInteger),
    },
    {
      id: FORECAST_CARD_IDS.sales,
      title: FORECAST_KPI_CARD_CONTENT.sales.title,
      value: totals.salesFormatted,
      subtitle: FORECAST_KPI_CARD_CONTENT.sales.subtitle,
      trend: FORECAST_KPI_CARD_CONTENT.sales.trend(visibleRows, formatInteger, totals),
    },
    {
      id: FORECAST_CARD_IDS.growth,
      title: FORECAST_KPI_CARD_CONTENT.growth.title,
      value: totals.growthFormatted,
      subtitle: FORECAST_KPI_CARD_CONTENT.growth.subtitle,
      trend: FORECAST_KPI_CARD_CONTENT.growth.trend(visibleRows),
    },
  ]
}

export function buildForecastEmptyState(hasActiveFilters) {
  if (hasActiveFilters) {
    return {
      title: FORECAST_UI_COPY.filteredEmptyTitle,
      description: FORECAST_UI_COPY.filteredEmptyDescription,
    }
  }

  return {
    title: FORECAST_UI_COPY.emptyTitle,
    description: FORECAST_UI_COPY.emptyDescription,
  }
}

export function buildForecastHighlights(records, totals, topPerformers, hasActiveFilters) {
  if (records.length === 0) {
    const emptyState = buildForecastEmptyState(hasActiveFilters)

    return [
      emptyState.title,
      emptyState.description,
      hasActiveFilters
        ? 'Clearing filters will restore the complete dashboard view.'
        : 'Growth insights will appear after valid records are loaded.',
    ]
  }

  return [
    `${topPerformers.revenue.group} leads revenue with ${topPerformers.revenue.revenueFormatted} in the active view.`,
    `${topPerformers.sales.group} contributes the highest sales volume with ${topPerformers.sales.salesFormatted} deals.`,
    `Average growth sits at ${formatPercent(totals.growth)} across ${formatInteger(records.length)} visible forecast lines.`,
  ]
}
