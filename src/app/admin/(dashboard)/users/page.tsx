import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function UsersPage() {
  const session = await auth();
  const currentRole = (session?.user as { role?: string })?.role;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  const roleColors: Record<string, string> = {
    SUPER_ADMIN: "#343877",
    ADMIN: "#2ec774",
    EDITOR: "#efc940",
    VIEWER: "#9e9e9e",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Users</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage CMS users and roles</p>
        </div>
        {(currentRole === "SUPER_ADMIN" || currentRole === "ADMIN") && (
          <Link href="/admin/users/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add User</Link>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Name</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Email</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Role</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "#343877" }}>{user.name}</td>
                <td className="px-4 py-3" style={{ color: "#555" }}>{user.email}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: roleColors[user.role] || "#9e9e9e" }}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#9e9e9e" }}>
                  {new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
