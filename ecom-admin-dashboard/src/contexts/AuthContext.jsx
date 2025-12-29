/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = window.localStorage.getItem('session')
    return raw ? JSON.parse(raw) : null
  })

  const login = useCallback((name) => {
    const next = { user: { name }, loginAt: new Date().toISOString() }
    setSession(next)
    window.localStorage.setItem('session', JSON.stringify(next))
  }, [])

  const logout = useCallback(() => {
    setSession(null)
    window.localStorage.removeItem('session')
  }, [])

  const value = useMemo(
    () => ({ session, login, logout }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

