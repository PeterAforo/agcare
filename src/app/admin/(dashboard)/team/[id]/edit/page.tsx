import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { name: "role", label: "Role / Title", type: "text", required: true },
  { name: "image", label: "Photo", type: "image" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "order", label: "Order", type: "number", half: true },
  { name: "isActive", label: "Status", type: "select", half: true, options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },
];

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Team Member</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="team-member" mode="edit" backHref="/admin/team" initialData={{
          id: member.id, name: member.name, role: member.role, image: member.image || "",
          bio: member.bio || "", order: member.order, isActive: String(member.isActive),
        }} />
      </div>
    </div>
  );
}
