import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import Forbidden from "@/components/admin/Forbidden";
import MessageActions from "./MessageActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";
import { Inbox } from "lucide-react";

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "EDITOR")) {
    return <Forbidden />;
  }

  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { email: { contains: q, mode: "insensitive" as const } },
        { subject: { contains: q, mode: "insensitive" as const } },
        { message: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [messages, total, unread] = await Promise.all([
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Contact Messages</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
            {unread} unread · {total} message{total === 1 ? "" : "s"}
          </p>
        </div>
        <SearchInput q={q} action="/admin/messages" placeholder="Search messages…" />
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Inbox className="w-10 h-10 mx-auto mb-3" style={{ color: "#dee2e6" }} />
          <p style={{ color: "#9e9e9e" }}>No contact messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl p-5 shadow-sm"
              style={{ borderLeft: `4px solid ${m.isRead ? "#f1f3f5" : "#2ec774"}` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold" style={{ color: "#343877" }}>{m.name}</span>
                    <a href={`mailto:${m.email}`} className="text-xs" style={{ color: "#49C2DF" }}>{m.email}</a>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#f1f3f5", color: "#666" }}>
                      {m.subject}
                    </span>
                    {!m.isRead && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#2ec774" }}>NEW</span>
                    )}
                    {m.isReplied && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#343877" }}>REPLIED</span>
                    )}
                  </div>
                  <p className="text-sm mt-2 whitespace-pre-wrap" style={{ color: "#555" }}>{m.message}</p>
                  <p className="text-xs mt-2" style={{ color: "#9e9e9e" }}>
                    {new Date(m.createdAt).toLocaleString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
                <MessageActions id={m.id} isRead={m.isRead} isReplied={m.isReplied} />
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/messages" params={{ q }} />
    </div>
  );
}
