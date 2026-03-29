const MOCKAROO_API_URL = import.meta.env.VITE_MOCKAROO_API_URL

const fallbackForecastRows = [
  { period: 'Q2 2026', region: 'North America', revenue: 482000, sales: 128, growth: 14.2 },
  { period: 'Q2 2026', region: 'Europe', revenue: 341500, sales: 94, growth: 10.4 },
  { period: 'Q2 2026', region: 'LATAM', revenue: 178900, sales: 61, growth: 8.7 },
  { period: 'Q2 2026', region: 'APAC', revenue: 263400, sales: 79, growth: 12.1 },
]

const numberFormatters = {
  currency: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }),
  decimal: new Intl.NumberFormat('en-US'),
  percent: new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }),
}

const revenueKeys = ['revenue', 'total_revenue', 'totalRevenue', 'amount', 'forecast_revenue']
const salesKeys = ['sales', 'total_sales', 'totalSales', 'orders', 'deals', 'quantity']
const growthKeys = ['growth', 'growth_pct', 'growthPercent', 'growth_percentage', 'yoy_growth']
const periodKeys = ['period', 'quarter', 'forecast_period', 'month']
const groupKeys = ['region', 'segment', 'territory', 'market']
const labelKeys = ['label', 'name', 'account', 'customer', 'date', 'month']

function extractValue(row, keys, fallback = null) {
  return keys.find((key) => row?.[key] !== undefined && row?.[key] !== null)
    ? row[keys.find((key) => row?.[key] !== undefined && row?.[key] !== null)]
    : fallback
}

function toNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const normalizedValue = value.replace(/[^0-9.-]+/g, '')
    const parsedValue = Number(normalizedValue)
    return Number.isFinite(parsedValue) ? parsedValue : 0
  }

  return 0
}

function formatCurrency(value) {
  return numberFormatters.currency.format(value)
}

function formatInteger(value) {
  return numberFormatters.decimal.format(Math.round(value))
}

function formatPercent(value) {
  return `${numberFormatters.percent.format(value)}%`
}

function normaliseForecastRow(row, index) {
  return {
    id: row.id ?? `${extractValue(row, labelKeys, 'row')}-${index}`,
    period: extractValue(row, periodKeys, 'Current period'),
    group: extractValue(row, groupKeys, `Group ${index + 1}`),
    label: extractValue(row, labelKeys, extractValue(row, groupKeys, `Entry ${index + 1}`)),
    revenue: toNumber(extractValue(row, revenueKeys, 0)),
    sales: toNumber(extractValue(row, salesKeys, 0)),
    growth: toNumber(extractValue(row, growthKeys, 0)),
  }
}

function calculateGrowth(records) {
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

function buildHighlights(records, totals) {
  const topRevenueRegion = [...records].sort((left, right) => right.revenue - left.revenue)[0]
  const topSalesRegion = [...records].sort((left, right) => right.sales - left.sales)[0]

  return [
    `${topRevenueRegion.group} leads revenue with ${formatCurrency(topRevenueRegion.revenue)} in the current forecast.`,
    `${topSalesRegion.group} contributes the highest sales volume with ${formatInteger(topSalesRegion.sales)} deals.`,
    `Average growth sits at ${formatPercent(totals.growth)} across ${formatInteger(records.length)} active forecast lines.`,
  ]
}

function formatForecastSummary(rows) {
  const records = rows.map(normaliseForecastRow)
  const totalRevenue = records.reduce((total, record) => total + record.revenue, 0)
  const totalSales = records.reduce((total, record) => total + record.sales, 0)
  const growth = calculateGrowth(records)
  const period = records[0]?.period ?? 'Current period'
  const maxRevenue = Math.max(...records.map((record) => record.revenue), 1)

  const totals = {
    revenue: totalRevenue,
    sales: totalSales,
    growth,
  }

  return {
    period,
    totals,
    cards: [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: formatCurrency(totalRevenue),
        subtitle: `Consolidated forecast for ${period}`,
        trend: formatPercent(growth),
      },
      {
        id: 'sales',
        title: 'Total Sales',
        value: formatInteger(totalSales),
        subtitle: 'Combined volume across all records',
        trend: `${records.length} data rows`,
      },
      {
        id: 'growth',
        title: 'Growth %',
        value: formatPercent(growth),
        subtitle: 'Average growth based on API payload',
        trend: totalRevenue > 0 ? 'Revenue trend active' : 'Awaiting revenue',
      },
    ],
    chartData: records.map((record) => ({
      id: record.id,
      label: record.label,
      group: record.group,
      revenue: record.revenue,
      sales: record.sales,
      growth: record.growth,
      revenueShare: totalRevenue > 0 ? (record.revenue / totalRevenue) * 100 : 0,
      revenueWidth: `${Math.max((record.revenue / maxRevenue) * 100, 8)}%`,
    })),
    highlights: buildHighlights(records, totals),
    lastUpdated: new Date().toISOString(),
    rawData: records,
  }
}

async function requestForecastRows() {
  if (!MOCKAROO_API_URL) {
    return fallbackForecastRows
  }

  const response = await fetch(MOCKAROO_API_URL)

  if (!response.ok) {
    throw new Error(`Forecast API request failed with status ${response.status}.`)
  }

  const payload = await response.json()

  if (!Array.isArray(payload)) {
    throw new Error('Forecast API returned an unexpected payload.')
  }

  return payload
}

// Services isolate external I/O and return data already shaped for the UI layer.
export async function getForecastSummary() {
  const rows = await requestForecastRows()
  return formatForecastSummary(rows)
}

export const fetchForecastSummary = getForecastSummary
