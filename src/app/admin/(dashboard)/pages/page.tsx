import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FileText, Plus } from "lucide-react";
import ItemActions from "@/components/admin/ItemActions";

export default async function PagesListPage() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
    include: { sections: { select: { id: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Pages</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>{pages.length} pages total</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#2ec774" }}
        >
          <Plus size={16} /> Add Page
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Title</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Slug</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#343877" }}>Sections</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#343877" }}>Template</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: "#343877" }}>Status</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText size={16} style={{ color: "#343877" }} />
                    <Link href={`/admin/pages/${page.id}/edit`} className="font-semibold hover:underline" style={{ color: "#343877" }}>
                      {page.title}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: "#9e9e9e" }}>/{page.slug}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#eef2ff", color: "#343877" }}>
                    {page.sections.length} blocks
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-xs font-semibold capitalize" style={{ color: "#9e9e9e" }}>{page.template}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: page.isPublished ? "#2ec774" : "#9e9e9e" }}
                  >
                    {page.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ItemActions
                    id={page.id}
                    isActive={page.isPublished}
                    editHref={`/admin/pages/${page.id}/edit`}
                    deleteAction="page"
                    toggleAction="page"
                  />
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">No pages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
