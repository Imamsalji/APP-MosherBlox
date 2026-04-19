
// ─── Types ───────────────────────────────────────────────────────────────────

export type ArticleStatus = 'draft' | 'published'

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Comment {
  id: number
  author_name: string
  content: string
  created_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface ArticleFormData {
  title: string
  slug?: string
  content: string
  excerpt?: string
  thumbnail?: File | null
  status: ArticleStatus
  published_at?: string | null
  category_ids?: number[]
  tag_ids?: number[]
}

export interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  thumbnail_url: string | null
  status: ArticleStatus
  published_at: string | null
  created_at: string
  updated_at: string
  author: { id: number; name: string }
  categories: Category[]
  tags: Tag[]
  comments_count?: number
  views_count?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}


export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}
 
export interface ArticleFilters {
  search?: string
  category?: string
  tag?: string
  author_id?: number
  page?: number
  per_page?: number
}
 