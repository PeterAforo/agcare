import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { location: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [events, total] = await Promise.all([
    prisma.event.findMany({ where, orderBy: { startDate: "desc" }, skip, take }),
    prisma.event.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Events</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage events</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/events" placeholder="Search events…" />
          <Link href="/admin/events/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add Event</Link>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>{q ? `No events matching "${q}".` : "No events yet."}</p>
        </div>
      ) : (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Image</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Title</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Date</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Location</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Status</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                <td className="px-4 py-3">
                  {ev.image ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={ev.image} alt={ev.title} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : <div className="w-16 h-12 rounded bg-gray-100" />}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: "#343877" }}>{ev.title}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>
                  {new Date(ev.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>{ev.location || "—"}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: ev.isPublished ? "#2ec77415" : "#f58ca615", color: ev.isPublished ? "#2ec774" : "#f58ca6" }}>
                    {ev.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3"><ItemActions id={ev.id} isActive={ev.isPublished} editHref={`/admin/events/${ev.id}/edit`} deleteAction="event" toggleAction="event" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/events" params={{ q }} />
    </div>
  );
}
