import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FormField } from "../../component/articles/FormField";
import { ThumbnailUpload } from "../../component/articles/ThumbnailUpload";
import { CategorySelect } from "../../component/articles/CategorySelect";
import { TagInput } from "../../component/articles/TagInput";
import {
  useCreateArticle,
  useUpdateArticle,
  useCategories,
  useTags,
  articleKeys,
} from "../../hooks/ArticleFormPage";
import { fetchArticle } from "../../api/article";

// ─── Schema ───────────────────────────────────────────────────────────────────

const articleSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter").max(255),
  slug: z
    .string()
    .regex(/^[a-z0-9-]*$/, "Slug hanya boleh huruf kecil, angka, dan tanda -")
    .max(255)
    .optional()
    .or(z.literal("")),
  content: z.string().min(10, "Konten terlalu pendek"),
  excerpt: z
    .string()
    .max(500, "Ringkasan maks. 500 karakter")
    .optional()
    .or(z.literal("")),
  thumbnail: z.instanceof(File).nullable().optional(),
  status: z.enum(["draft", "published"]),
  published_at: z.string().optional().or(z.literal("")),
  category_ids: z.array(z.number()).optional(),
  tag_ids: z.array(z.number()).optional(),
});

type FormValues = z.infer<typeof articleSchema>;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArticleFormPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();
  const isEdit = Boolean(slug);

  // ── Remote data
  const { data: categories = [], isLoading: loadingCats } = useCategories();
  const { data: tags = [], isLoading: loadingTags } = useTags();

  const { data: existingArticle, isLoading: loadingArticle } = useQuery({
    queryKey: articleKeys.detail(slug!),
    queryFn: () => fetchArticle(slug!),
    enabled: isEdit,
  });

  // ── Form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      thumbnail: null,
      status: "draft",
      published_at: "",
      category_ids: [],
      tag_ids: [],
    },
  });

  // ── Pre-fill on edit
  useEffect(() => {
    if (existingArticle) {
      setValue("title", existingArticle.title);
      setValue("slug", existingArticle.slug);
      setValue("content", existingArticle.content);
      setValue("excerpt", existingArticle.excerpt ?? "");
      setValue("status", existingArticle.status);
      setValue(
        "published_at",
        existingArticle.published_at?.slice(0, 16) ?? "",
      );
      setValue(
        "category_ids",
        existingArticle.categories.map((c) => c.id),
      );
      setValue(
        "tag_ids",
        existingArticle.tags.map((t) => t.id),
      );
    }
  }, [existingArticle, setValue]);

  // ── Auto-generate slug from title (create mode only)
  const titleValue = watch("title");
  useEffect(() => {
    if (!isEdit) {
      const generated = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      setValue("slug", generated, { shouldValidate: false });
    }
  }, [titleValue, isEdit, setValue]);

  // ── Mutations
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle(existingArticle?.id ?? 0);
  const mutation = isEdit ? updateMutation : createMutation;

  // ── Submit
  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        ...values,
        thumbnail: values.thumbnail ?? null,
        category_ids: values.category_ids ?? [],
        tag_ids: values.tag_ids ?? [],
      };

      await mutation.mutateAsync(payload);
      navigate("/admin/articles");
    } catch (err: unknown) {
      // Error ditangani di mutation (bisa tambah toast di sini)
      console.error(err);
    }
  }

  // ── Loading state
  if (isEdit && loadingArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Memuat artikel...</span>
        </div>
      </div>
    );
  }

  const statusValue = watch("status");
  const serverError = mutation.error?.message;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                {isEdit ? "Edit Artikel" : "Tambah Artikel Baru"}
              </h1>
              {isEdit && existingArticle && (
                <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                  {existingArticle.title}
                </p>
              )}
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex items-center gap-2">
            {mutation.isError && (
              <p className="text-xs text-red-500 max-w-[200px] text-right">
                {serverError}
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                setValue("status", "draft");
                handleSubmit(onSubmit)();
              }}
              disabled={isSubmitting || mutation.isPending}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Simpan Draft
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("status", "published");
                handleSubmit(onSubmit)();
              }}
              disabled={isSubmitting || mutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {mutation.isPending && (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isEdit ? "Simpan Perubahan" : "Publikasikan"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex gap-8 items-start">
            {/* ── Left: main content ── */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Title */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <FormField
                  label="Judul Artikel"
                  required
                  error={errors.title?.message}
                >
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Tulis judul artikel yang menarik..."
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      errors.title ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                </FormField>

                <div className="mt-4">
                  <FormField
                    label="Slug URL"
                    hint="Dibuat otomatis dari judul, bisa diedit manual."
                    error={errors.slug?.message}
                  >
                    <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 overflow-hidden">
                      <span className="inline-flex items-center px-3 bg-gray-50 border-r border-gray-300 text-gray-400 text-xs whitespace-nowrap">
                        /articles/
                      </span>
                      <input
                        {...register("slug")}
                        type="text"
                        placeholder="artikel-saya"
                        className="flex-1 px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none"
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <FormField
                  label="Konten"
                  required
                  error={errors.content?.message}
                >
                  <textarea
                    {...register("content")}
                    rows={16}
                    placeholder="Tulis konten artikel di sini..."
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono leading-relaxed resize-y transition-colors ${
                      errors.content ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                </FormField>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <FormField
                  label="Ringkasan (Excerpt)"
                  hint="Tampil di listing artikel. Maks. 500 karakter."
                  error={errors.excerpt?.message}
                >
                  <textarea
                    {...register("excerpt")}
                    rows={3}
                    placeholder="Tulis ringkasan singkat artikel..."
                    className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors ${
                      errors.excerpt ? "border-red-400" : "border-gray-300"
                    }`}
                  />
                  <p className="text-right text-xs text-gray-400">
                    {watch("excerpt")?.length ?? 0} / 500
                  </p>
                </FormField>
              </div>
            </div>

            {/* ── Right: sidebar ── */}
            <div className="w-80 flex-shrink-0 flex flex-col gap-4">
              {/* Status card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                  Publikasi
                </h2>

                <FormField label="Status" error={errors.status?.message}>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <div className="flex gap-2">
                        {(["draft", "published"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => field.onChange(s)}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                              field.value === s
                                ? s === "published"
                                  ? "bg-green-600 border-green-600 text-white"
                                  : "bg-gray-700 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                            }`}
                          >
                            {s === "draft" ? "Draft" : "Published"}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </FormField>

                {statusValue === "published" && (
                  <div className="mt-4">
                    <FormField
                      label="Tanggal Publikasi"
                      hint="Kosongkan untuk langsung publish sekarang."
                      error={errors.published_at?.message}
                    >
                      <input
                        {...register("published_at")}
                        type="datetime-local"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {/* Thumbnail card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                  Thumbnail
                </h2>
                <Controller
                  control={control}
                  name="thumbnail"
                  render={({ field }) => (
                    <ThumbnailUpload
                      value={field.value ?? null}
                      previewUrl={existingArticle?.thumbnail_url}
                      onChange={field.onChange}
                      error={errors.thumbnail?.message as string | undefined}
                    />
                  )}
                />
              </div>

              {/* Categories card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                  Kategori
                </h2>
                {loadingCats ? (
                  <p className="text-xs text-gray-400">Memuat kategori...</p>
                ) : (
                  <Controller
                    control={control}
                    name="category_ids"
                    render={({ field }) => (
                      <CategorySelect
                        categories={categories}
                        selectedIds={field.value ?? []}
                        onChange={field.onChange}
                        error={
                          errors.category_ids?.message as string | undefined
                        }
                      />
                    )}
                  />
                )}
              </div>

              {/* Tags card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">
                  Tag
                </h2>
                {loadingTags ? (
                  <p className="text-xs text-gray-400">Memuat tag...</p>
                ) : (
                  <Controller
                    control={control}
                    name="tag_ids"
                    render={({ field }) => (
                      <TagInput
                        availableTags={tags}
                        selectedIds={field.value ?? []}
                        onChange={field.onChange}
                        error={errors.tag_ids?.message as string | undefined}
                      />
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
