import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page">
      <div className="panel" style={{ padding: 16 }}>
        <div style={{ fontWeight: 750, fontSize: 18, marginBottom: 8 }}>
          404
        </div>
        <div className="muted" style={{ marginBottom: 12 }}>
          That route doesn’t exist.
        </div>
        <Link className="btn btnPrimary" to="/products">
          Go to Products
        </Link>
      </div>
    </div>
  )
}

