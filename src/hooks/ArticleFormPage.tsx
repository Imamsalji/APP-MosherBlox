import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import {
  createArticle,
  updateArticle,
  fetchCategories,
  fetchTags,
} from "../api/article";
import type { ArticleFormData, Article } from "./../types/Article";

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const articleKeys = {
  all: ["articles"] as const,
  lists: () => [...articleKeys.all, "list"] as const,
  detail: (slug: string) => [...articleKeys.all, "detail", slug] as const,
  categories: ["categories"] as const,
  tags: ["tags"] as const,
};

// ─── Queries ─────────────────────────────────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: articleKeys.categories,
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 menit
  });
}

export function useTags() {
  return useQuery({
    queryKey: articleKeys.tags,
    queryFn: fetchTags,
    staleTime: 10 * 60 * 1000,
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateArticle(): UseMutationResult<
  Article,
  Error,
  ArticleFormData
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
    },
  });
}

export function useUpdateArticle(
  id: number,
): UseMutationResult<Article, Error, ArticleFormData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ArticleFormData) => updateArticle(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: articleKeys.detail(updated.slug),
      });
    },
  });
}
