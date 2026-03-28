import { FiBarChart2, FiDollarSign, FiPercent, FiTarget } from 'react-icons/fi'
import BrandMark from '../assets/BrandMark'
import StatCard from '../components/StatCard'
import useForecastData from '../hooks/useForecastData'
import { dashboardTheme } from '../styles/dashboardTheme'

const iconMap = {
  revenue: FiDollarSign,
  pipeline: FiTarget,
  'win-rate': FiPercent,
}

function DashboardPage() {
  const { data, loading } = useForecastData()

  if (loading) {
    return (
      <section className="dashboard-shell">
        <div className="hero-panel loading-panel">
          <p>Loading forecast dashboard...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard-shell" style={{ '--accent-color': dashboardTheme.accent }}>
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h2>Corporate visibility for revenue planning and pipeline confidence.</h2>
          <p>
            Track key sales signals, validate scenario assumptions and keep stakeholders
            aligned around the next forecast cycle.
          </p>
        </div>

        <div className="hero-panel__aside">
          <BrandMark />
          <div className="hero-metric">
            <FiBarChart2 />
            <div>
              <span>Forecast Period</span>
              <strong>{data.period}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {data.cards.map((card) => (
          <StatCard
            key={card.id}
            icon={iconMap[card.id]}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            trend={card.trend}
          />
        ))}
      </div>

      <div className="insights-panel">
        <div>
          <span className="eyebrow">Executive Highlights</span>
          <h3>What deserves attention this quarter</h3>
        </div>

        <ul>
          {data.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DashboardPage
