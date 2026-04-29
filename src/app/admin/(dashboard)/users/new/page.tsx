"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/users");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create user.");
      }
    } catch {
      alert("Failed to create user.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add User</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm max-w-lg">
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
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Password</label>
            <input name="password" type="password" required minLength={8} value={form.password} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Role</label>
            <select name="role" value={form.role} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }}>
              <option value="VIEWER">Viewer</option>
              <option value="EDITOR">Editor</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ backgroundColor: "#2ec774" }}>
              {saving ? "Creating..." : "Create User"}
            </button>
            <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-sm font-semibold border transition-colors hover:bg-gray-50" style={{ borderColor: "#dee2e6", color: "#555" }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
