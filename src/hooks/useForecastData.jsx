import { useEffect, useState } from 'react'
import { getForecastSummary } from '../services/forecastService'

// A pasta hooks encapsula regras de estado e efeitos reutilizaveis entre telas do produto.
function useForecastData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    getForecastSummary().then((response) => {
      if (!active) return
      setData(response)
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [])

  return { data, loading }
}

export default useForecastData
