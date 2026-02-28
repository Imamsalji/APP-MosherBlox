/**
 * GAME TYPE
 */
export interface Game {
  id?: number
  name: string
  slug: string
  image: File | null
  image_url?: string
  description:string
  status: number | string
  created_at?: string
}

