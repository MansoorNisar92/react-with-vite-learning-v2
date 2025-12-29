export function OrdersPage() {
  return (
    <div className="page">
      <div className="pageTitle">
        <h1>Orders</h1>
        <span className="pill">
          <span className="muted">Goal:</span>
          <strong>Redux reducers + pure functions</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontWeight: 650, marginBottom: 6 }}>
          Coming next: Orders state (Redux)
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          This screen will manage order lifecycle via reducers (immutable
          updates) and demonstrate selectors/derived state.
        </div>
      </div>
    </div>
  )
}

