import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import Forbidden from "@/components/admin/Forbidden";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: "#2ec774",
  PENDING: "#efc940",
  FAILED: "#f58ca6",
  CANCELLED: "#9e9e9e",
  REFUNDED: "#49C2DF",
};

export default async function DonationsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "EDITOR")) {
    return <Forbidden />;
  }

  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { reference: { contains: q, mode: "insensitive" as const } },
        { donorName: { contains: q, mode: "insensitive" as const } },
        { donorEmail: { contains: q, mode: "insensitive" as const } },
        { cause: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [donations, total, raised] = await Promise.all([
    prisma.donation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { gateway: { select: { name: true, provider: true } } },
      skip,
      take,
    }),
    prisma.donation.count({ where }),
    prisma.donation.aggregate({ where: { status: "SUCCESS" }, _sum: { amount: true } }),
  ]);

  const totalRaised = raised._sum.amount || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Donations</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
            {total} donation{total === 1 ? "" : "s"} · GHS{" "}
            {totalRaised.toLocaleString("en-GH", { minimumFractionDigits: 2 })} received
          </p>
        </div>
        <SearchInput q={q} action="/admin/donations" placeholder="Search donations…" />
      </div>

      {donations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>No donations yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Reference</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Donor</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Amount</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Cause</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Gateway</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Status</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "#343877" }}>{d.reference}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium" style={{ color: "#343877" }}>{d.donorName}</div>
                    <div className="text-xs" style={{ color: "#9e9e9e" }}>{d.donorEmail}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#343877" }}>
                    {d.currency} {d.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>{d.cause || "—"}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>{d.gateway?.name || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: STATUS_COLORS[d.status] || "#9e9e9e" }}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#9e9e9e" }}>
                    {new Date(d.createdAt).toLocaleString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/donations" params={{ q }} />
    </div>
  );
}
