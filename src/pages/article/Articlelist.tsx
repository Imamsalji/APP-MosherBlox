import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useArticles, useCategories } from "../../hooks/Usearticlehooks";
import type { Article, Category } from "../../types/Article";
import SkeletonCard from "./sub/SkeletonCard";
import ArticleCard from "./sub/ArticleCard";
import ArticleCardFeatured from "./sub/ArticleCardFeatured";
import ButtonDarkMode from "./sub/ButtonDarkMode";

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArticleListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );

  const currentPage = Number(searchParams.get("page") ?? 1);
  const activeCategory = searchParams.get("category") ?? "";
  const activeTag = searchParams.get("tag") ?? "";
  const activeSearch = searchParams.get("search") ?? "";

  const { data, isLoading, isError } = useArticles({
    page: currentPage,
    per_page: 9,
    category: activeCategory || undefined,
    tag: activeTag || undefined,
    search: activeSearch || undefined,
  });

  const { data: categories = [] } = useCategories();

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParam("search", searchInput);
  }

  const articles = data?.data ?? [];
  const meta = data?.meta;
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-black text-xl tracking-tight text-gray-900 dark:text-white"
          >
            MISL<span className="text-indigo-600">.</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            {/* <ButtonDarkMode /> */}
            {/* <Link
              to="/admin/articles/create"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
            >
              Tulis Artikel
            </Link> */}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* ── Category filter ── */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <button
            onClick={() => updateParam("category", "")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400"
            }`}
          >
            Semua
          </button>
          {categories.map((cat: Category) => (
            <button
              key={cat.id}
              onClick={() => updateParam("category", cat.slug)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.slug
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ── Active filters indicator ── */}
        {(activeSearch || activeTag) && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Filter aktif:
            </span>
            {activeSearch && (
              <span className="flex items-center gap-1.5 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-medium">
                "{activeSearch}"
                <button
                  onClick={() => {
                    setSearchInput("");
                    updateParam("search", "");
                  }}
                  className="hover:text-indigo-900 dark:hover:text-indigo-100"
                >
                  ×
                </button>
              </span>
            )}
            {activeTag && (
              <span className="flex items-center gap-1.5 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                #{activeTag}
                <button
                  onClick={() => updateParam("tag", "")}
                  className="hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* ── Error state ── */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">
              Gagal memuat artikel. Coba lagi.
            </p>
          </div>
        )}

        {/* ── Loading skeleton ── */}
        {isLoading && (
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-64 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Tidak ada artikel ditemukan.
            </p>
            {(activeSearch || activeCategory || activeTag) && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearchParams(new URLSearchParams());
                }}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Hapus semua filter
              </button>
            )}
          </div>
        )}

        {/* ── Articles ── */}
        {!isLoading && articles.length > 0 && (
          <div className="space-y-8">
            {/* Featured first article */}
            {featured && <ArticleCardFeatured article={featured} />}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article: any) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Pagination ── */}
        {meta && meta.last_page > 1 && (
          <div className="flex items-center justify-center gap-1 mt-12">
            <button
              disabled={currentPage <= 1}
              onClick={() => updateParam("page", String(currentPage - 1))}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: meta.last_page }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === meta.last_page ||
                  Math.abs(p - currentPage) <= 1,
              )
              .reduce<(number | string)[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1)
                  acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((item, i) =>
                item === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="w-9 text-center text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => updateParam("page", String(item))}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

            <button
              disabled={currentPage >= meta.last_page}
              onClick={() => updateParam("page", String(currentPage + 1))}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Total info */}
        {meta && (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            Menampilkan {articles.length} dari {meta.total} artikel
          </p>
        )}
      </main>
    </div>
  );
}
