"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SettingsData {
  id?: string;
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  contactPhone2: string;
  address: string;
  socialLinks: Record<string, string>;
}

export default function SettingsForm({ initialData }: { initialData?: SettingsData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<SettingsData>(
    initialData || {
      siteName: "AG Care Ghana",
      tagline: "",
      contactEmail: "",
      contactPhone: "",
      contactPhone2: "",
      address: "",
      socialLinks: { facebook: "", twitter: "", instagram: "" },
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSocial(key: string, value: string) {
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.refresh();
    } catch {
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Site Name</label>
          <input name="siteName" value={form.siteName} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Tagline</label>
          <input name="tagline" value={form.tagline} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Contact Email</label>
          <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Address</label>
          <input name="address" value={form.address} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Phone 1</label>
          <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Phone 2</label>
          <input name="contactPhone2" value={form.contactPhone2} onChange={handleChange} className={inputClass} style={{ borderColor: "#dee2e6" }} />
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-3" style={{ color: "#343877" }}>Social Links</p>
        <div className="space-y-3">
          {["facebook", "twitter", "instagram"].map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs font-semibold capitalize w-20" style={{ color: "#555" }}>{key}</span>
              <input
                value={form.socialLinks[key] || ""}
                onChange={(e) => handleSocial(key, e.target.value)}
                placeholder={`https://${key}.com/...`}
                className={`flex-1 ${inputClass}`}
                style={{ borderColor: "#dee2e6" }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ backgroundColor: "#2ec774" }}
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
