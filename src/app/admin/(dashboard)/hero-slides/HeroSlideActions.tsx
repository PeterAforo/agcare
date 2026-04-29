"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteHeroSlide, toggleHeroSlide } from "./actions";

interface Props {
  id: string;
  isActive: boolean;
}

export default function HeroSlideActions({ id, isActive }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    await deleteHeroSlide(id);
    router.refresh();
  }

  async function handleToggle() {
    await toggleHeroSlide(id, !isActive);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
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
        href={`/admin/hero-slides/${id}/edit`}
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
