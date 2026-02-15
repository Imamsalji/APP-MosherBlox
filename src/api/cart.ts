import axios from './axios'
import type { CartItem, CartResponse } from '../types/Cart'

/**
 * =========================
 * CART API
 * =========================
 */

/**
 * Ambil isi cart user
 * GET /cart
 */
export const getCart = async () => {
  const response = await axios.get('/cart')
  return response.data.data
}

/**
 * Tambah product ke cart
 * POST /cart
 */
export const addToCart = async (
  id: number,
  qty: number = 1
): Promise<CartResponse> => {
  const response = await axios.post('/cart/add', {
    product_id: id,
    qty,
  })

  return response.data
}

/**
 * Update quantity cart
 * PUT /cart/{id}
 */
export const updateCartItem = async (
  id: number,
  // qty: number
  kondisi: string
): Promise<CartResponse> => {
  const response = await axios.put(`/cart/${id}`, {
    kondisi
  })

  return response.data
}

/**
 * Hapus item dari cart
 * DELETE /cart/{id}
 */
export const removeCartItem = async (
  cartId: number
): Promise<CartResponse> => {
  const response = await axios.delete(`/cart/${cartId}`)
  return response.data
}

/**
 * Kosongkan cart
 * DELETE /cart/clear
 */
export const clearCart = async (): Promise<CartResponse> => {
  const response = await axios.delete('/cart/clear')
  return response.data
}
