export function ProductsPage() {
  return (
    <div className="page">
      <div className="pageTitle">
        <h1>Products</h1>
        <span className="pill">
          <span className="muted">Goal:</span>
          <strong>10k list + virtualization</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontWeight: 650, marginBottom: 6 }}>
          Coming next: Virtualized Products List
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          This screen will cover: useEffect (fetch + abort), debounced search,
          useMemo/useCallback, React rendering + Profiler, Map-based lookup, and
          virtualization.
        </div>
      </div>
    </div>
  )
}

