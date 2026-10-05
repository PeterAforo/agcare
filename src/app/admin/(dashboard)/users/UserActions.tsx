"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  id: string;
  currentUserId: string;
  targetRole: string;
  canManage: boolean;
}

export default function UserActions({ id, currentUserId, targetRole, canManage }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/user/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to delete user.");
    }
  }

  if (!canManage) return <span className="text-xs" style={{ color: "#bbb" }}>-</span>;

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/users/${id}/edit`}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
        title="Edit user"
      >
        <Pencil className="w-4 h-4" style={{ color: "#343877" }} />
      </Link>
      {id !== currentUserId && targetRole !== "SUPER_ADMIN" && (
        <button
          onClick={handleDelete}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
          title="Delete user"
        >
          <Trash2 className="w-4 h-4" style={{ color: "#f58ca6" }} />
        </button>
      )}
    </div>
  );
}
