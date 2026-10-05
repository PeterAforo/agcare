"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Copy, Check } from "lucide-react";

interface Props {
  id: string;
  url: string;
}

export default function MediaActions({ id, url }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this media file? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("Failed to delete.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={handleCopy}
        className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
        title="Copy URL"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5" style={{ color: "#2ec774" }} />
        ) : (
          <Copy className="w-3.5 h-3.5" style={{ color: "#9e9e9e" }} />
        )}
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" style={{ color: "#f58ca6" }} />
      </button>
    </div>
  );
}
