import React from "react";
import { formatDate, readingTime } from "../../../utils/format";
import { Link } from "react-router-dom";
import { Article } from "../../../types/Article";

function ArticleCardFeatured({ article }: { article: Article }) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group relative flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300"
    >
      <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-gray-100 dark:bg-gray-700">
        {article.thumbnail_url ? (
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full min-h-[220px] flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 p-7 flex flex-col justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories.slice(0, 2).map((c: any) => (
              <span
                key={c.id}
                className="text-xs font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full"
              >
                {c.name}
              </span>
            ))}
            <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h2>
          {article.excerpt && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              {article.author.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {article.author.name}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span>{formatDate(article.published_at)}</span>
            <span>·</span>
            <span>{readingTime(article.content)} menit baca</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCardFeatured;
