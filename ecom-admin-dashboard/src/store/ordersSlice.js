import { createSlice, nanoid } from '@reduxjs/toolkit'

const STATUSES = ['pending', 'paid', 'shipped', 'cancelled']

function makeMockOrders(count = 120) {
  const now = Date.now()
  const orders = []
  for (let i = 0; i < count; i += 1) {
    const status = STATUSES[i % STATUSES.length]
    orders.push({
      id: `o_${nanoid(8)}`,
      customerName: ['Asha', 'Irfan', 'Meera', 'Noah', 'Sofia'][i % 5],
      total: Math.round((15 + (i % 50) * 3.2) * 100) / 100,
      status,
      createdAt: new Date(now - i * 3600_000).toISOString(),
    })
  }
  return orders
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    byId: Object.fromEntries(makeMockOrders().map((o) => [o.id, o])),
    allIds: [],
    filter: 'all',
  },
  reducers: {
    initOrderIds(state) {
      // Keep IDs separate to demonstrate normalized state.
      if (state.allIds.length === 0) {
        state.allIds = Object.keys(state.byId)
      }
    },
    setOrdersFilter(state, action) {
      state.filter = action.payload
    },
    advanceOrderStatus(state, action) {
      const id = action.payload
      const order = state.byId[id]
      if (!order) return

      // Reducer is deterministic (pure w.r.t input state/action):
      // same state+action => same next state.
      const idx = STATUSES.indexOf(order.status)
      const nextStatus = STATUSES[(idx + 1) % STATUSES.length]
      order.status = nextStatus
    },
    cancelOrder(state, action) {
      const id = action.payload
      const order = state.byId[id]
      if (!order) return
      order.status = 'cancelled'
    },
  },
})

export const { initOrderIds, setOrdersFilter, advanceOrderStatus, cancelOrder } =
  ordersSlice.actions
export const ordersReducer = ordersSlice.reducer

export const selectOrdersState = (state) => state.orders
export const selectOrdersArray = (state) =>
  state.orders.allIds.map((id) => state.orders.byId[id])

