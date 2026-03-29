import ErrorBoundary from './components/ErrorBoundary'
import AppProvider from './contexts/AppContext'
import useForecastData from './hooks/useForecastData'
import AppRouter from './routes/AppRouter'

function AppContent() {
  const dashboardState = useForecastData()

  return (
    <AppProvider dashboardState={dashboardState}>
      <AppRouter />
    </AppProvider>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}

export default App
