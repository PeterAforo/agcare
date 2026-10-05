"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Trash2, Pencil, Star, Plus, X } from "lucide-react";

interface CredentialField {
  key: string;
  label: string;
  required?: boolean;
  secret?: boolean;
}

interface Provider {
  provider: string;
  label: string;
  credentialFields: CredentialField[];
}

interface Gateway {
  id: string;
  name: string;
  provider: string;
  credentials: Record<string, string>;
  webhookSecret: string | null;
  isActive: boolean;
  isDefault: boolean;
  _count: { donations: number };
}

interface Props {
  gateways: Gateway[];
  providers: Provider[];
}

export default function GatewayManager({ gateways, providers }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<Gateway | null>(null);
  const [creating, setCreating] = useState(false);
  const [provider, setProvider] = useState(providers[0]?.provider || "teller");
  const [name, setName] = useState("");
  const [creds, setCreds] = useState<Record<string, string>>({});
  const [webhookSecret, setWebhookSecret] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentProvider = providers.find((p) => p.provider === (editing?.provider || provider));

  function openCreate() {
    setEditing(null);
    setCreating(true);
    setProvider(providers[0]?.provider || "teller");
    setName("");
    setCreds({});
    setWebhookSecret("");
    setIsDefault(false);
  }

  function openEdit(g: Gateway) {
    setEditing(g);
    setCreating(true);
    setProvider(g.provider);
    setName(g.name);
    setCreds(g.credentials || {});
    setWebhookSecret(g.webhookSecret || "");
    setIsDefault(g.isDefault);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...(editing ? { id: editing.id } : {}),
      name,
      provider: editing?.provider || provider,
      credentials: creds,
      webhookSecret: webhookSecret || null,
      isDefault,
      isActive: true,
    };
    const res = await fetch("/api/admin/gateways", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setCreating(false);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to save gateway.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this gateway? Donations will keep their records.")) return;
    const res = await fetch(`/api/admin/gateway/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Failed to delete gateway.");
  }

  async function setDefault(id: string) {
    await fetch("/api/admin/gateways", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isDefault: true }),
    });
    router.refresh();
  }

  async function toggleActive(g: Gateway) {
    await fetch("/api/admin/gateways", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: g.id, isActive: !g.isActive }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ backgroundColor: "#2ec774" }}
        >
          <Plus className="w-4 h-4" /> Add Gateway
        </button>
      </div>

      {creating && (
        <form onSubmit={handleSave} className="bg-white rounded-xl p-6 shadow-sm mb-6 max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold" style={{ color: "#343877" }}>
              {editing ? `Edit ${editing.name}` : "New Gateway"}
            </h3>
            <button type="button" onClick={() => setCreating(false)} aria-label="Close">
              <X className="w-5 h-5" style={{ color: "#9e9e9e" }} />
            </button>
          </div>

          {!editing && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>Provider</label>
              <select
                value={provider}
                onChange={(e) => { setProvider(e.target.value); setCreds({}); }}
                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                style={{ borderColor: "#dee2e6" }}
              >
                {providers.map((p) => (
                  <option key={p.provider} value={p.provider}>{p.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>Display Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Teller — Main"
              className="w-full px-4 py-2.5 rounded-lg border text-sm"
              style={{ borderColor: "#dee2e6" }}
            />
          </div>

          {currentProvider?.credentialFields.map((f) => (
            <div className="mb-4" key={f.key}>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>
                {f.label}{f.required && <span style={{ color: "#f58ca6" }}> *</span>}
              </label>
              <input
                type={f.secret ? "password" : "text"}
                required={f.required && !editing}
                value={creds[f.key] || ""}
                onChange={(e) => setCreds((c) => ({ ...c, [f.key]: e.target.value }))}
                placeholder={editing ? "Leave blank to keep current" : ""}
                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                style={{ borderColor: "#dee2e6" }}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>Webhook Secret (optional)</label>
            <input
              type="password"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border text-sm"
              style={{ borderColor: "#dee2e6" }}
            />
          </div>

          <label className="flex items-center gap-2 mb-5 text-sm" style={{ color: "#555" }}>
            <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
            Set as default gateway
          </label>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-60"
            style={{ backgroundColor: "#2ec774" }}
          >
            {saving ? "Saving…" : "Save Gateway"}
          </button>
        </form>
      )}

      {gateways.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <CreditCard className="w-10 h-10 mx-auto mb-3" style={{ color: "#dee2e6" }} />
          <p style={{ color: "#9e9e9e" }}>No payment gateways configured. Add one to enable online donations.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {gateways.map((g) => (
            <div key={g.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold" style={{ color: "#343877" }}>{g.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase" style={{ backgroundColor: "#f1f3f5", color: "#666" }}>
                    {g.provider}
                  </span>
                  {g.isDefault && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: "#efc940" }}>DEFAULT</span>
                  )}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: g.isActive ? "#2ec774" : "#9e9e9e" }}>
                    {g.isActive ? "ACTIVE" : "DISABLED"}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#9e9e9e" }}>
                  {g._count.donations} donation{g._count.donations === 1 ? "" : "s"} processed
                </p>
              </div>
              <div className="flex items-center gap-1">
                {!g.isDefault && (
                  <button onClick={() => setDefault(g.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100" title="Set as default">
                    <Star className="w-4 h-4" style={{ color: "#efc940" }} />
                  </button>
                )}
                <button onClick={() => toggleActive(g)} className="px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-100" style={{ color: "#343877" }}>
                  {g.isActive ? "Disable" : "Enable"}
                </button>
                <button onClick={() => openEdit(g)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100" title="Edit">
                  <Pencil className="w-4 h-4" style={{ color: "#343877" }} />
                </button>
                <button onClick={() => handleDelete(g.id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100" title="Delete">
                  <Trash2 className="w-4 h-4" style={{ color: "#f58ca6" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
