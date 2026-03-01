import type { Game } from './Game'
export interface Product {
  id?: number
  game_id: number 

  name: string
  price: number
  specification: string

  image: File | null
  image_url?: string
  stock: number
  status: number

  created_at?: string
  updated_at?: string
  game?:Game
}

export interface ProductList {
  id: number
  game_id: number

  name: string
  price: number
  specification: string

  image: string
  image_url: string
  stock: number
  status: number

  created_at: string
  updated_at?: string
  game:Game
}
