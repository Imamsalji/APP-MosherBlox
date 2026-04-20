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
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => {
          const active = selectedIds.includes(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                active
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                  : "bg-transparent border-white/[0.08] text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
