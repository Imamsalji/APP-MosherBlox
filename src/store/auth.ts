import { create } from 'zustand'

/**
 * =========================
 * TYPE
 * =========================
 */
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean

  setAuth: (token: string, user: User) => void
  logout: () => void
}

/**
 * =========================
 * STORE
 * =========================
 */
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  isAuthenticated: !!localStorage.getItem('token'),

  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    set({
      token,
      user,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log('berhasil logout');
    
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    })
  },
}))
