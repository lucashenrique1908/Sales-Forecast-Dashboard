import ErrorBoundary from './components/ErrorBoundary'
import { DataProvider } from './contexts/DataContext'
import { UIProvider } from './contexts/UIContext'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <ErrorBoundary>
      <UIProvider>
        <DataProvider>
          <AppRouter />
        </DataProvider>
      </UIProvider>
    </ErrorBoundary>
  )
}

export default App
