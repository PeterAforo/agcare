import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "quote", label: "Quote", type: "textarea", required: true },
  { name: "authorName", label: "Author Name", type: "text", required: true, half: true },
  { name: "authorRole", label: "Author Role", type: "text", half: true },
  { name: "avatar", label: "Avatar", type: "image" },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Testimonial</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="testimonial" mode="edit" backHref="/admin/testimonials" initialData={{
          id: t.id, quote: t.quote, authorName: t.authorName, authorRole: t.authorRole || "",
          avatar: t.avatar || "", order: t.order, isActive: String(t.isActive),
        }} />
      </div>
    </div>
  );
}
