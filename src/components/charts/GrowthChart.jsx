import { memo } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { FORECAST_CHART_CONFIG, FORECAST_UI_COPY } from '../../constants/forecast'
import EmptyState from '../ui/EmptyState'

function GrowthTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const point = payload[0].payload

  return (
    <div className="chart-tooltip">
      <strong>{point.name}</strong>
      <span>{point.period}</span>
      <span>Growth: {point.growthFormatted}</span>
      <span>Sales: {point.salesFormatted}</span>
    </div>
  )
}

function GrowthChart({ data }) {
  if (!data.length) {
    return (
      <EmptyState
        compact
        title={FORECAST_UI_COPY.filteredEmptyTitle}
        description="No growth data is available for the selected filters."
      />
    )
  }

  return (
    <div className="chart-surface">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 16, right: 16, left: -24, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={FORECAST_CHART_CONFIG.growth.grid}
          />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            content={<GrowthTooltip />}
            cursor={{ stroke: FORECAST_CHART_CONFIG.growth.cursor }}
          />
          <Line
            type="monotone"
            dataKey={FORECAST_CHART_CONFIG.growth.dataKey}
            stroke={FORECAST_CHART_CONFIG.growth.color}
            strokeWidth={3}
            dot={{ r: 4, fill: FORECAST_CHART_CONFIG.growth.color }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(GrowthChart)
