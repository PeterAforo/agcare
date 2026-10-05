import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import Forbidden from "@/components/admin/Forbidden";
import UserForm from "../../UserForm";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "ADMIN")) {
    return <Forbidden message="Only administrators can edit users." />;
  }

  const { id } = await params;
  const target = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!target) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit User</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg">
        <UserForm
          mode="edit"
          userId={target.id}
          initial={{ name: target.name, email: target.email, role: target.role }}
          isSuperAdmin={user.role === "SUPER_ADMIN"}
        />
      </div>
    </div>
  );
}
