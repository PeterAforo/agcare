import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Projects</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage projects for the homepage grid</p>
        </div>
        <Link href="/admin/projects/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add Project</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Image</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Title</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Badge</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Layout</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Status</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                <td className="px-4 py-3">
                  <div className="relative w-16 h-12 rounded overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="64px" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: "#343877" }}>{p.title}</td>
                <td className="px-4 py-3">
                  {p.badge && <span className="text-white text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: p.badgeColor }}>{p.badge}</span>}
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>{p.layoutType}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: p.isPublished ? "#2ec77415" : "#f58ca615", color: p.isPublished ? "#2ec774" : "#f58ca6" }}>
                    {p.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3"><ItemActions id={p.id} isActive={p.isPublished} editHref={`/admin/projects/${p.id}/edit`} deleteAction="project" toggleAction="project" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
