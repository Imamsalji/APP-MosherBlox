import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useArticle,
  useComments,
  usePostComment,
} from "../../hooks/Usearticlehooks";
import type { Comment } from "../../types/Article";
import { useAuthStore } from "../../store/auth";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return formatDate(iso);
}

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(" ").length / 200));
}

// ─── Comment Form ─────────────────────────────────────────────────────────────
const getUser = useAuthStore.getState().user;

function CommentForm({ slug }: { slug: string }) {
  const { data: me } = useAuthStore.getState().user
    ? useAuthStore((state) => ({ data: state.user }))
    : { data: null };
  const { mutate, isPending, isSuccess, reset } = usePostComment(slug);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (content.trim().length < 3) {
      setError("Komentar terlalu pendek.");
      return;
    }
    if (!me && !name.trim()) {
      setError("Nama harus diisi.");
      return;
    }
    setError("");
    mutate(
      { name: me ? undefined : name.trim(), content: content.trim() },
      {
        onSuccess: () => {
          setContent("");
          setName("");
          setTimeout(reset, 3000);
        },
      },
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <svg
          className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-sm text-green-700 dark:text-green-300 font-medium">
          Komentar berhasil dikirim!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!me && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kamu *"
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Tulis komentar..."
        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex items-center justify-between">
        {me ? (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Berkomentar sebagai{" "}
            <strong className="text-gray-600 dark:text-gray-300">
              {me.name}
            </strong>
          </span>
        ) : (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Komentar sebagai tamu
          </span>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors flex items-center gap-2"
        >
          {isPending && (
            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Kirim
        </button>
      </div>
    </form>
  );
}

// ─── Comment Item ─────────────────────────────────────────────────────────────

function CommentItem({ comment }: { comment: Comment }) {
  const initials = comment.author_name.slice(0, 2).toUpperCase();

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-xs font-semibold text-purple-700 dark:text-purple-300">
        {initials}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {comment.author_name}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {formatDateRelative(comment.created_at)}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [commentPage, setCommentPage] = useState(1);

  const { data: article, isLoading, isError } = useArticle(slug ?? "");
  const { data: commentsData, isLoading: loadingComments } = useComments(
    slug ?? "",
    commentPage,
  );

  // ── Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-6 animate-pulse">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 bg-gray-100 dark:bg-gray-700 rounded ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error / 404
  if (isError || !article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-6xl font-black text-gray-200 dark:text-gray-700">
            404
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Artikel tidak ditemukan.
          </p>
          <button
            onClick={() => navigate("/articles")}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            ← Kembali ke daftar artikel
          </button>
        </div>
      </div>
    );
  }

  const comments = commentsData?.data ?? [];
  const commentsMeta = commentsData?.meta;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-black text-xl tracking-tight text-gray-900 dark:text-white"
          >
            ink<span className="text-indigo-600">.</span>
          </Link>
          <Link
            to="/articles"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
            Semua Artikel
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* ── Categories ── */}
        <div className="flex flex-wrap gap-2 mb-5">
          {article.categories.map((c) => (
            <Link
              key={c.id}
              to={`/articles?category=${c.slug}`}
              className="text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 px-2.5 py-1 rounded-full transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* ── Title ── */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-5">
          {article.title}
        </h1>

        {/* ── Meta ── */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-sm font-bold text-indigo-700 dark:text-indigo-300">
              {article.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                {article.author.name}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {formatDate(article.published_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readingTime(article.content)} menit baca
            </span>
            {article.views_count !== undefined && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {article.views_count} views
              </span>
            )}
            {article.comments_count !== undefined && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {article.comments_count} komentar
              </span>
            )}
          </div>
        </div>

        {/* ── Thumbnail ── */}
        {article.thumbnail_url && (
          <div className="mb-10 rounded-2xl overflow-hidden aspect-video">
            <img
              src={article.thumbnail_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ── Excerpt ── */}
        {article.excerpt && (
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 pl-4 border-l-4 border-indigo-400 dark:border-indigo-600 italic">
            {article.excerpt}
          </p>
        )}

        {/* ── Content ── */}
        <div
          className="prose prose-gray dark:prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
            prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-indigo-50 dark:prose-code:bg-indigo-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-blockquote:border-indigo-400 dark:prose-blockquote:border-indigo-600 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
            prose-img:rounded-xl prose-hr:border-gray-200 dark:prose-hr:border-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* ── Tags ── */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            {article.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/articles?tag=${tag.slug}`}
                className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-1.5 rounded-full font-medium transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* ── Share ── */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Bagikan:
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-full transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Salin link
          </button>
        </div>

        {/* ── Comments ── */}
        <section className="mt-14" id="comments">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Komentar
            {commentsMeta && (
              <span className="ml-2 text-base font-normal text-gray-400 dark:text-gray-500">
                ({commentsMeta.total})
              </span>
            )}
          </h2>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 mb-8">
            <CommentForm slug={slug ?? ""} />
          </div>

          {/* List */}
          {loadingComments ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
                    <div className="h-3 w-2/3 bg-gray-100 dark:bg-gray-700/50 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
              Belum ada komentar. Jadilah yang pertama!
            </p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment: any) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}

          {/* Comment pagination */}
          {commentsMeta && commentsMeta.last_page > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={commentPage <= 1}
                onClick={() => setCommentPage((p) => p - 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
              >
                ← Sebelumnya
              </button>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {commentPage} / {commentsMeta.last_page}
              </span>
              <button
                disabled={commentPage >= commentsMeta.last_page}
                onClick={() => setCommentPage((p) => p + 1)}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
              >
                Berikutnya →
              </button>
            </div>
          )}
        </section>
      </article>
    </div>
  );
}
