import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image", type: "image", required: true },
  { name: "badge", label: "Badge Text", type: "text", half: true },
  { name: "badgeColor", label: "Badge Color", type: "color", half: true },
  { name: "goalAmount", label: "Goal Amount ($)", type: "number", half: true },
  { name: "layoutType", label: "Layout", type: "select", half: true, options: [{ label: "Vertical", value: "VERTICAL" }, { label: "Horizontal", value: "HORIZONTAL" }, { label: "Primary", value: "PRIMARY" }] },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isPublished", label: "Status", type: "select", half: true, options: [{ label: "Published", value: "true" }, { label: "Draft", value: "false" }] },
];

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add Project</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="project" mode="create" backHref="/admin/projects" initialData={{ badgeColor: "#2EC774", layoutType: "VERTICAL", order: 0, isPublished: "true" }} />
      </div>
    </div>
  );
}
