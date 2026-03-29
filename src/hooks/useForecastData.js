import { useEffect, useState } from 'react'
import { getForecastSummary } from '../services/forecastService'

const initialState = {
  data: null,
  loading: true,
  error: null,
}

// Hooks keep async state and side effects away from the visual components.
function useForecastData() {
  const [forecastState, setForecastState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function loadForecastData() {
      setForecastState((currentState) => ({
        ...currentState,
        loading: true,
        error: null,
      }))

      try {
        const response = await getForecastSummary()

        if (!isMounted) return

        setForecastState({
          data: response,
          loading: false,
          error: null,
        })
      } catch (error) {
        if (!isMounted) return

        setForecastState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load forecast data.',
        })
      }
    }

    loadForecastData()

    return () => {
      isMounted = false
    }
  }, [])

  return forecastState
}

export default useForecastData
