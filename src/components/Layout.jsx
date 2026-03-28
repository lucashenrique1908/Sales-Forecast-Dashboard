import { NavLink, Outlet } from 'react-router-dom'
import { FiBarChart2, FiFileText, FiSettings } from 'react-icons/fi'

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiBarChart2 },
  { to: '/reports', label: 'Reports', icon: FiFileText },
  { to: '/settings', label: 'Settings', icon: FiSettings },
]

// The layout component defines the shared shell for all authenticated application pages.
function Layout() {
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
          {navigationItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? 'app-navlink app-navlink--active' : 'app-navlink'
              }
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="app-header__eyebrow">Sprint 0</p>
            <h1>Sales Forecast Dashboard</h1>
          </div>
          <span className="app-header__status">Architecture baseline ready</span>
        </header>

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
