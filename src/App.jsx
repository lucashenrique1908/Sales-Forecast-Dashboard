import ErrorBoundary from './components/ErrorBoundary'
import AppProvider from './contexts/AppContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
