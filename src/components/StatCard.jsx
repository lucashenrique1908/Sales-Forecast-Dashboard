// components: centraliza componentes reutilizaveis de interface para manter consistencia visual e facilitar escala.
import { HiTrendingUp } from 'react-icons/hi'

function StatCard({ title, value, change, tone = 'positive' }) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__icon">
        <HiTrendingUp />
      </div>
      <div>
        <span className="stat-card__label">{title}</span>
        <strong className="stat-card__value">{value}</strong>
        <p className="stat-card__change">{change}</p>
      </div>
    </article>
  )
}

export default StatCard
