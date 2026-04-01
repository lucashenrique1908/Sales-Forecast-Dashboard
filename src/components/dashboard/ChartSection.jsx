import { memo } from 'react'
import { FORECAST_CHART_CONFIG, FORECAST_UI_COPY } from '../../constants/forecast'
import GrowthChart from '../charts/GrowthChart'
import RevenueChart from '../charts/RevenueChart'

function ChartSection({ revenueChartData, growthChartData, meta }) {
  return (
    <section className="dashboard-chart-grid">
      <article className="insights-panel chart-panel">
        <div className="chart-panel__header">
          <div>
            <span className="eyebrow">{FORECAST_CHART_CONFIG.revenue.eyebrow}</span>
            <h3>{FORECAST_CHART_CONFIG.revenue.title}</h3>
          </div>
          <span>{FORECAST_UI_COPY.visibleRowsLabel(meta.visibleRows)}</span>
        </div>
        <RevenueChart data={revenueChartData} />
      </article>

      <article className="insights-panel chart-panel">
        <div className="chart-panel__header">
          <div>
            <span className="eyebrow">{FORECAST_CHART_CONFIG.growth.eyebrow}</span>
            <h3>{FORECAST_CHART_CONFIG.growth.title}</h3>
          </div>
          <span>{FORECAST_UI_COPY.syncedWithFiltersLabel}</span>
        </div>
        <GrowthChart data={growthChartData} />
      </article>
    </section>
  )
}

export default memo(ChartSection)
