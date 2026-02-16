import axios from './axios'
import type {
  Order,
  OrderDetail,
  CheckoutPayload,
  CheckoutResponse,
  UploadPaymentResponse,
} from './../types/Order'

/**
 * =========================
 * ORDER / CHECKOUT API
 * =========================
 */

/**
 * Checkout dari cart → buat order
 * POST /checkout
 */
export const checkoutItem = async (
  payload?: CheckoutPayload
): Promise<CheckoutResponse> => {
  const response = await axios.post('/checkout', payload)
  return response.data
}

/**
 * Upload bukti pembayaran
 * POST /orders/{id}/upload-payment
 */
export const uploadPaymentProof = async (
  orderId: number,
  file: File
): Promise<UploadPaymentResponse> => {
  const formData = new FormData()
  formData.append('payment_proof', file)

  const response = await axios.post(
    `/orders/${orderId}/upload-payment`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

/**
 * Ambil riwayat order user
 * GET /orders
 */
export const getMyOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/orders')
  return response.data.data
}

/**
 * Ambil detail order
 * GET /orders/{id}
 */
export const getOrderDetail = async (
  orderId: number
): Promise<OrderDetail> => {
  const response = await axios.get(`/orders/${orderId}`)
  return response.data.data
}
