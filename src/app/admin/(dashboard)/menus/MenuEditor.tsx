"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GripVertical,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Save,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

interface PageOption {
  id: string;
  title: string;
  slug: string;
}

interface MenuItemData {
  id?: string;
  label: string;
  href: string | null;
  pageId: string | null;
  parentId: string | null;
  order: number;
  openNewTab: boolean;
  isActive: boolean;
  children: MenuItemData[];
}

interface MenuData {
  id?: string;
  name: string;
  location: string;
  isActive: boolean;
  items: MenuItemData[];
}

interface Props {
  mode: "create" | "edit";
  initialData?: MenuData;
  pages: PageOption[];
}

export default function MenuEditor({ mode, initialData, pages }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [addingTo, setAddingTo] = useState<number | null>(null); // index of parent for sub-item
  const [menu, setMenu] = useState<MenuData>(
    initialData || {
      name: "",
      location: "HEADER",
      isActive: true,
      items: [],
    }
  );

  function addItem(parentIndex: number | null = null) {
    const newItem: MenuItemData = {
      label: "",
      href: null,
      pageId: null,
      parentId: null,
      order: 0,
      openNewTab: false,
      isActive: true,
      children: [],
    };

    setMenu((prev) => {
      if (parentIndex === null) {
        return { ...prev, items: [...prev.items, { ...newItem, order: prev.items.length }] };
      }
      const items = [...prev.items];
      items[parentIndex] = {
        ...items[parentIndex],
        children: [...items[parentIndex].children, { ...newItem, order: items[parentIndex].children.length }],
      };
      return { ...prev, items };
    });
    setShowAddItem(false);
    setAddingTo(null);
  }

  function removeItem(index: number, childIndex?: number) {
    if (!confirm("Remove this menu item?")) return;
    setMenu((prev) => {
      if (childIndex !== undefined) {
        const items = [...prev.items];
        items[index] = {
          ...items[index],
          children: items[index].children.filter((_, ci) => ci !== childIndex),
        };
        return { ...prev, items };
      }
      return { ...prev, items: prev.items.filter((_, i) => i !== index) };
    });
  }

  function updateItem(index: number, field: string, value: unknown, childIndex?: number) {
    setMenu((prev) => {
      const items = [...prev.items];
      if (childIndex !== undefined) {
        const children = [...items[index].children];
        children[childIndex] = { ...children[childIndex], [field]: value };
        // If linking to a page, clear manual href
        if (field === "pageId" && value) {
          children[childIndex].href = null;
        }
        if (field === "href" && value) {
          children[childIndex].pageId = null;
        }
        items[index] = { ...items[index], children };
      } else {
        items[index] = { ...items[index], [field]: value };
        if (field === "pageId" && value) {
          items[index].href = null;
        }
        if (field === "href" && value) {
          items[index].pageId = null;
        }
      }
      return { ...prev, items };
    });
  }

  function moveItem(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= menu.items.length) return;
    setMenu((prev) => {
      const arr = [...prev.items];
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return { ...prev, items: arr.map((item, i) => ({ ...item, order: i })) };
    });
  }

  function moveChild(parentIndex: number, childIndex: number, direction: "up" | "down") {
    const newChildIndex = direction === "up" ? childIndex - 1 : childIndex + 1;
    setMenu((prev) => {
      const items = [...prev.items];
      const children = [...items[parentIndex].children];
      if (newChildIndex < 0 || newChildIndex >= children.length) return prev;
      [children[childIndex], children[newChildIndex]] = [children[newChildIndex], children[childIndex]];
      items[parentIndex] = { ...items[parentIndex], children: children.map((c, i) => ({ ...c, order: i })) };
      return { ...prev, items };
    });
  }

  async function handleSave() {
    if (!menu.name) {
      alert("Menu name is required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/menus", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu),
      });
      if (res.ok) {
        router.push("/admin/menus");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save.");
      }
    } catch {
      alert("Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";

  function renderMenuItem(item: MenuItemData, index: number, childIndex?: number) {
    const isChild = childIndex !== undefined;
    const linkedPage = pages.find((p) => p.id === item.pageId);

    return (
      <div
        key={`${index}-${childIndex ?? "root"}`}
        className={`bg-white rounded-lg border shadow-sm ${isChild ? "ml-8" : ""}`}
        style={{ borderColor: "#e9ecef" }}
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <GripVertical size={14} className="cursor-grab shrink-0" style={{ color: "#ccc" }} />

          {/* Label */}
          <input
            value={item.label}
            onChange={(e) => updateItem(index, "label", e.target.value, childIndex)}
            placeholder="Menu label..."
            className="flex-1 text-sm font-semibold bg-transparent outline-none min-w-0"
            style={{ color: "#343877" }}
          />

          {/* Link type indicator */}
          {linkedPage ? (
            <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#eef2ff", color: "#343877" }}>
              <FileText size={10} /> /{linkedPage.slug}
            </span>
          ) : item.href && item.href !== "#" ? (
            <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "#fff8e1", color: "#f8ac3a" }}>
              <ExternalLink size={10} /> {item.href}
            </span>
          ) : (
            <span className="shrink-0 text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: "#f8f9fa", color: "#9e9e9e" }}>
              # dropdown
            </span>
          )}

          {/* Actions */}
          <div className="flex items-center gap-0.5 shrink-0">
            {!isChild && (
              <>
                <button onClick={() => moveItem(index, "up")} disabled={index === 0} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"><ChevronUp size={12} /></button>
                <button onClick={() => moveItem(index, "down")} disabled={index === menu.items.length - 1} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"><ChevronDown size={12} /></button>
              </>
            )}
            {isChild && (
              <>
                <button onClick={() => moveChild(index, childIndex!, "up")} disabled={childIndex === 0} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"><ChevronUp size={12} /></button>
                <button onClick={() => moveChild(index, childIndex!, "down")} disabled={childIndex === menu.items[index].children.length - 1} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-30"><ChevronDown size={12} /></button>
              </>
            )}
            <button onClick={() => removeItem(index, childIndex)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100">
              <Trash2 size={12} style={{ color: "#f58ca6" }} />
            </button>
          </div>
        </div>

        {/* Expanded link config */}
        <div className="px-3 pb-3 border-t pt-2 space-y-2" style={{ borderColor: "#f1f3f5" }}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider mb-1 block" style={{ color: "#9e9e9e" }}>Link to Page</label>
              <select
                value={item.pageId || ""}
                onChange={(e) => updateItem(index, "pageId", e.target.value || null, childIndex)}
                className={`${inputClass} text-xs`}
                style={{ borderColor: "#dee2e6" }}
              >
                <option value="">— None —</option>
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} (/{p.slug})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider mb-1 block" style={{ color: "#9e9e9e" }}>Or Custom URL</label>
              <input
                value={item.href || ""}
                onChange={(e) => updateItem(index, "href", e.target.value || null, childIndex)}
                placeholder="/custom-path or https://..."
                className={`${inputClass} text-xs`}
                style={{ borderColor: "#dee2e6" }}
                disabled={!!item.pageId}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "#555" }}>
              <input type="checkbox" checked={item.openNewTab} onChange={(e) => updateItem(index, "openNewTab", e.target.checked, childIndex)} />
              Open in new tab
            </label>
            <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "#555" }}>
              <input type="checkbox" checked={item.isActive} onChange={(e) => updateItem(index, "isActive", e.target.checked, childIndex)} />
              Active
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 min-w-0">
        {/* Menu items */}
        <div className="space-y-2">
          {menu.items.map((item, i) => (
            <div key={i}>
              {renderMenuItem(item, i)}
              {/* Children */}
              {item.children.length > 0 && (
                <div className="space-y-2 mt-2">
                  {item.children.map((child, ci) => renderMenuItem(child, i, ci))}
                </div>
              )}
              {/* Add sub-item button */}
              <button
                onClick={() => addItem(i)}
                className="ml-8 mt-1 text-[10px] font-semibold flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                style={{ color: "#9e9e9e" }}
              >
                <ChevronRight size={10} /> Add Sub-item
              </button>
            </div>
          ))}
        </div>

        {menu.items.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p style={{ color: "#9e9e9e" }}>No menu items yet.</p>
          </div>
        )}

        {/* Add top-level item */}
        <button
          onClick={() => addItem(null)}
          className="w-full mt-4 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors hover:border-solid flex items-center justify-center gap-2"
          style={{ borderColor: "#343877", color: "#343877" }}
        >
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      {/* Sidebar */}
      <div className="w-64 shrink-0 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-bold" style={{ color: "#343877" }}>Menu Settings</h3>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "#343877" }}>Name</label>
            <input
              value={menu.name}
              onChange={(e) => setMenu((prev) => ({ ...prev, name: e.target.value }))}
              className={inputClass}
              style={{ borderColor: "#dee2e6" }}
              placeholder="Main Navigation"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "#343877" }}>Location</label>
            <select
              value={menu.location}
              onChange={(e) => setMenu((prev) => ({ ...prev, location: e.target.value }))}
              className={inputClass}
              style={{ borderColor: "#dee2e6" }}
            >
              <option value="HEADER">Header</option>
              <option value="FOOTER">Footer</option>
              <option value="SIDEBAR">Sidebar</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "#555" }}>
            <input type="checkbox" checked={menu.isActive} onChange={(e) => setMenu((prev) => ({ ...prev, isActive: e.target.checked }))} />
            Active
          </label>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#2ec774" }}
        >
          <Save size={14} />
          {saving ? "Saving..." : mode === "edit" ? "Update Menu" : "Create Menu"}
        </button>

        {/* Quick add from pages */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-bold mb-2" style={{ color: "#343877" }}>Quick Add Pages</h3>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setMenu((prev) => ({
                    ...prev,
                    items: [
                      ...prev.items,
                      {
                        label: p.title,
                        href: null,
                        pageId: p.id,
                        parentId: null,
                        order: prev.items.length,
                        openNewTab: false,
                        isActive: true,
                        children: [],
                      },
                    ],
                  }));
                }}
                className="w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                style={{ color: "#343877" }}
              >
                <LinkIcon size={10} style={{ color: "#9e9e9e" }} />
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
