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

// A pasta pages organiza telas completas conectando layout, dados e componentes de negocio.
function Home() {
  const { data, loading } = useForecastData()

  if (loading) {
    return (
      <main className="dashboard-shell">
        <section className="hero-panel loading-panel">
          <p>Loading forecast dashboard...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="dashboard-shell" style={{ '--accent-color': dashboardTheme.accent }}>
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Sales Forecast Dashboard</span>
          <h1>Corporate visibility for revenue planning and pipeline confidence.</h1>
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
      </section>

      <section className="stats-grid">
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
      </section>

      <section className="insights-panel">
        <div>
          <span className="eyebrow">Executive Highlights</span>
          <h2>What deserves attention this quarter</h2>
        </div>

        <ul>
          {data.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Home
