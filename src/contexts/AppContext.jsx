import { createContext, useContext, useMemo, useState } from 'react'

const initialUiState = {
  companyName: 'Sales Forecast Dashboard',
  currentCycle: 'Q2 2026',
  sidebarCollapsed: false,
}

export const AppContext = createContext({
  appState: initialUiState,
  setAppState: () => {},
  salesData: null,
  isLoading: true,
  error: null,
})

function AppProvider({ children, dashboardState }) {
  const [appState, setAppState] = useState(initialUiState)

  const value = useMemo(
    () => ({
      appState: {
        ...appState,
        currentCycle: dashboardState.data?.period ?? appState.currentCycle,
      },
      setAppState,
      salesData: dashboardState.data,
      isLoading: dashboardState.loading,
      error: dashboardState.error,
    }),
    [appState, dashboardState],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  return useContext(AppContext)
}

export default AppProvider
