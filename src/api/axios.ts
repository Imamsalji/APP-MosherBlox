import axios, { AxiosError } from 'axios'
import { useAuthStore } from '../store/auth'

/**
 * =========================
 * AXIOS INSTANCE
 * =========================
 */

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  baseURL: 'http://127.0.0.1:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})



/**
 * =========================
 * REQUEST INTERCEPTOR
 * =========================
 * - Attach Bearer Token
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * =========================
 * RESPONSE INTERCEPTOR
 * =========================
 * - Handle 401 / 403
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status

    if (status === 401 || status === 403) {
      const { logout } = useAuthStore.getState()
      logout()

      // optional: redirect login
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
