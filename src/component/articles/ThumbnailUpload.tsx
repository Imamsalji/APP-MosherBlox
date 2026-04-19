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

  return (
    <div>
      {displayUrl ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video">
          <img
            src={displayUrl}
            alt="Thumbnail preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-colors hover:bg-gray-50 ${
            error ? "border-red-400" : "border-gray-300 hover:border-indigo-400"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-400"
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
              <p className="text-sm text-gray-600">
                <span className="font-medium text-indigo-600">
                  Klik untuk upload
                </span>{" "}
                atau drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
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
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
