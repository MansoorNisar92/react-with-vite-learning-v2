import { createSlice, nanoid } from '@reduxjs/toolkit'

function makeMockCustomers(count = 80) {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum']
  const customers = []
  for (let i = 0; i < count; i += 1) {
    customers.push({
      id: `c_${nanoid(8)}`,
      name: ['Asha', 'Irfan', 'Meera', 'Noah', 'Sofia', 'Ravi', 'Lina'][i % 7],
      email: `user${i + 1}@example.com`,
      tier: tiers[i % tiers.length],
      orders: 1 + (i % 12),
      lastSeenDaysAgo: i % 31,
    })
  }
  return customers
}

const seed = makeMockCustomers()

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    byId: Object.fromEntries(seed.map((c) => [c.id, c])),
    allIds: seed.map((c) => c.id),
    query: '',
    selectedId: null,
  },
  reducers: {
    setCustomersQuery(state, action) {
      state.query = action.payload
    },
    selectCustomer(state, action) {
      state.selectedId = action.payload
    },
    clearCustomerSelection(state) {
      state.selectedId = null
    },
  },
})

export const {
  setCustomersQuery,
  selectCustomer,
  clearCustomerSelection,
} = customersSlice.actions
export const customersReducer = customersSlice.reducer

export const selectCustomersState = (state) => state.customers
export const selectCustomersArray = (state) =>
  state.customers.allIds.map((id) => state.customers.byId[id])

