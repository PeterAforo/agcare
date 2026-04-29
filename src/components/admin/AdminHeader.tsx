"use client";

import { signOut } from "next-auth/react";
import { LogOut, Bell } from "lucide-react";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b bg-white flex-shrink-0"
      style={{ borderColor: "#e9ecef" }}
    >
      <div>
        <h2 className="text-sm font-bold" style={{ color: "#343877" }}>
          Welcome back, {user.name || "Admin"}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications placeholder */}
        <button
          className="relative w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
          title="Notifications"
        >
          <Bell className="w-4 h-4" style={{ color: "#555" }} />
        </button>

        {/* Role badge */}
        <span
          className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded"
          style={{
            backgroundColor: "#343877",
            color: "#fff",
          }}
        >
          {(user as { role?: string }).role || "USER"}
        </span>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
          style={{ color: "#555" }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </header>
  );
}
