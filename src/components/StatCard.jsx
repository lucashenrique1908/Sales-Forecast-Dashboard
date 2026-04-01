import { FiArrowUpRight } from 'react-icons/fi'

// A pasta components concentra blocos reutilizaveis da interface para manter consistencia visual.
function StatCard({ icon, title, value, subtitle, trend }) {
  const IconComponent = icon

  return (
    <article className="stat-card">
      <div className="stat-card__header">
        <div className="stat-card__icon">
          <IconComponent />
        </div>
        <span className="stat-card__trend">{trend}</span>
      </div>

      <div className="stat-card__body">
        <p>{title}</p>
        <strong>{value}</strong>
        <span>{subtitle}</span>
      </div>

      <div className="stat-card__footer">
        <span>Updated from forecast engine</span>
        <FiArrowUpRight />
      </div>
    </article>
  )
}

export default StatCard
