import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchForecastSummary } from '../services/forecastService'
import { selectForecastViewModel } from '../selectors/forecastSelectors'
import {
  getDefaultForecastFilters,
  getDefaultForecastViewOptions,
} from '../utils/forecast/forecastFilters'

// Data flow: service -> hook -> context -> UI. The hook only orchestrates async state
// and delegates all heavy derivation to forecast selectors and formatter utilities.
function useForecastData() {
  const [rawData, setRawData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(() => getDefaultForecastFilters())
  const [viewOptions, setViewOptions] = useState(() => getDefaultForecastViewOptions())

  const updateFilter = useCallback((name, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(getDefaultForecastFilters())
    setViewOptions(getDefaultForecastViewOptions())
  }, [])

  const updateViewOption = useCallback((name, value) => {
    setViewOptions((currentOptions) => ({
      ...currentOptions,
      [name]: value,
    }))
  }, [])

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const nextRawData = await fetchForecastSummary()
      setRawData(nextRawData)
      return nextRawData
    } catch (caughtError) {
      const normalizedError =
        caughtError instanceof Error
          ? caughtError
          : new Error('Unable to load forecast data.')

      setError(normalizedError)
      setRawData([])
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const data = useMemo(() => {
    if (error) return null

    return selectForecastViewModel(rawData, filters, viewOptions)
  }, [error, rawData, filters, viewOptions])

  return {
    data,
    loading,
    error,
    filters,
    viewOptions,
    updateFilter,
    updateViewOption,
    resetFilters,
    refetch,
  }
}

export default useForecastData
