import React from "react";

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-pulse">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
        <div className="h-3 w-2/3 bg-gray-100 dark:bg-gray-700/50 rounded" />
      </div>
    </div>
  );
}

export default SkeletonCard;
