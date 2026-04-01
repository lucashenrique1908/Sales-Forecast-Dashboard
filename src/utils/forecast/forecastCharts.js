import { formatPercent } from './forecastHelpers'

export function buildForecastChartData(records, totals) {
  const maxRevenue = Math.max(...records.map((record) => record.revenue), 1)

  return records.map((record, index) => ({
    id: record.id,
    name: record.group,
    label: record.label,
    period: record.period,
    sortRank: index + 1,
    revenue: record.revenue,
    revenueFormatted: record.revenueFormatted,
    growth: record.growth,
    growthFormatted: record.growthFormatted,
    sales: record.sales,
    salesFormatted: record.salesFormatted,
    revenueShare: totals.revenue > 0 ? (record.revenue / totals.revenue) * 100 : 0,
    revenueShareFormatted: formatPercent(
      totals.revenue > 0 ? (record.revenue / totals.revenue) * 100 : 0,
    ),
    revenueWidth: `${Math.max((record.revenue / maxRevenue) * 100, 8)}%`,
  }))
}
