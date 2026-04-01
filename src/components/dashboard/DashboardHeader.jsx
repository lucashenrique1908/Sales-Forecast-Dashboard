import { memo } from 'react'
import { FiActivity, FiBarChart2 } from 'react-icons/fi'
import { FORECAST_UI_COPY } from '../../constants/forecast'
import BrandMark from '../../assets/BrandMark'

function DashboardHeader({ data }) {
  return (
    <section className="hero-panel">
      <div>
        <span className="eyebrow">{FORECAST_UI_COPY.headerEyebrow}</span>
        <h2>{FORECAST_UI_COPY.headerTitle}</h2>
        <p>{FORECAST_UI_COPY.headerDescription}</p>
      </div>

      <div className="hero-panel__aside">
        <BrandMark />
        <div className="hero-metric">
          <FiBarChart2 />
          <div>
            <span>{FORECAST_UI_COPY.visiblePeriodLabel}</span>
            <strong>{data.period}</strong>
          </div>
        </div>
        <div className="hero-metric">
          <FiActivity />
          <div>
            <span>{FORECAST_UI_COPY.lastUpdatedLabel}</span>
            <strong>{data.lastUpdatedFormatted}</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(DashboardHeader)
