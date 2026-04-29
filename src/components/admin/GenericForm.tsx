"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "email" | "select" | "date" | "color" | "url";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  half?: boolean;
}

interface Props {
  fields: FieldDef[];
  apiModel: string;
  initialData?: Record<string, unknown>;
  mode: "create" | "edit";
  backHref: string;
}

export default function GenericForm({ fields, apiModel, initialData, mode, backHref }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>(initialData || {});

  function handleChange(name: string, value: unknown) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(`/api/admin/${apiModel}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push(backHref);
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save.");
      }
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";

  // Group fields into rows
  const rows: FieldDef[][] = [];
  let currentRow: FieldDef[] = [];
  for (const field of fields) {
    if (field.half) {
      currentRow.push(field);
      if (currentRow.length === 2) {
        rows.push(currentRow);
        currentRow = [];
      }
    } else {
      if (currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
      }
      rows.push([field]);
    }
  }
  if (currentRow.length > 0) rows.push(currentRow);

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {rows.map((row, ri) => (
        <div key={ri} className={row.length > 1 ? "grid grid-cols-2 gap-4" : ""}>
          {row.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  required={field.required}
                  rows={3}
                  value={(form[field.name] as string) || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={inputClass}
                  style={{ borderColor: "#dee2e6" }}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  value={(form[field.name] as string) || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "#dee2e6" }}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  value={(form[field.name] as string) ?? ""}
                  onChange={(e) =>
                    handleChange(
                      field.name,
                      field.type === "number" ? Number(e.target.value) : e.target.value
                    )
                  }
                  placeholder={field.placeholder}
                  className={inputClass}
                  style={{ borderColor: "#dee2e6" }}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          style={{ backgroundColor: "#2ec774" }}
        >
          {saving ? "Saving..." : mode === "edit" ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold border transition-colors hover:bg-gray-50"
          style={{ borderColor: "#dee2e6", color: "#555" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
