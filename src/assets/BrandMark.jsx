// assets: agrupa recursos visuais e referencias de identidade usados pela interface da aplicacao.
import { HiChartBar, HiOutlineSparkles } from 'react-icons/hi'

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span className="brand-mark__chip">
        <HiOutlineSparkles />
        Forecasting
      </span>
      <div className="brand-mark__badge">
        <HiChartBar />
      </div>
    </div>
  )
}

export default BrandMark
