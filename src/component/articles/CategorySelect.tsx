import React from "react";
import type { Category } from "../../types/Article";

interface Props {
  categories: Category[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  error?: string;
}

export function CategorySelect({
  categories,
  selectedIds,
  onChange,
  error,
}: Props) {
  function toggle(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = selectedIds.includes(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                active
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
