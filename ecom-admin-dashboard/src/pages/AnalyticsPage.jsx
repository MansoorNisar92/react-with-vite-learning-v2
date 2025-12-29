import { Suspense, lazy } from 'react'

export default function AnalyticsPage() {
  const WeeklyOrdersChart = lazy(() =>
    import('../charts/WeeklyOrdersChart.jsx').then((m) => ({
      default: m.WeeklyOrdersChart,
    })),
  )

  return (
    <div className="page">
      <div className="pageTitle">
        <h1>Analytics</h1>
        <span className="pill">
          <span className="muted">Loaded via</span>
          <strong>code-splitting</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontWeight: 650, marginBottom: 6 }}>
          Weekly orders (route + chart are lazy-loaded)
        </div>
        <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
          This page is intentionally lazy-loaded to demonstrate route-level code
          splitting. The chart module is also lazy-loaded inside the route.
        </div>

        <Suspense fallback={<div className="muted">Loading chart…</div>}>
          <WeeklyOrdersChart />
        </Suspense>
      </div>
    </div>
  )
}

