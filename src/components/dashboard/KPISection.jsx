import { memo } from 'react'
import { FiDollarSign, FiShoppingCart, FiTrendingUp } from 'react-icons/fi'
import StatCard from '../StatCard'

const iconMap = {
  revenue: FiDollarSign,
  sales: FiShoppingCart,
  growth: FiTrendingUp,
}

function KPISection({ cards }) {
  return (
    <section className="stats-grid" aria-label="Forecast KPIs">
      {cards.map((card) => (
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
  )
}

export default memo(KPISection)
