import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

export default async function CausesPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { description: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [causes, total] = await Promise.all([
    prisma.cause.findMany({ where, orderBy: { order: "asc" }, skip, take }),
    prisma.cause.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Causes</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage causes for the homepage slider</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/causes" placeholder="Search causes…" />
          <Link
            href="/admin/causes/new"
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#2ec774" }}
          >
            + Add Cause
          </Link>
        </div>
      </div>

      {causes.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>No causes yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Image</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Title</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Badge</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Goal</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Pledged</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Status</th>
                <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {causes.map((cause) => (
                <tr key={cause.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                  <td className="px-4 py-3">
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={cause.image} alt={cause.title} fill className="object-cover" sizes="64px" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: "#343877" }}>{cause.title}</td>
                  <td className="px-4 py-3">
                    {cause.badge && (
                      <span className="text-white text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: cause.badgeColor }}>
                        {cause.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#555" }}>${cause.goalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3" style={{ color: "#555" }}>${cause.pledgedAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: cause.isActive ? "#2ec77415" : "#f58ca615",
                        color: cause.isActive ? "#2ec774" : "#f58ca6",
                      }}
                    >
                      {cause.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <ItemActions
                      id={cause.id}
                      isActive={cause.isActive}
                      editHref={`/admin/causes/${cause.id}/edit`}
                      deleteAction="cause"
                      toggleAction="cause"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/causes" params={{ q }} />
    </div>
  );
}
