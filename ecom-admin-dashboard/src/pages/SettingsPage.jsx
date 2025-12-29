export function SettingsPage() {
  return (
    <div className="page">
      <div className="pageTitle">
        <h1>Settings</h1>
        <span className="pill">
          <span className="muted">Goal:</span>
          <strong>Context API (theme + session)</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontWeight: 650, marginBottom: 6 }}>
          Coming next: Theme + Auth context
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          We’ll move the theme toggle into Context and add a simple session model
          (login/logout) to demonstrate provider composition.
        </div>
      </div>
    </div>
  )
}

