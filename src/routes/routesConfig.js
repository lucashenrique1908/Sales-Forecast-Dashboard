import { lazy } from 'react'
import { FiBarChart2, FiFileText, FiSettings } from 'react-icons/fi'

const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const ReportsPage = lazy(() => import('../pages/ReportsPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const NotFound = lazy(() => import('../pages/NotFound'))

const routesConfig = [
  {
    path: 'dashboard',
    element: DashboardPage,
    name: 'Dashboard',
    icon: FiBarChart2,
    showInSidebar: true,
  },
  {
    path: 'reports',
    element: ReportsPage,
    name: 'Reports',
    icon: FiFileText,
    showInSidebar: true,
  },
  {
    path: 'settings',
    element: SettingsPage,
    name: 'Settings',
    icon: FiSettings,
    showInSidebar: true,
  },
  {
    path: '*',
    element: NotFound,
    name: 'Not Found',
    showInSidebar: false,
  },
]

export default routesConfig
