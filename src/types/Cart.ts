export interface CartItem {
  id: number
  product_id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image: string
  }
}

export interface CartResponse {
  status: boolean
  message: string
}
