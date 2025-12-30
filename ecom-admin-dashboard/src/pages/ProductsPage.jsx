import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { List } from 'react-window'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectProduct,
  selectProductsArray,
  selectProductsState,
  setQuery,
} from '../store/productsSlice.js'
import { RenderProfiler } from '../ui/RenderProfiler.jsx'

function formatMoney(n) {
  return `$${n.toFixed(2)}`
}

const ProductRow = memo(function ProductRow({ ariaAttributes, index, style, ...data }) {
  const p = data.items[index]
  const selected = data.selectedId === p.id

  return (
    <div
      {...ariaAttributes}
      style={{
        ...style,
        padding: '8px 10px',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '120px 1fr 140px 120px 90px',
        gap: 10,
        alignItems: 'center',
        background: selected
          ? 'color-mix(in oklab, var(--brand), transparent 86%)'
          : 'transparent',
        cursor: 'pointer',
      }}
      onClick={() => data.onSelect(p.id)}
      aria-selected={selected}
    >
      <div className="muted" style={{ fontSize: 12 }}>
        {p.id}
      </div>
      <div style={{ fontWeight: 650 }}>{p.name}</div>
      <div className="muted">{p.category}</div>
      <div style={{ fontVariantNumeric: 'tabular-nums' }}>
        {formatMoney(p.price)}
      </div>
      <div className="muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {p.stock}
      </div>
    </div>
  )
})

export function ProductsPage() {
  const dispatch = useDispatch()
  const { status, error, query, selectedId, byId } = useSelector(selectProductsState)
  const items = useSelector(selectProductsArray)

  // Demonstrates: controlled input + debounced side-effect.
  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setQuery(draftQuery))
    }, 250)
    return () => clearTimeout(t)
  }, [dispatch, draftQuery])

  // Demonstrates: useEffect + async + AbortController via RTK thunk signal
  useEffect(() => {
    const promise = dispatch(fetchProducts({ query }))
    return () => {
      promise.abort()
    }
  }, [dispatch, query])

  // Demonstrates: HashMap via Map (derived) for O(1) lookup in UI code.
  const productsByIdMap = useMemo(() => new Map(Object.entries(byId)), [byId])
  const selected = selectedId ? productsByIdMap.get(selectedId) : null

  const onSelect = useCallback(
    (id) => {
      dispatch(selectProduct(id))
    },
    [dispatch],
  )

  const listData = useMemo(
    () => ({ items, selectedId, onSelect }),
    [items, selectedId, onSelect],
  )

  const stats = useMemo(() => {
    let totalStock = 0
    let avgPrice = 0
    for (const p of items) {
      totalStock += p.stock
      avgPrice += p.price
    }
    avgPrice = items.length ? avgPrice / items.length : 0
    return { totalStock, avgPrice }
  }, [items])

  return (
    <div className="page" style={{ display: 'grid', gap: 14 }}>
      <div className="pageTitle">
        <h1>Products</h1>
        <span className="pill">
          <span className="muted">Virtualized:</span>
          <strong>{items.length.toLocaleString()}</strong>
        </span>
      </div>

      <div className="panel" style={{ padding: 12 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div style={{ minWidth: 320, width: 'min(520px, 100%)' }}>
            <input
              className="input"
              value={draftQuery}
              onChange={(e) => setDraftQuery(e.target.value)}
              placeholder="Search by id, name, or category (debounced)…"
            />
          </div>
          <div className="row" style={{ gap: 8 }}>
            <span className="pill">
              <span className="muted">Avg price</span>
              <strong>{formatMoney(stats.avgPrice)}</strong>
            </span>
            <span className="pill">
              <span className="muted">Stock</span>
              <strong>{stats.totalStock.toLocaleString()}</strong>
            </span>
          </div>
        </div>
        <div
          className="muted"
          style={{ fontSize: 12, marginTop: 10, display: 'flex', gap: 10 }}
        >
          <span>Status: {status}</span>
          {error ? <span style={{ color: 'var(--danger)' }}>{error}</span> : null}
          <span>Tip: open React DevTools Profiler and record a scroll.</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: 14,
          alignItems: 'start',
          minWidth: 0,
        }}
      >
        <RenderProfiler id="ProductsList">
          <div className="panel" style={{ overflow: 'hidden' }}>
            <div
              style={{
                padding: '10px 10px',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: '120px 1fr 140px 120px 90px',
                gap: 10,
                fontSize: 12,
                color: 'var(--muted)',
              }}
              role="row"
            >
              <div>ID</div>
              <div>Name</div>
              <div>Category</div>
              <div>Price</div>
              <div>Stock</div>
            </div>

            <List
              rowCount={items.length}
              rowHeight={44}
              rowComponent={ProductRow}
              rowProps={listData}
              style={{ height: 520 }}
            >
              {null}
            </List>
          </div>
        </RenderProfiler>

        <div className="panel" style={{ padding: 12 }}>
          <div style={{ fontWeight: 750, marginBottom: 8 }}>Details</div>
          {!selected ? (
            <div className="muted" style={{ fontSize: 13 }}>
              Select a product to see details. This panel uses a Map lookup for
              O(1) access by id.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 8, fontSize: 13 }}>
              <div className="muted">{selected.id}</div>
              <div style={{ fontWeight: 750, fontSize: 14 }}>{selected.name}</div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Category</span>
                <strong>{selected.category}</strong>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Price</span>
                <strong>{formatMoney(selected.price)}</strong>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Stock</span>
                <strong>{selected.stock}</strong>
              </div>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <span className="muted">Rating</span>
                <strong>{selected.rating}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

