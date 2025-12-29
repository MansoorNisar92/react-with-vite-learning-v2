import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Modal } from '../ui/Modal.jsx'
import { JSPlayground } from '../ui/JSPlayground.jsx'

function usePageTitle() {
  const { pathname } = useLocation()
  return useMemo(() => {
    if (pathname.startsWith('/products')) return 'Products'
    if (pathname.startsWith('/orders')) return 'Orders'
    if (pathname.startsWith('/customers')) return 'Customers'
    if (pathname.startsWith('/analytics')) return 'Analytics'
    if (pathname.startsWith('/settings')) return 'Settings'
    return 'Dashboard'
  }, [pathname])
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'dark'
  document.documentElement.dataset.theme = current === 'dark' ? 'light' : 'dark'
}

export function DashboardLayout() {
  const title = usePageTitle()
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false)

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandTitle">
            <strong>E‑Commerce Admin</strong>
            <span className="muted">Interview-ready demo</span>
          </div>
          <button className="btn" onClick={() => setIsPlaygroundOpen(true)}>
            JS
          </button>
        </div>

        <nav className="nav">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `navLink ${isActive ? 'navLinkActive' : ''}`
            }
          >
            <span>Products</span>
            <span className="muted">10k</span>
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `navLink ${isActive ? 'navLinkActive' : ''}`
            }
          >
            <span>Orders</span>
            <span className="muted">Redux</span>
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `navLink ${isActive ? 'navLinkActive' : ''}`
            }
          >
            <span>Customers</span>
            <span className="muted">Memo</span>
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `navLink ${isActive ? 'navLinkActive' : ''}`
            }
          >
            <span>Analytics</span>
            <span className="muted">Lazy</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `navLink ${isActive ? 'navLinkActive' : ''}`
            }
          >
            <span>Settings</span>
            <span className="muted">Context</span>
          </NavLink>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="topbarLeft">
            <div className="topbarTitle">{title}</div>
            <span className="pill">
              <span>Focus</span>
              <strong>Rendering + State</strong>
            </span>
          </div>
          <div className="topbarRight">
            <button className="btn" onClick={toggleTheme}>
              Theme
            </button>
            <button
              className="btn btnPrimary"
              onClick={() => setIsPlaygroundOpen(true)}
            >
              JS Playground
            </button>
          </div>
        </header>

        <Outlet />
      </main>

      {isPlaygroundOpen && (
        <Modal
          title="JS Playground (interview topics)"
          onClose={() => setIsPlaygroundOpen(false)}
        >
          <JSPlayground />
        </Modal>
      )}
    </div>
  )
}

