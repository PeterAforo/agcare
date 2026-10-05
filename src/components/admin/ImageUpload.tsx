"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon, Loader2 } from "lucide-react";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  /** Accepted file types, defaults to images */
  accept?: string;
  /** Label shown above the field */
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  accept = "image/*",
  label,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
          {label}
        </label>
      )}

      {value ? (
        <div className="flex items-start gap-3">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border flex-shrink-0" style={{ borderColor: "#dee2e6" }}>
            <Image src={value} alt="Preview" fill className="object-cover" sizes="96px" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate mb-2" style={{ color: "#666" }}>{value}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs px-3 py-1.5 rounded-lg border font-medium hover:bg-gray-50"
                style={{ borderColor: "#dee2e6", color: "#555" }}
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-xs px-3 py-1.5 rounded-lg border font-medium hover:bg-gray-50"
                style={{ borderColor: "#dee2e6", color: "#f58ca6" }}
              >
                <X size={12} className="inline mr-1" />Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-1 mb-2">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`text-xs px-3 py-1 rounded-lg font-medium ${mode === "upload" ? "text-white" : "bg-white"}`}
              style={mode === "upload" ? { backgroundColor: "#343877" } : { color: "#343877", border: "1px solid #dee2e6" }}
            >
              <Upload size={11} className="inline mr-1" />Upload
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`text-xs px-3 py-1 rounded-lg font-medium ${mode === "url" ? "text-white" : "bg-white"}`}
              style={mode === "url" ? { backgroundColor: "#343877" } : { color: "#343877", border: "1px solid #dee2e6" }}
            >
              <LinkIcon size={11} className="inline mr-1" />URL
            </button>
          </div>

          {mode === "upload" ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="w-full rounded-lg border-2 border-dashed py-8 px-4 text-center cursor-pointer transition-colors hover:bg-gray-50"
              style={{ borderColor: "#dee2e6" }}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#343877" }} />
                  <p className="text-xs" style={{ color: "#9e9e9e" }}>Uploading...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 mx-auto mb-2" style={{ color: "#9e9e9e" }} />
                  <p className="text-xs" style={{ color: "#666" }}>
                    Click to browse or drag & drop
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "#bbb" }}>
                    PNG, JPG, GIF, WebP, SVG — max 8MB
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30"
                style={{ borderColor: "#dee2e6" }}
              />
              <button
                type="button"
                onClick={() => urlInput && onChange(urlInput)}
                className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
                style={{ backgroundColor: "#343877" }}
              >
                Use
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs mt-2" style={{ color: "#f58ca6" }}>{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
