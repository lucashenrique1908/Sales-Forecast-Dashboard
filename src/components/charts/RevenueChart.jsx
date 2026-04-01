import { memo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { FORECAST_CHART_CONFIG, FORECAST_UI_COPY } from '../../constants/forecast'
import EmptyState from '../ui/EmptyState'

function RevenueTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const point = payload[0].payload

  return (
    <div className="chart-tooltip">
      <strong>{point.name}</strong>
      <span>{point.period}</span>
      <span>Revenue: {point.revenueFormatted}</span>
      <span>Share: {point.revenueShareFormatted}</span>
    </div>
  )
}

function RevenueChart({ data }) {
  if (!data.length) {
    return (
      <EmptyState
        compact
        title={FORECAST_UI_COPY.filteredEmptyTitle}
        description="No revenue data is available for the selected filters."
      />
    )
  }

  return (
    <div className="chart-surface">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: -24, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={FORECAST_CHART_CONFIG.revenue.grid}
          />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            content={<RevenueTooltip />}
            cursor={{ fill: FORECAST_CHART_CONFIG.revenue.cursor }}
          />
          <Bar
            dataKey={FORECAST_CHART_CONFIG.revenue.dataKey}
            radius={[10, 10, 0, 0]}
            fill={FORECAST_CHART_CONFIG.revenue.color}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(RevenueChart)
