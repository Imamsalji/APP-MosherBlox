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

  const { data: categories = [], isLoading: loadingCats } = useCategories();
  const { data: tags = [], isLoading: loadingTags } = useTags();

  const { data: existingArticle, isLoading: loadingArticle } = useQuery({
    queryKey: articleKeys.detail(slug!),
    queryFn: () => fetchArticle(slug!),
    enabled: isEdit,
  });

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

  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle(existingArticle?.id ?? 0);
  const mutation = isEdit ? updateMutation : createMutation;

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
      console.error(err);
    }
  }

  if (isEdit && loadingArticle) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <span className="text-sm text-gray-500 tracking-wide">
            Memuat artikel...
          </span>
        </div>
      </div>
    );
  }

  const statusValue = watch("status");
  const serverError = mutation.error?.message;
  const excerptLen = watch("excerpt")?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#1a162d] text-gray-100">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-[#1a162d]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] transition-all"
            >
              <svg
                className="w-4 h-4"
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

            <div className="w-px h-5 bg-white/10" />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span className="text-sm font-semibold text-gray-100 truncate">
                  {isEdit ? "Edit Artikel" : "Artikel Baru"}
                </span>
              </div>
              {isEdit && existingArticle && (
                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[280px]">
                  {existingArticle.title}
                </p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {mutation.isError && (
              <p className="text-xs text-red-400 max-w-[180px] text-right leading-tight">
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
              className="px-4 py-2 text-xs font-medium text-gray-300 bg-white/[0.06] border border-white/[0.08] rounded-lg hover:bg-white/[0.1] hover:text-white disabled:opacity-40 transition-all"
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
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-40 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {mutation.isPending ? (
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {isEdit ? "Simpan Perubahan" : "Publikasikan"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex gap-6 items-start">
            {/* ── Left column ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              {/* Title + Slug */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-6">
                <FormField
                  label="Judul Artikel"
                  required
                  error={errors.title?.message}
                >
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="Tulis judul artikel yang menarik..."
                    className={`w-full rounded-xl border bg-[#0f1117] px-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all ${
                      errors.title
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/[0.07] hover:border-white/[0.12]"
                    }`}
                  />
                </FormField>

                <div className="mt-5">
                  <FormField
                    label="Slug URL"
                    hint="Dibuat otomatis dari judul, bisa diedit manual."
                    error={errors.slug?.message}
                  >
                    <div
                      className={`flex rounded-xl border overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all ${
                        errors.slug
                          ? "border-red-500/50"
                          : "border-white/[0.07] hover:border-white/[0.12]"
                      }`}
                    >
                      <span className="inline-flex items-center px-3 bg-white/[0.04] border-r border-white/[0.07] text-gray-500 text-xs whitespace-nowrap font-mono">
                        /articles/
                      </span>
                      <input
                        {...register("slug")}
                        type="text"
                        placeholder="artikel-saya"
                        className="flex-1 px-3 py-2.5 text-sm text-gray-300 bg-[#0f1117] focus:outline-none font-mono"
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Content */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-6">
                <FormField
                  label="Konten"
                  required
                  error={errors.content?.message}
                >
                  <textarea
                    {...register("content")}
                    rows={18}
                    placeholder="Tulis konten artikel di sini..."
                    className={`w-full rounded-xl border bg-[#0f1117] px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 font-mono leading-relaxed resize-y transition-all ${
                      errors.content
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/[0.07] hover:border-white/[0.12]"
                    }`}
                  />
                </FormField>
              </div>

              {/* Excerpt */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-6">
                <FormField
                  label="Ringkasan (Excerpt)"
                  hint="Tampil di listing artikel."
                  error={errors.excerpt?.message}
                >
                  <textarea
                    {...register("excerpt")}
                    rows={3}
                    placeholder="Tulis ringkasan singkat artikel..."
                    className={`w-full rounded-xl border bg-[#0f1117] px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition-all ${
                      errors.excerpt
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/[0.07] hover:border-white/[0.12]"
                    }`}
                  />
                  <div className="flex justify-end mt-1.5">
                    <span
                      className={`text-xs tabular-nums ${
                        excerptLen > 450 ? "text-amber-400" : "text-gray-600"
                      }`}
                    >
                      {excerptLen} / 500
                    </span>
                  </div>
                </FormField>
              </div>
            </div>

            {/* ── Right sidebar ── */}
            <div className="w-72 flex-shrink-0 flex flex-col gap-4">
              {/* Publikasi */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
                    Publikasi
                  </h2>
                </div>

                <FormField label="Status" error={errors.status?.message}>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-2 p-1 bg-[#0f1117] rounded-xl border border-white/[0.06]">
                        {(["draft", "published"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => field.onChange(s)}
                            className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                              field.value === s
                                ? s === "published"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-white/[0.08] text-gray-200 border border-white/[0.1]"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          >
                            <span className="flex items-center justify-center gap-1.5">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  field.value === s
                                    ? s === "published"
                                      ? "bg-emerald-400"
                                      : "bg-gray-400"
                                    : "bg-gray-700"
                                }`}
                              />
                              {s === "draft" ? "Draft" : "Published"}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </FormField>

                {statusValue === "published" && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <FormField
                      label="Jadwal Publikasi"
                      hint="Kosongkan untuk publish sekarang."
                      error={errors.published_at?.message}
                    >
                      <input
                        {...register("published_at")}
                        type="datetime-local"
                        className="w-full rounded-xl border border-white/[0.07] bg-[#0f1117] px-3 py-2.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all hover:border-white/[0.12] [color-scheme:dark]"
                      />
                    </FormField>
                  </div>
                )}
              </div>

              {/* Thumbnail */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
                    Thumbnail
                  </h2>
                </div>
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

              {/* Kategori */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
                    Kategori
                  </h2>
                </div>
                {loadingCats ? (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-3 h-3 border border-gray-700 border-t-gray-500 rounded-full animate-spin" />
                    Memuat...
                  </div>
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

              {/* Tags */}
              <div className="bg-[#161b27] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                  <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
                    Tag
                  </h2>
                </div>
                {loadingTags ? (
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-3 h-3 border border-gray-700 border-t-gray-500 rounded-full animate-spin" />
                    Memuat...
                  </div>
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
