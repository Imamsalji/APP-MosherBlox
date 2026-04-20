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
        className={`min-h-[40px] w-full rounded-xl border bg-[#0f1117] px-3 py-2 flex flex-wrap gap-1.5 cursor-text focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/40 transition-all ${
          error
            ? "border-red-500/50"
            : "border-white/[0.07] hover:border-white/[0.12]"
        }`}
        onClick={() => setOpen(true)}
      >
        {selected.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 text-xs font-medium px-2 py-0.5 rounded-md"
          >
            #{tag.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag.id);
              }}
              className="text-indigo-400 hover:text-indigo-200 leading-none transition-colors"
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
          className="flex-1 min-w-[100px] outline-none text-xs bg-transparent text-gray-300 placeholder-gray-600"
        />
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full bg-[#1c2333] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 max-h-44 overflow-auto">
          {filtered.map((tag) => (
            <li
              key={tag.id}
              onMouseDown={() => addTag(tag.id)}
              className="px-3 py-2 text-xs text-gray-400 hover:bg-indigo-500/10 hover:text-indigo-300 cursor-pointer transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="text-gray-600 mr-1">#</span>
              {tag.name}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
