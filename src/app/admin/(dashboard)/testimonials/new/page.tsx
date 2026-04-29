import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "quote", label: "Quote", type: "textarea", required: true },
  { name: "authorName", label: "Author Name", type: "text", required: true, half: true },
  { name: "authorRole", label: "Author Role", type: "text", half: true, placeholder: "Community Beneficiary" },
  { name: "avatar", label: "Avatar URL", type: "text", placeholder: "/images/avatar.jpg" },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add Testimonial</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="testimonial" mode="create" backHref="/admin/testimonials" initialData={{ order: 0, isActive: "true" }} />
      </div>
    </div>
  );
}
