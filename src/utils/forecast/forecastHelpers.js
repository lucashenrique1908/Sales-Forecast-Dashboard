import {
  FORECAST_CURRENCY,
  FORECAST_DATE_LOCALE,
  FORECAST_FIELD_KEYS,
  FORECAST_METRIC_TYPES,
} from '../../constants/forecast'

const numberFormatters = {
  currency: new Intl.NumberFormat(FORECAST_DATE_LOCALE, {
    style: 'currency',
    currency: FORECAST_CURRENCY,
    maximumFractionDigits: 0,
  }),
  decimal: new Intl.NumberFormat(FORECAST_DATE_LOCALE),
  percent: new Intl.NumberFormat(FORECAST_DATE_LOCALE, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }),
}

export function extractValue(row, keys, fallback = null) {
  const matchedKey = keys.find((key) => row?.[key] !== undefined && row?.[key] !== null)
  return matchedKey ? row[matchedKey] : fallback
}

export function getForecastFieldValue(row, fieldName, fallback = null) {
  return extractValue(row, FORECAST_FIELD_KEYS[fieldName], fallback)
}

export function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value

  if (typeof value === 'string') {
    const normalizedValue = value.replace(/[^0-9.-]+/g, '')
    const parsedValue = Number(normalizedValue)

    return Number.isFinite(parsedValue) ? parsedValue : 0
  }

  return 0
}

export function formatCurrency(value) {
  return numberFormatters.currency.format(value)
}

export function formatInteger(value) {
  return numberFormatters.decimal.format(Math.round(value))
}

export function formatPercent(value) {
  return `${numberFormatters.percent.format(value)}%`
}

export function formatForecastDate(value) {
  return new Date(value).toLocaleDateString(FORECAST_DATE_LOCALE)
}

export function formatForecastValue(type, value) {
  if (type === FORECAST_METRIC_TYPES.revenue) return formatCurrency(value)
  if (type === FORECAST_METRIC_TYPES.growth) return formatPercent(value)
  return formatInteger(value)
}

export function uniqueValues(records, key) {
  return [...new Set(records.map((record) => record[key]))].filter(Boolean)
}
