import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import Forbidden from "@/components/admin/Forbidden";
import UserActions from "./UserActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const currentUser = await getSessionUser();
  if (!currentUser || !hasMinRole(currentUser.role, "ADMIN")) {
    return <Forbidden message="Only administrators can manage users." />;
  }
  const canManage = hasMinRole(currentUser.role, "ADMIN");

  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { email: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      skip,
      take,
    }),
    prisma.user.count({ where }),
  ]);

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
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/users" placeholder="Search users…" />
          {canManage && (
            <Link href="/admin/users/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add User</Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Name</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Email</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Role</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Joined</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "#343877" }}>
                  {user.name}
                  {user.id === currentUser.id && (
                    <span className="ml-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ backgroundColor: "#343877" }}>You</span>
                  )}
                </td>
                <td className="px-4 py-3" style={{ color: "#555" }}>{user.email}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: roleColors[user.role] || "#9e9e9e" }}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#9e9e9e" }}>
                  {new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <UserActions
                      id={user.id}
                      currentUserId={currentUser.id}
                      targetRole={user.role}
                      canManage={canManage}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={5} className="text-center py-12" style={{ color: "#9e9e9e" }}>{q ? `No users matching "${q}".` : "No users found."}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={total} pageSize={take} base="/admin/users" params={{ q }} />
    </div>
  );
}
