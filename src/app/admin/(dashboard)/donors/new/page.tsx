import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "name", label: "Donor / Partner Name", type: "text", required: true },
  { name: "logo", label: "Logo URL", type: "text", required: true, placeholder: "/images/donor_1.png" },
  { name: "url", label: "Website URL", type: "url", placeholder: "https://..." },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default function NewDonorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add Donor / Partner</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="donor" mode="create" backHref="/admin/donors" initialData={{ order: 0, isActive: "true" }} />
      </div>
    </div>
  );
}
