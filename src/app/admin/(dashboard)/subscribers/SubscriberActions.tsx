"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function SubscriberActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch(`/api/admin/subscriber/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100"
      title="Delete subscriber"
    >
      <Trash2 className="w-4 h-4" style={{ color: "#f58ca6" }} />
    </button>
  );
}
