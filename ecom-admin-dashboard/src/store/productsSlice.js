import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mockFetchProducts } from '../utils/mockApi.js'

/**
 * Pure helper function (easy to unit-test).
 * Demonstrates: pure functions + composition with reducers.
 */
export function normalizeProducts(products) {
  const byId = {}
  const allIds = []
  for (const p of products) {
    byId[p.id] = p
    allIds.push(p.id)
  }
  return { byId, allIds }
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  /**
   * Demonstrates: async JS + aborting async work.
   * RTK will pass an AbortSignal you can forward to fetch.
   */
  async ({ query }, { signal }) => {
    const products = await mockFetchProducts({ query, signal })
    return { products }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    query: '',
    byId: {},
    allIds: [],
    selectedId: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    selectProduct(state, action) {
      state.selectedId = action.payload
    },
    clearSelection(state) {
      state.selectedId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { byId, allIds } = normalizeProducts(action.payload.products)
        state.byId = byId
        state.allIds = allIds
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // Abort is expected; avoid showing it as an error.
        if (action.error?.name === 'AbortError') {
          state.status = 'idle'
          return
        }
        state.status = 'failed'
        state.error = action.error?.message || 'Failed to load products'
      })
  },
})

export const { setQuery, selectProduct, clearSelection } = productsSlice.actions
export const productsReducer = productsSlice.reducer

// Selectors (kept pure)
export const selectProductsState = (state) => state.products
export const selectProductsArray = (state) =>
  state.products.allIds.map((id) => state.products.byId[id])

