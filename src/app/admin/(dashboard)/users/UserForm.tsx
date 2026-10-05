"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  mode: "create" | "edit";
  userId?: string;
  initial?: { name: string; email: string; role: string };
  isSuperAdmin: boolean;
}

export default function UserForm({ mode, userId, initial, isSuperAdmin }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name || "",
    email: initial?.email || "",
    password: "",
    role: initial?.role || "EDITOR",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(mode === "edit" ? { id: userId } : {}),
          name: form.name,
          email: form.email,
          role: form.role,
          ...(form.password ? { password: form.password } : {}),
        }),
      });
      if (res.ok) {
        router.push("/admin/users");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save user.");
      }
    } catch {
      alert("Failed to save user.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Full Name</label>
        <input name="name" required value={form.name} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Email</label>
        <input name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
          Password{mode === "edit" && <span className="font-normal text-xs ml-1" style={{ color: "#9e9e9e" }}>(leave blank to keep current)</span>}
        </label>
        <input name="password" type="password" required={mode === "create"} minLength={8} value={form.password} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Role</label>
        <select name="role" value={form.role} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }}>
          <option value="VIEWER">Viewer</option>
          <option value="EDITOR">Editor</option>
          {isSuperAdmin && <option value="ADMIN">Admin</option>}
          {isSuperAdmin && <option value="SUPER_ADMIN">Super Admin</option>}
        </select>
        {!isSuperAdmin && (
          <p className="text-xs mt-1" style={{ color: "#9e9e9e" }}>Only super admins can grant admin roles.</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ backgroundColor: "#2ec774" }}>
          {saving ? "Saving..." : mode === "edit" ? "Update User" : "Create User"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-sm font-semibold border transition-colors hover:bg-gray-50" style={{ borderColor: "#dee2e6", color: "#555" }}>Cancel</button>
      </div>
    </form>
  );
}
