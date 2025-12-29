import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

import { DashboardLayout } from './layout/DashboardLayout.jsx'
import { ProductsPage } from './pages/ProductsPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { CustomersPage } from './pages/CustomersPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route
          path="/analytics"
          element={
            <Suspense fallback={<div className="page">Loading Analytics…</div>}>
              <AnalyticsPage />
            </Suspense>
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
