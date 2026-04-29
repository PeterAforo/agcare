import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Menu, Plus } from "lucide-react";

export default async function MenusListPage() {
  const menus = await prisma.menu.findMany({
    orderBy: { createdAt: "asc" },
    include: { items: { where: { parentId: null }, select: { id: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Menus</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>{menus.length} menus configured</p>
        </div>
        <Link
          href="/admin/menus/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#2ec774" }}
        >
          <Plus size={16} /> Add Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus.map((menu) => (
          <Link
            key={menu.id}
            href={`/admin/menus/${menu.id}/edit`}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#eef2ff" }}>
                <Menu size={20} style={{ color: "#343877" }} />
              </div>
              <div>
                <h3 className="font-bold text-sm group-hover:underline" style={{ color: "#343877" }}>{menu.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9e9e9e" }}>{menu.location}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: "#9e9e9e" }}>{menu.items.length} top-level items</span>
              <span
                className="px-2 py-0.5 rounded-full font-bold text-white"
                style={{ backgroundColor: menu.isActive ? "#2ec774" : "#9e9e9e" }}
              >
                {menu.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </Link>
        ))}
        {menus.length === 0 && (
          <div className="col-span-2 bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-400">No menus yet. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
