import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

export default async function DonorsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q ? { name: { contains: q, mode: "insensitive" as const } } : {};
  const [donors, total] = await Promise.all([
    prisma.donor.findMany({ where, orderBy: { order: "asc" }, skip, take }),
    prisma.donor.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Donors & Partners</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage donor/partner logos</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/donors" placeholder="Search donors…" />
          <Link href="/admin/donors/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add Donor</Link>
        </div>
      </div>

      {donors.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>{q ? `No donors matching "${q}".` : "No donors yet."}</p>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {donors.map((d) => (
          <div key={d.id} className="bg-white rounded-xl p-5 shadow-sm text-center">
            <div className="relative w-20 h-12 mx-auto mb-3">
              <Image src={d.logo} alt={d.name} fill className="object-contain" sizes="80px" />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "#343877" }}>{d.name}</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: d.isActive ? "#2ec77415" : "#f58ca615", color: d.isActive ? "#2ec774" : "#f58ca6" }}>
              {d.isActive ? "Active" : "Inactive"}
            </span>
            <div className="mt-3">
              <ItemActions id={d.id} isActive={d.isActive} editHref={`/admin/donors/${d.id}/edit`} deleteAction="donor" toggleAction="donor" />
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} total={total} pageSize={take} base="/admin/donors" params={{ q }} />
    </div>
  );
}
