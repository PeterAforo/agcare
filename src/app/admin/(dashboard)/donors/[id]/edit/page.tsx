import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "name", label: "Donor / Partner Name", type: "text", required: true },
  { name: "logo", label: "Logo URL", type: "text", required: true },
  { name: "url", label: "Website URL", type: "url" },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default async function EditDonorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donor = await prisma.donor.findUnique({ where: { id } });
  if (!donor) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Donor</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="donor" mode="edit" backHref="/admin/donors" initialData={{
          id: donor.id, name: donor.name, logo: donor.logo, url: donor.url || "",
          order: donor.order, isActive: String(donor.isActive),
        }} />
      </div>
    </div>
  );
}
