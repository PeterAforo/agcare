import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";
import { User } from "lucide-react";

export default async function TeamPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { role: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [members, total] = await Promise.all([
    prisma.teamMember.findMany({ where, orderBy: { order: "asc" }, skip, take }),
    prisma.teamMember.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Team Members</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage team and leadership profiles</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/team" placeholder="Search members…" />
          <Link href="/admin/team/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add Member</Link>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <User className="w-10 h-10 mx-auto mb-3" style={{ color: "#dee2e6" }} />
          <p style={{ color: "#9e9e9e" }}>{q ? `No members matching "${q}".` : "No team members yet."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((m) => (
            <div key={m.id} className="bg-white rounded-xl p-5 shadow-sm text-center">
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-100">
                {m.image ? (
                  <Image src={m.image} alt={m.name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8" style={{ color: "#dee2e6" }} />
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold" style={{ color: "#343877" }}>{m.name}</p>
              <p className="text-xs mb-2" style={{ color: "#9e9e9e" }}>{m.role}</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: m.isActive ? "#2ec77415" : "#f58ca615", color: m.isActive ? "#2ec774" : "#f58ca6" }}>
                {m.isActive ? "Active" : "Inactive"}
              </span>
              <div className="mt-3">
                <ItemActions id={m.id} isActive={m.isActive} editHref={`/admin/team/${m.id}/edit`} deleteAction="team-member" toggleAction="team-member" />
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/team" params={{ q }} />
    </div>
  );
}
