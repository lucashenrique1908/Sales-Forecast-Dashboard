import { NavLink, Outlet } from 'react-router-dom'
import { useDataContext } from '../contexts/DataContext'
import { useUIContext } from '../contexts/UIContext'
import routesConfig from '../routes/routesConfig'

const sidebarRoutes = routesConfig.filter((route) => route.showInSidebar)

function getStatusLabel(loading, error) {
  if (loading) return 'Loading forecast data'
  if (error) return 'API connection needs attention'
  return 'Dashboard data ready'
}

// Layout keeps shell concerns only and reads state from dedicated contexts.
function Layout() {
  const { companyName, currentCycle, sidebarCollapsed } = useUIContext()
  const { data, loading, error } = useDataContext()

  return (
    <div className={`app-layout${sidebarCollapsed ? ' app-layout--sidebar-collapsed' : ''}`}>
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <span className="app-sidebar__badge">SF</span>
          <div>
            <strong>Sales Forecast</strong>
            <span>Dashboard Suite</span>
          </div>
        </div>

        <nav className="app-sidebar__nav" aria-label="Primary navigation">
          {sidebarRoutes.map((route) => {
            const RouteIcon = route.icon

            return (
              <NavLink
                key={route.path}
                to={`/${route.path}`}
                className={({ isActive }) =>
                  isActive ? 'app-navlink app-navlink--active' : 'app-navlink'
                }
              >
                <RouteIcon />
                <span>{route.name}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="app-header__eyebrow">{data?.period ?? currentCycle}</p>
            <h1>{companyName}</h1>
          </div>
          <span className="app-header__status">{getStatusLabel(loading, error)}</span>
        </header>

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
