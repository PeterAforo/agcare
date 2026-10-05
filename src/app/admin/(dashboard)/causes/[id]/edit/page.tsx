import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image", type: "image", required: true },
  { name: "badge", label: "Badge Text", type: "text", half: true },
  { name: "badgeColor", label: "Badge Color", type: "color", half: true },
  { name: "goalAmount", label: "Goal Amount ($)", type: "number", half: true },
  { name: "pledgedAmount", label: "Pledged Amount ($)", type: "number", half: true },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default async function EditCausePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cause = await prisma.cause.findUnique({ where: { id } });
  if (!cause) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Cause</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm
          fields={fields}
          apiModel="cause"
          mode="edit"
          backHref="/admin/causes"
          initialData={{
            id: cause.id,
            title: cause.title,
            description: cause.description,
            image: cause.image,
            badge: cause.badge || "",
            badgeColor: cause.badgeColor || "#2EC774",
            goalAmount: cause.goalAmount,
            pledgedAmount: cause.pledgedAmount,
            order: cause.order,
            isActive: String(cause.isActive),
          }}
        />
      </div>
    </div>
  );
}
