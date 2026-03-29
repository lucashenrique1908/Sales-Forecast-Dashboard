import { NavLink, Outlet } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import routesConfig from '../routes/routesConfig'

const sidebarRoutes = routesConfig.filter((route) => route.showInSidebar)

function getStatusLabel(isLoading, error) {
  if (isLoading) return 'Loading forecast data'
  if (error) return 'API connection needs attention'
  return 'Dashboard data ready'
}

// The layout component defines the shared shell for all authenticated application pages.
function Layout() {
  const { appState, isLoading, error } = useAppContext()

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <span className="app-sidebar__badge">SF</span>
          <div>
            <strong>Sales Forecast</strong>
            <span>Dashboard Suite</span>
          </div>
        </div>

        <nav className="app-sidebar__nav" aria-label="Primary navigation">
          {sidebarRoutes.map(({ path, name, icon: Icon }) => (
            <NavLink
              key={path}
              to={`/${path}`}
              className={({ isActive }) =>
                isActive ? 'app-navlink app-navlink--active' : 'app-navlink'
              }
            >
              <Icon />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="app-header__eyebrow">{appState.currentCycle}</p>
            <h1>{appState.companyName}</h1>
          </div>
          <span className="app-header__status">{getStatusLabel(isLoading, error)}</span>
        </header>

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
