"use client";

import { useRouter } from "next/navigation";
import { MailOpen, Mail, Trash2, Check } from "lucide-react";

interface Props {
  id: string;
  isRead: boolean;
  isReplied: boolean;
}

export default function MessageActions({ id, isRead, isReplied }: Props) {
  const router = useRouter();

  async function update(data: Record<string, boolean>) {
    await fetch("/api/admin/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/contact-message/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  const btnClass = "w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100";

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => update({ isRead: !isRead })} className={btnClass} title={isRead ? "Mark unread" : "Mark read"}>
        {isRead ? <Mail className="w-4 h-4" style={{ color: "#343877" }} /> : <MailOpen className="w-4 h-4" style={{ color: "#343877" }} />}
      </button>
      <button onClick={() => update({ isReplied: !isReplied })} className={btnClass} title={isReplied ? "Unmark replied" : "Mark replied"}>
        <Check className="w-4 h-4" style={{ color: isReplied ? "#2ec774" : "#9e9e9e" }} />
      </button>
      <button onClick={handleDelete} className={btnClass} title="Delete">
        <Trash2 className="w-4 h-4" style={{ color: "#f58ca6" }} />
      </button>
    </div>
  );
}
