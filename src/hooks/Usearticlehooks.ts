import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  type UseMutationResult,
  type InfiniteData,
} from '@tanstack/react-query'
import {
  createArticle,
  updateArticle,
  fetchCategories,
  fetchTags,
  fetchArticles,
  fetchArticle,
  deleteArticle,
  fetchComments,
  postComment,
  deleteComment,
} from "../api/article";
import {
  type Article,
  type ArticleFormData,
  type ArticleFilters,
  type PaginatedResponse,
} from '../types/Article'

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const queryKeys = {
  articles: {
    all: ['articles'] as const,
    lists: () => [...queryKeys.articles.all, 'list'] as const,
    list: (filters: ArticleFilters) => [...queryKeys.articles.lists(), filters] as const,
    detail: (slug: string) => [...queryKeys.articles.all, 'detail', slug] as const,
  },
  categories: ['categories'] as const,
  tags: ['tags'] as const,
  comments: (slug: string) => ['comments', slug] as const,
  me: ['me'] as const,
}

 

// ─── Article Hooks ────────────────────────────────────────────────────────────

export function useArticles(filters: ArticleFilters = {}) {
  return useQuery({
    queryKey: queryKeys.articles.list(filters),
    queryFn: () => fetchArticles(filters),
    placeholderData: (prev) => prev,
  })
}

export function useInfiniteArticles(filters: Omit<ArticleFilters, 'page'> = {}) {
  return useInfiniteQuery<
    PaginatedResponse<Article>,
    Error,
    InfiniteData<PaginatedResponse<Article>>,
    ReturnType<typeof queryKeys.articles.list>,
    number
  >({
    queryKey: queryKeys.articles.list({ ...filters }),
    queryFn: ({ pageParam }) => fetchArticles({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.meta.current_page < last.meta.last_page
        ? last.meta.current_page + 1
        : undefined,
  })
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: queryKeys.articles.detail(slug),
    queryFn: () => fetchArticle(slug),
    enabled: Boolean(slug),
  })
}

export function useCreateArticle(): UseMutationResult<Article, Error, ArticleFormData> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() }),
  })
}

export function useUpdateArticle(id: number): UseMutationResult<Article, Error, ArticleFormData> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => updateArticle(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.detail(updated.slug) })
    },
  })
}

export function useDeleteArticle(): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() }),
  })
}

// ─── Category & Tag Hooks ─────────────────────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  })
}

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags,
    queryFn: fetchTags,
    staleTime: 10 * 60 * 1000,
  })
}

// ─── Comment Hooks ────────────────────────────────────────────────────────────

export function useComments(slug: string, page = 1) {
  return useQuery({
    queryKey: [...queryKeys.comments(slug), page],
    queryFn: () => fetchComments(slug, page),
    enabled: Boolean(slug),
  })
}

export function usePostComment(slug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { name?: string; content: string }) => postComment(slug, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(slug) })
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.detail(slug) })
    },
  })
}

export function useDeleteComment(slug: string): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.comments(slug) }),
  })
}