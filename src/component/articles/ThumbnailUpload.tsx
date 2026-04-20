import React, { useRef, useState } from "react";

interface Props {
  value: File | null;
  previewUrl?: string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ThumbnailUpload({ value, previewUrl, onChange, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const displayUrl = localPreview ?? previewUrl ?? null;

  function handleFile(file: File | null) {
    if (!file) return;
    onChange(file);
    const reader = new FileReader();
    reader.onload = (e) => setLocalPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function handleRemove() {
    onChange(null);
    setLocalPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (displayUrl) {
    return (
      <div className="relative group rounded-xl overflow-hidden border border-white/[0.07] aspect-video">
        <img
          src={displayUrl}
          alt="Thumbnail preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
          >
            Ganti
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500/80 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-500 transition-colors"
          >
            Hapus
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>
    );
  }

  return (
    <div>
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-all hover:bg-white/[0.02] group ${
          error
            ? "border-red-500/40"
            : "border-white/[0.08] hover:border-indigo-500/40"
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-center p-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                Klik untuk upload
              </span>{" "}
              atau drag & drop
            </p>
            <p className="text-xs text-gray-700 mt-0.5">
              PNG, JPG, WebP — maks. 2MB
            </p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
