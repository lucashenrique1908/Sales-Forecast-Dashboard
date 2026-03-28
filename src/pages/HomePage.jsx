// pages: organiza telas de alto nivel que representam rotas e compoem a experiencia completa do usuario.
import StatCard from '../components/StatCard'
import useSalesSummary from '../hooks/useSalesSummary'
import { fetchForecastSummary } from '../services/forecastService'
import BrandMark from '../assets/BrandMark'

function HomePage() {
  const summary = useSalesSummary(fetchForecastSummary)

  return (
    <main className="dashboard-page">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Sales Forecast Dashboard</p>
          <h1>Corporate forecasting with a scalable React foundation.</h1>
          <p className="hero-copy">
            Estrutura inicial pronta para evoluir com autenticacao, modulos de
            analytics e integracoes reais de API.
          </p>
        </div>
        <BrandMark />
      </section>

      <section className="stats-grid" aria-label="Sales forecast highlights">
        {summary.cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <section className="content-grid">
        <article className="panel">
          <p className="panel__title">Next milestone</p>
          <h2>Roadmap inicial</h2>
          <p>
            Rotas, componentes reutilizaveis, hooks e servicos fake ja estao
            separados para apoiar uma arquitetura corporativa e escalavel.
          </p>
        </article>

        <article className="panel">
          <p className="panel__title">API status</p>
          <h2>{summary.statusLabel}</h2>
          <p>
            Os dados atuais sao simulados pelo servico em
            <code> src/services/forecastService.js</code>.
          </p>
        </article>
      </section>
    </main>
  )
}

export default HomePage
