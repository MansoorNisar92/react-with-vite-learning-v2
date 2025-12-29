export function CustomersPage() {
  return (
    <div className="page">
      <div className="pageTitle">
        <h1>Customers</h1>
        <span className="pill">
          <span className="muted">Goal:</span>
          <strong>Memoization + composition</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontWeight: 650, marginBottom: 6 }}>
          Coming next: Customer list
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          We’ll use memoized row components + stable callbacks to reduce wasted
          renders.
        </div>
      </div>
    </div>
  )
}

