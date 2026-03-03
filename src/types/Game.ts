/**
 * GAME TYPE
 */
export interface Game {
  id?: number
  name: string
  slug?: string | null
  image: File | null
  image_url?: string
  description:string
  status: number | string
  created_at?: string
}

export interface GameList {
  id: number
  name: string
  slug: string
  image: File | null
  image_url: string
  description:string
  status: number | string
  created_at: string
}

