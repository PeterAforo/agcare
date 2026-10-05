import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import Forbidden from "@/components/admin/Forbidden";
import SubscriberActions from "./SubscriberActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";
import { Download, MailCheck } from "lucide-react";

export default async function SubscribersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "EDITOR")) {
    return <Forbidden />;
  }

  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q ? { email: { contains: q, mode: "insensitive" as const } } : {};
  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({ where, orderBy: { subscribedAt: "desc" }, skip, take }),
    prisma.subscriber.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Subscribers</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
            {total} newsletter subscriber{total === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/subscribers" placeholder="Search emails…" />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download, not page navigation */}
          <a
            href="/api/admin/subscribers/export"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
            style={{ backgroundColor: "#343877" }}
          >
            <Download className="w-4 h-4" /> Export CSV
          </a>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <MailCheck className="w-10 h-10 mx-auto mb-3" style={{ color: "#dee2e6" }} />
          <p style={{ color: "#9e9e9e" }}>{q ? `No subscribers matching "${q}".` : "No subscribers yet."}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Email</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Subscribed</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "#343877" }}>{s.email}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#9e9e9e" }}>
                    {new Date(s.subscribedAt).toLocaleString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <SubscriberActions id={s.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/subscribers" params={{ q }} />
    </div>
  );
}
