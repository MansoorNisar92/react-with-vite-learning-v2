import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'

export function SettingsPage() {
  const { theme, setTheme, toggleTheme } = useTheme()
  const { session, login, logout } = useAuth()
  const [name, setName] = useState(session?.user?.name || 'Asha')

  return (
    <div className="page" style={{ display: 'grid', gap: 14 }}>
      <div className="pageTitle">
        <h1>Settings</h1>
        <span className="pill">
          <span className="muted">Using</span>
          <strong>Context API</strong>
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          alignItems: 'start',
        }}
      >
        <div className="panel" style={{ padding: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Theme</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
            Theme is stored in Context + persisted to localStorage.
          </div>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="pill">
              <span className="muted">Current</span>
              <strong>{theme}</strong>
            </span>
            <div className="row">
              <button className="btn" onClick={toggleTheme}>
                Toggle
              </button>
              <button className="btn" onClick={() => setTheme('dark')}>
                Dark
              </button>
              <button className="btn" onClick={() => setTheme('light')}>
                Light
              </button>
            </div>
          </div>
        </div>

        <div className="panel" style={{ padding: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>Session</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
            Simulates auth/session state to demonstrate Context provider
            composition.
          </div>

          {session ? (
            <div style={{ display: 'grid', gap: 10 }}>
              <div className="pill">
                <span className="muted">Logged in as</span>
                <strong>{session.user.name}</strong>
              </div>
              <div className="muted" style={{ fontSize: 12 }}>
                loginAt: {session.loginAt}
              </div>
              <button className="btn btnDanger" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <button
                className="btn btnPrimary"
                onClick={() => login(name.trim() || 'Guest')}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

