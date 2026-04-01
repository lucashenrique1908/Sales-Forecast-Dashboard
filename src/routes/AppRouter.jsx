import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import routesConfig from './routesConfig'

const notFoundRoute = routesConfig.find((route) => route.path === '*')
const appRoutes = routesConfig.filter((route) => route.path !== '*')
const defaultRoute = appRoutes[0]
const NotFoundPage = notFoundRoute?.element

// A pasta routes centraliza o mapa de navegacao e protege a escalabilidade do frontend.
function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={`/${defaultRoute.path}`} replace />} />
            {appRoutes.map((route) => {
              const RoutePage = route.element

              return <Route key={route.path} path={route.path} element={<RoutePage />} />
            })}
            {NotFoundPage ? <Route path="*" element={<NotFoundPage />} /> : null}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
