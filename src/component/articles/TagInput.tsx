import React, { useRef, useState } from "react";
import type { Tag } from "../../types/Article";

interface Props {
  availableTags: Tag[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  error?: string;
}

export function TagInput({
  availableTags,
  selectedIds,
  onChange,
  error,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = availableTags.filter((t) => selectedIds.includes(t.id));
  const filtered = availableTags.filter(
    (t) =>
      !selectedIds.includes(t.id) &&
      t.name.toLowerCase().includes(query.toLowerCase()),
  );

  function addTag(id: number) {
    onChange([...selectedIds, id]);
    setQuery("");
  }

  function removeTag(id: number) {
    onChange(selectedIds.filter((i) => i !== id));
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`min-h-[42px] w-full rounded-lg border bg-white px-3 py-2 flex flex-wrap gap-1.5 cursor-text focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        onClick={() => setOpen(true)}
      >
        {selected.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-md"
          >
            {tag.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag.id);
              }}
              className="hover:text-indigo-900 leading-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={selected.length === 0 ? "Cari atau pilih tag..." : ""}
          className="flex-1 min-w-[120px] outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400"
        />
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
          {filtered.map((tag) => (
            <li
              key={tag.id}
              onMouseDown={() => addTag(tag.id)}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
