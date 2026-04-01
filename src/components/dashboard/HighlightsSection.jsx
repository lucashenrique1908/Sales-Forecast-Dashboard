import { memo } from 'react'
import { FORECAST_UI_COPY } from '../../constants/forecast'
import EmptyState from '../ui/EmptyState'

function HighlightsSection({ highlights, records, meta }) {
  return (
    <section className="dashboard-detail-grid">
      <article className="insights-panel">
        <div>
          <span className="eyebrow">{FORECAST_UI_COPY.highlightsEyebrow}</span>
          <h3>{FORECAST_UI_COPY.highlightsTitle}</h3>
        </div>

        <ul>
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </article>

      <article className="insights-panel">
        <div>
          <span className="eyebrow">{FORECAST_UI_COPY.rankingEyebrow}</span>
          <h3>{FORECAST_UI_COPY.rankingTitle}</h3>
        </div>

        <div className="trend-list" role="list" aria-label="Filtered forecast ranking">
          {records.map((item) => (
            <article key={item.id} className="trend-row" role="listitem">
              <div className="trend-row__header">
                <div>
                  <strong>{item.group}</strong>
                  <span>{item.label}</span>
                </div>
                <span>{item.growthFormatted}</span>
              </div>
              <div className="trend-row__bar">
                <span style={{ width: item.revenueWidth }} />
              </div>
              <div className="trend-row__meta">
                <span>Revenue: {item.revenueFormatted}</span>
                <span>Sales: {item.salesFormatted}</span>
              </div>
            </article>
          ))}

          {!records.length && (
            <EmptyState
              compact
              title={FORECAST_UI_COPY.filteredEmptyTitle}
              description="No records are available for the active filter combination."
            />
          )}
        </div>

        <p className="panel-caption">{FORECAST_UI_COPY.rankingCaption(meta.visibleRows, meta.totalRows)}</p>
      </article>
    </section>
  )
}

export default memo(HighlightsSection)
