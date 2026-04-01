/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const initialCompanyName = 'Sales Forecast Dashboard'
const initialCurrentCycle = 'Q2 2026'
const initialSidebarCollapsed = false

const UIContext = createContext({
  companyName: initialCompanyName,
  currentCycle: initialCurrentCycle,
  sidebarCollapsed: initialSidebarCollapsed,
  setCompanyName: () => {},
  setCurrentCycle: () => {},
  setSidebarCollapsed: () => {},
  toggleSidebar: () => {},
})

export function UIProvider({ children }) {
  const [companyName, setCompanyName] = useState(initialCompanyName)
  const [currentCycle, setCurrentCycle] = useState(initialCurrentCycle)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialSidebarCollapsed)

  // UIContext keeps visual shell state isolated from API and business data concerns.
  const value = useMemo(
    () => ({
      companyName,
      currentCycle,
      sidebarCollapsed,
      setCompanyName,
      setCurrentCycle,
      setSidebarCollapsed,
      toggleSidebar: () => setSidebarCollapsed((currentValue) => !currentValue),
    }),
    [companyName, currentCycle, sidebarCollapsed],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUIContext() {
  return useContext(UIContext)
}
