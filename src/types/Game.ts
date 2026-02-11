/**
 * GAME TYPE
 */
export interface Game {
  id: number
  name: string
  slug: string
  image: string
  status: number
  created_at: string
}

/**
 * PRODUCT / GAMEPASS TYPE
 */
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
}
