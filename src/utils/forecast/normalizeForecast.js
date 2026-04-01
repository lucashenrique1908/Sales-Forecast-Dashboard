import { FORECAST_FALLBACK_LABELS } from '../../constants/forecast'
import {
  formatCurrency,
  formatInteger,
  formatPercent,
  getForecastFieldValue,
  toNumber,
} from './forecastHelpers'

function normalizeForecastRow(row, index) {
  const revenue = toNumber(getForecastFieldValue(row, 'revenue', 0))
  const sales = toNumber(getForecastFieldValue(row, 'sales', 0))
  const growth = toNumber(getForecastFieldValue(row, 'growth', 0))
  const period = getForecastFieldValue(row, 'period', FORECAST_FALLBACK_LABELS.period)
  const group = getForecastFieldValue(
    row,
    'group',
    `${FORECAST_FALLBACK_LABELS.groupPrefix} ${index + 1}`,
  )

  return {
    id: row.id ?? `${getForecastFieldValue(row, 'label', FORECAST_FALLBACK_LABELS.rowPrefix)}-${index}`,
    period,
    group,
    region: group,
    label: getForecastFieldValue(row, 'label', group),
    revenue,
    sales,
    growth,
    revenueFormatted: formatCurrency(revenue),
    salesFormatted: formatInteger(sales),
    growthFormatted: formatPercent(growth),
  }
}

// Normalization shields the UI from API naming differences and transport quirks.
export function normalizeForecastData(rawRows = []) {
  return rawRows.map(normalizeForecastRow)
}
