import { FiActivity, FiBarChart2, FiDollarSign, FiShoppingCart, FiTrendingUp } from 'react-icons/fi'
import BrandMark from '../assets/BrandMark'
import StatCard from '../components/StatCard'
import { useAppContext } from '../contexts/AppContext'
import { dashboardTheme } from '../styles/dashboardTheme'

const iconMap = {
  revenue: FiDollarSign,
  sales: FiShoppingCart,
  growth: FiTrendingUp,
}

function DashboardPage() {
  const { salesData, isLoading, error } = useAppContext()

  if (isLoading) {
    return (
      <section className="dashboard-shell">
        <div className="hero-panel loading-panel">
          <p>Loading sales forecast data...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="dashboard-shell">
        <div className="insights-panel dashboard-error-panel">
          <span className="eyebrow">Data error</span>
          <h3>We could not load the dashboard data.</h3>
          <p>{error}</p>
          <p>
            Set `VITE_MOCKAROO_API_URL` with your Mockaroo endpoint to connect the real
            dataset.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="dashboard-shell" style={{ '--accent-color': dashboardTheme.accent }}>
      <div className="hero-panel">
        <div>
          <span className="eyebrow">Sprint 1 Dashboard</span>
          <h2>Real forecast metrics connected from the service layer to the UI.</h2>
          <p>
            This dashboard now consumes API data, centralises loading in the global
            context and keeps components focused on presentation.
          </p>
        </div>

        <div className="hero-panel__aside">
          <BrandMark />
          <div className="hero-metric">
            <FiBarChart2 />
            <div>
              <span>Forecast Period</span>
              <strong>{salesData.period}</strong>
            </div>
          </div>
          <div className="hero-metric">
            <FiActivity />
            <div>
              <span>Last Updated</span>
              <strong>{new Date(salesData.lastUpdated).toLocaleDateString('en-US')}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {salesData.cards.map((card) => (
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

      <div className="dashboard-detail-grid">
        <section className="insights-panel">
          <div>
            <span className="eyebrow">Revenue Breakdown</span>
            <h3>Distribution by business slice</h3>
          </div>

          <div className="trend-list" role="list" aria-label="Revenue distribution">
            {salesData.chartData.map((item) => (
              <article key={item.id} className="trend-row" role="listitem">
                <div className="trend-row__header">
                  <div>
                    <strong>{item.group}</strong>
                    <span>{item.label}</span>
                  </div>
                  <span>{item.revenueShare.toFixed(1)}%</span>
                </div>
                <div className="trend-row__bar">
                  <span style={{ width: item.revenueWidth }} />
                </div>
                <div className="trend-row__meta">
                  <span>Revenue: {item.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</span>
                  <span>Sales: {item.sales}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="insights-panel">
          <div>
            <span className="eyebrow">Executive Highlights</span>
            <h3>Signals worth tracking now</h3>
          </div>

          <ul>
            {salesData.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

export default DashboardPage
