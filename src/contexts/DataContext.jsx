/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react'
import useForecastData from '../hooks/useForecastData'

const DataContext = createContext({
  data: null,
  loading: true,
  error: null,
  filters: {
    region: 'all',
    period: 'all',
  },
  viewOptions: {
    sortBy: 'revenue',
    topN: 'all',
  },
  updateFilter: () => {},
  updateViewOption: () => {},
  resetFilters: () => {},
  refetch: async () => null,
})

export function DataProvider({ children }) {
  // DataContext shares only async forecast state and derived dashboard data.
  const {
    data,
    loading,
    error,
    filters,
    viewOptions,
    updateFilter,
    updateViewOption,
    resetFilters,
    refetch,
  } = useForecastData()

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
      filters,
      viewOptions,
      updateFilter,
      updateViewOption,
      resetFilters,
      refetch,
    }),
    [
      data,
      loading,
      error,
      filters,
      viewOptions,
      updateFilter,
      updateViewOption,
      resetFilters,
      refetch,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useDataContext() {
  return useContext(DataContext)
}
