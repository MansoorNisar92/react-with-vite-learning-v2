import { memo, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCustomerSelection,
  selectCustomer,
  selectCustomersArray,
  selectCustomersState,
  setCustomersQuery,
} from '../store/customersSlice.js'

const CustomerRow = memo(function CustomerRow({ c, isSelected, onSelect }) {
  return (
    <button
      className={`btn ${isSelected ? 'btnPrimary' : ''}`}
      onClick={() => onSelect(c.id)}
      style={{
        justifyContent: 'space-between',
        width: '100%',
        textAlign: 'left',
        padding: '10px 10px',
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontWeight: 750 }}>{c.name}</strong>
        <span className="muted" style={{ fontSize: 12 }}>
          {c.email}
        </span>
      </span>
      <span className="pill">
        <span className="muted">tier</span>
        <strong>{c.tier}</strong>
      </span>
    </button>
  )
})

export function CustomersPage() {
  const dispatch = useDispatch()
  const { query, selectedId, byId } = useSelector(selectCustomersState)
  const all = useSelector(selectCustomersArray)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.tier.toLowerCase().includes(q)
      )
    })
  }, [all, query])

  const selected = selectedId ? byId[selectedId] : null

  const onSelect = useCallback(
    (id) => {
      dispatch(selectCustomer(id))
    },
    [dispatch],
  )

  return (
    <div className="page" style={{ display: 'grid', gap: 14 }}>
      <div className="pageTitle">
        <h1>Customers</h1>
        <span className="pill">
          <span className="muted">Visible</span>
          <strong>{filtered.length}</strong>
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '420px 1fr',
          gap: 14,
          alignItems: 'start',
          minWidth: 0,
        }}
      >
        <div className="panel" style={{ padding: 12, display: 'grid', gap: 10 }}>
          <input
            className="input"
            value={query}
            onChange={(e) => dispatch(setCustomersQuery(e.target.value))}
            placeholder="Search customers…"
          />
          <div
            className="muted"
            style={{ fontSize: 12, marginTop: -4, display: 'flex', gap: 10 }}
          >
            <span>Memoized rows + stable callbacks</span>
            <span>Composition: CustomerRow + Details panel</span>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            {filtered.slice(0, 30).map((c) => (
              <CustomerRow
                key={c.id}
                c={c}
                isSelected={c.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
          {filtered.length > 30 ? (
            <div className="muted" style={{ fontSize: 12 }}>
              Showing first 30 results.
            </div>
          ) : null}
        </div>

        <div className="panel" style={{ padding: 12 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 750 }}>Details</div>
            <button className="btn" onClick={() => dispatch(clearCustomerSelection())}>
              Clear
            </button>
          </div>

          {!selected ? (
            <div className="muted" style={{ fontSize: 13, marginTop: 10 }}>
              Pick a customer to see details. This panel demonstrates component
              composition and memoization patterns used in real admin UIs.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{selected.name}</div>
              <div className="muted">{selected.email}</div>

              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Tier</span>
                <strong>{selected.tier}</strong>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Orders</span>
                <strong>{selected.orders}</strong>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Last seen</span>
                <strong>{selected.lastSeenDaysAgo}d ago</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

