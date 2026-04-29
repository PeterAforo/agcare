"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Props {
  id: string;
  isActive: boolean;
  editHref: string;
  deleteAction: string;
  toggleAction: string;
}

export default function ItemActions({
  id,
  isActive,
  editHref,
  deleteAction,
  toggleAction,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/admin/${deleteAction}/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Failed to delete.");
  }

  async function handleToggle() {
    const res = await fetch(`/api/admin/${toggleAction}/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={handleToggle}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
        title={isActive ? "Deactivate" : "Activate"}
      >
        {isActive ? (
          <EyeOff className="w-4 h-4" style={{ color: "#9e9e9e" }} />
        ) : (
          <Eye className="w-4 h-4" style={{ color: "#2ec774" }} />
        )}
      </button>
      <Link
        href={editHref}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
        title="Edit"
      >
        <Pencil className="w-4 h-4" style={{ color: "#343877" }} />
      </Link>
      <button
        onClick={handleDelete}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" style={{ color: "#f58ca6" }} />
      </button>
    </div>
  );
}
