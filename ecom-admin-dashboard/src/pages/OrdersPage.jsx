import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  advanceOrderStatus,
  cancelOrder,
  initOrderIds,
  selectOrdersArray,
  selectOrdersState,
  setOrdersFilter,
} from '../store/ordersSlice.js'

function money(n) {
  return `$${n.toFixed(2)}`
}

function StatusBadge({ status }) {
  const bg =
    status === 'paid'
      ? 'color-mix(in oklab, var(--brand2), transparent 82%)'
      : status === 'shipped'
        ? 'color-mix(in oklab, var(--brand), transparent 84%)'
        : status === 'cancelled'
          ? 'color-mix(in oklab, var(--danger), transparent 84%)'
          : 'color-mix(in oklab, var(--panel2), transparent 10%)'
  return (
    <span className="pill" style={{ background: bg }}>
      <span className="muted">status</span>
      <strong>{status}</strong>
    </span>
  )
}

export function OrdersPage() {
  const dispatch = useDispatch()
  const { filter } = useSelector(selectOrdersState)
  const all = useSelector(selectOrdersArray)

  useEffect(() => {
    dispatch(initOrderIds())
  }, [dispatch])

  const filtered = useMemo(() => {
    if (filter === 'all') return all
    return all.filter((o) => o.status === filter)
  }, [all, filter])

  const totals = useMemo(() => {
    let revenue = 0
    for (const o of filtered) {
      if (o.status !== 'cancelled') revenue += o.total
    }
    return { revenue }
  }, [filtered])

  return (
    <div className="page" style={{ display: 'grid', gap: 14 }}>
      <div className="pageTitle">
        <h1>Orders</h1>
        <span className="pill">
          <span className="muted">Revenue</span>
          <strong>{money(totals.revenue)}</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row" style={{ gap: 8 }}>
            <span className="muted">Filter</span>
            <select
              className="input"
              style={{ width: 220 }}
              value={filter}
              onChange={(e) => dispatch(setOrdersFilter(e.target.value))}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <span className="pill">
            <span className="muted">Count</span>
            <strong>{filtered.length}</strong>
          </span>
        </div>
        <div className="muted" style={{ fontSize: 12, marginTop: 10 }}>
          Reducers here are deterministic and use immutable updates (via RTK
          Immer). Try “Advance status” and watch state changes.
        </div>
      </div>

      <div className="panel" style={{ overflow: 'hidden' }}>
        <div
          style={{
            padding: '10px 10px',
            borderBottom: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: '160px 1fr 140px 160px 260px',
            gap: 10,
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          <div>Order</div>
          <div>Customer</div>
          <div>Total</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {filtered.map((o) => (
          <div
            key={o.id}
            style={{
              padding: '10px 10px',
              borderBottom: '1px solid var(--border)',
              display: 'grid',
              gridTemplateColumns: '160px 1fr 140px 160px 260px',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <div className="muted" style={{ fontSize: 12 }}>
              {o.id}
            </div>
            <div style={{ fontWeight: 650 }}>{o.customerName}</div>
            <div style={{ fontVariantNumeric: 'tabular-nums' }}>
              {money(o.total)}
            </div>
            <StatusBadge status={o.status} />
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button
                className="btn"
                onClick={() => dispatch(advanceOrderStatus(o.id))}
              >
                Advance status
              </button>
              <button
                className="btn btnDanger"
                onClick={() => dispatch(cancelOrder(o.id))}
                disabled={o.status === 'cancelled'}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

