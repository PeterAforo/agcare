import { getSessionUser, hasMinRole } from "@/lib/rbac";
import Forbidden from "@/components/admin/Forbidden";
import UserForm from "../UserForm";

export default async function NewUserPage() {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "ADMIN")) {
    return <Forbidden message="Only administrators can create users." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add User</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg">
        <UserForm mode="create" isSuperAdmin={user.role === "SUPER_ADMIN"} />
      </div>
    </div>
  );
}
