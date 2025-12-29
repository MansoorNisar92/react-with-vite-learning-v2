import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function AnalyticsPage() {
  const data = useMemo(
    () => [
      { name: 'Mon', orders: 18 },
      { name: 'Tue', orders: 22 },
      { name: 'Wed', orders: 14 },
      { name: 'Thu', orders: 28 },
      { name: 'Fri', orders: 36 },
      { name: 'Sat', orders: 19 },
      { name: 'Sun', orders: 12 },
    ],
    [],
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
          Weekly orders (lazy-loaded route)
        </div>
        <div className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
          This page is intentionally lazy-loaded to demonstrate route-level code
          splitting.
        </div>

        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.55)" />
              <YAxis stroke="rgba(255,255,255,0.55)" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(10, 16, 32, 0.95)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                }}
              />
              <Bar dataKey="orders" fill="rgba(124,124,255,0.85)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

