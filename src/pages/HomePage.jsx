import { FiDollarSign, FiShoppingCart, FiTrendingUp } from 'react-icons/fi'
import BrandMark from '../assets/BrandMark'
import StatCard from '../components/StatCard'
import { useDataContext } from '../contexts/DataContext'

const iconMap = {
  revenue: FiDollarSign,
  sales: FiShoppingCart,
  growth: FiTrendingUp,
}

// pages: organiza telas de alto nivel que representam rotas e compoem a experiencia completa do usuario.
function HomePage() {
  const { data, loading, error } = useDataContext()

  if (loading || !data) {
    return (
      <main className="dashboard-shell">
        <section className="hero-panel loading-panel">
          <p>Loading forecast dashboard...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Sales Forecast Dashboard</p>
          <h1>Corporate forecasting with a scalable React foundation.</h1>
          <p className="hero-copy">
            Sprint 1 delivers the first complete data flow from API service to dashboard UI
            with loading and error states handled centrally.
          </p>
        </div>
        <BrandMark />
      </section>

      <section className="stats-grid" aria-label="Sales forecast highlights">
        {data.cards.map((card) => (
          <StatCard key={card.id} icon={iconMap[card.id]} {...card} />
        ))}
      </section>

      <section className="dashboard-detail-grid">
        <article className="insights-panel">
          <p className="eyebrow">Next milestone</p>
          <h2>Roadmap inicial</h2>
          <p>
            The project is now ready for richer charts, filters and additional forecast
            scenarios on top of the shared context.
          </p>
        </article>

        <article className="insights-panel">
          <p className="eyebrow">API status</p>
          <h2>{error ? 'Check connection' : 'Connected via service layer'}</h2>
          <p>The dashboard data flows through `DataContext`, separate from UI shell state.</p>
        </article>
      </section>
    </main>
  )
}

export default HomePage
