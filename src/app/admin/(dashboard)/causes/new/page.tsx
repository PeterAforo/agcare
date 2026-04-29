import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image URL", type: "text", required: true, placeholder: "/images/causes_1.jpg" },
  { name: "badge", label: "Badge Text", type: "text", half: true, placeholder: "Water & Sanitation" },
  { name: "badgeColor", label: "Badge Color", type: "color", half: true },
  { name: "goalAmount", label: "Goal Amount ($)", type: "number", half: true },
  { name: "pledgedAmount", label: "Pledged Amount ($)", type: "number", half: true },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default function NewCausePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add Cause</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="cause" mode="create" backHref="/admin/causes" initialData={{ badgeColor: "#2EC774", order: 0, isActive: "true" }} />
      </div>
    </div>
  );
}
