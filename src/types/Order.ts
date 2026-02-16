import type { Product } from './Product'

/**
 * =========================
 * ORDER STATUS
 * =========================
 */

export type OrderStatus =
  | 'pending'
  | 'waiting_payment'
  | 'paid'
  | 'success'
  | 'rejected'


/**
 * =========================
 * ORDER ITEM
 * =========================
 */

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  price: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface GetOrders {
  id: string;
  user_id: number;
  admin_note: string | null;
  payment_proof: string | null;
  status: "pending" | "paid" | "cancelled" | string;
  total_price: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

/**
 * =========================
 * ORDER DETAIL
 * =========================
 */


/**
 * =========================
 * CHECKOUT PAYLOAD
 * =========================
 */

export interface CheckoutPayload {
  target_id: string
  note?: string
}


/**
 * =========================
 * CHECKOUT RESPONSE
 * =========================
 */

export interface CheckoutResponse {
  status: boolean
  message: string
  data: {
    order_id: number
    invoice: string
  }
}


/**
 * =========================
 * UPLOAD PAYMENT RESPONSE
 * =========================
 */

export interface UploadPaymentResponse {
  status: boolean
  message: string
}
