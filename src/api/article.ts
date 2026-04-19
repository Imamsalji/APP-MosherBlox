import api from "./axios"; // axios instance kamu
import type {
  Category,
  ArticleFormData,
  Article,
  ApiResponse,
  Tag,
  ArticleFilters,
  PaginatedResponse
} from './../types/Article'

function buildFormData(data: ArticleFormData): FormData {
  const fd = new FormData()

  fd.append('title', data.title)
  fd.append('content', data.content)
  fd.append('status', data.status)

  if (data.slug) fd.append('slug', data.slug)
  if (data.excerpt) fd.append('excerpt', data.excerpt)
  if (data.published_at) fd.append('published_at', data.published_at)
  if (data.thumbnail instanceof File) fd.append('thumbnail', data.thumbnail)

  ;(data.category_ids ?? []).forEach((id) =>
    fd.append('category_ids[]', String(id)),
  )
  ;(data.tag_ids ?? []).forEach((id) => fd.append('tag_ids[]', String(id)))

  return fd
}


// ─── API calls ────────────────────────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<ApiResponse<Category[]>>('/categories')
  return data.data
}

export async function fetchTags(): Promise<Tag[]> {
  const { data } = await api.get<ApiResponse<Tag[]>>('/tags')
  return data.data
}

export async function createArticle(
  payload: ArticleFormData,
): Promise<Article> {
  const { data } = await api.post<ApiResponse<Article>>(
    '/articles',
    buildFormData(payload),
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )
  return data.data
}

export async function updateArticle(
  id: number,
  payload: ArticleFormData,
): Promise<Article> {
  const fd = buildFormData(payload)
  fd.append('_method', 'PUT') // Laravel method spoofing
  const { data } = await api.post<ApiResponse<Article>>(
    `/articles/${id}`,
    fd,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  )
  return data.data
}

export async function fetchArticle(slug: string): Promise<Article> {
  const { data } = await api.get<ApiResponse<Article>>(`/articles/${slug}`)
  return data.data
}


// ─── Articles ─────────────────────────────────────────────────────────────────
 
export async function fetchArticles(filters: ArticleFilters = {}): Promise<PaginatedResponse<Article>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Article>>>('/articles', { params: filters })
  return data.data
}
 
 
export async function deleteArticle(id: number): Promise<void> {
  await api.delete(`/articles/${id}`)
}


// ─── Comments ────────────────────────────────────────────────────────────────
 
export async function fetchComments(slug: string, page = 1): Promise<PaginatedResponse<Comment>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Comment>>>(`/articles/${slug}/comments`, {
    params: { page },
  })
  return data.data
}
 
export async function postComment(slug: string, payload: { name?: string; content: string }): Promise<Comment> {
  const { data } = await api.post<ApiResponse<Comment>>(`/articles/${slug}/comments`, payload)
  return data.data
}
 
export async function deleteComment(id: number): Promise<void> {
  await api.delete(`/comments/${id}`)
}