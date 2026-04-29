import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image URL", type: "text", required: true },
  { name: "badge", label: "Badge Text", type: "text", half: true },
  { name: "badgeColor", label: "Badge Color", type: "color", half: true },
  { name: "goalAmount", label: "Goal Amount ($)", type: "number", half: true },
  { name: "layoutType", label: "Layout", type: "select", half: true, options: [{ label: "Vertical", value: "VERTICAL" }, { label: "Horizontal", value: "HORIZONTAL" }, { label: "Primary", value: "PRIMARY" }] },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isPublished", label: "Status", type: "select", half: true, options: [{ label: "Published", value: "true" }, { label: "Draft", value: "false" }] },
];

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Project</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="project" mode="edit" backHref="/admin/projects" initialData={{
          id: project.id, title: project.title, description: project.description, image: project.image,
          badge: project.badge || "", badgeColor: project.badgeColor || "#2EC774", goalAmount: project.goalAmount,
          layoutType: project.layoutType, order: project.order, isPublished: String(project.isPublished),
        }} />
      </div>
    </div>
  );
}
