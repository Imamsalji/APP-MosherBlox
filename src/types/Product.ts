export interface Product {
  id: number
  game_id: number

  name: string
  price: number
  specification: string

  image: string
  stock: number
  status: number

  created_at: string
  updated_at?: string
}
