import { createContext, useMemo, useState } from 'react'

const initialAppState = {
  companyName: 'Sales Forecast Dashboard',
  currentCycle: 'Q2 2026',
  sidebarCollapsed: false,
}

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: () => {},
})

function AppProvider({ children }) {
  const [appState, setAppState] = useState(initialAppState)

  const value = useMemo(
    () => ({
      appState,
      setAppState,
    }),
    [appState],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
