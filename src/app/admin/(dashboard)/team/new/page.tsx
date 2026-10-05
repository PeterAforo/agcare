import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "role", label: "Role / Title", type: "text", required: true, placeholder: "e.g. Executive Director" },
  { name: "image", label: "Photo", type: "image" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add Team Member</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="team-member" mode="create" backHref="/admin/team" initialData={{ order: 0, isActive: "true" }} />
      </div>
    </div>
  );
}
