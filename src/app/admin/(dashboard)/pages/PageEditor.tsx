"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Save,
  Settings,
} from "lucide-react";

const SECTION_TYPES = [
  { value: "BANNER", label: "Page Banner", icon: "🏷️" },
  { value: "RICH_TEXT", label: "Rich Text", icon: "📝" },
  { value: "IMAGE_TEXT", label: "Image + Text", icon: "🖼️" },
  { value: "HERO", label: "Hero Slider", icon: "🎠" },
  { value: "ABOUT", label: "About Section", icon: "ℹ️" },
  { value: "ICONS", label: "Icon Boxes", icon: "🔲" },
  { value: "CAUSES", label: "Causes Slider", icon: "❤️" },
  { value: "PROJECTS", label: "Projects Grid", icon: "🏗️" },
  { value: "EVENTS", label: "Events List", icon: "📅" },
  { value: "TESTIMONIALS", label: "Testimonials", icon: "💬" },
  { value: "BLOG", label: "Blog Posts", icon: "📰" },
  { value: "DONORS", label: "Donors/Partners", icon: "🤝" },
  { value: "GALLERY", label: "Photo Gallery", icon: "📷" },
  { value: "TEAM", label: "Team Members", icon: "👥" },
  { value: "FAQ", label: "FAQ Accordion", icon: "❓" },
  { value: "STATS", label: "Stats Counter", icon: "📊" },
  { value: "CTA", label: "Call to Action", icon: "📢" },
  { value: "VOLUNTEER", label: "Volunteer CTA", icon: "🙋" },
  { value: "SUBSCRIBE", label: "Newsletter", icon: "📧" },
  { value: "CONTACT_FORM", label: "Contact Form", icon: "✉️" },
  { value: "INSTAGRAM", label: "Instagram Feed", icon: "📸" },
  { value: "CUSTOM_HTML", label: "Custom HTML", icon: "🧩" },
  { value: "SPACER", label: "Spacer", icon: "↕️" },
];

interface SectionData {
  id?: string;
  type: string;
  title: string;
  order: number;
  isVisible: boolean;
  content: Record<string, unknown>;
}

interface PageData {
  id?: string;
  title: string;
  slug: string;
  metaDescription: string;
  metaKeywords: string;
  featuredImage: string;
  template: string;
  isPublished: boolean;
  sections: SectionData[];
}

interface Props {
  mode: "create" | "edit";
  initialData?: PageData;
}

export default function PageEditor({ mode, initialData }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [activeTab, setActiveTab] = useState<"builder" | "settings">("builder");
  const [page, setPage] = useState<PageData>(
    initialData || {
      title: "",
      slug: "",
      metaDescription: "",
      metaKeywords: "",
      featuredImage: "",
      template: "default",
      isPublished: false,
      sections: [],
    }
  );

  function handlePageChange(field: string, value: unknown) {
    setPage((prev) => ({ ...prev, [field]: value }));
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function addSection(type: string) {
    const label = SECTION_TYPES.find((s) => s.value === type)?.label || type;
    setPage((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          type,
          title: label,
          order: prev.sections.length,
          isVisible: true,
          content: {},
        },
      ],
    }));
    setShowAddBlock(false);
  }

  function removeSection(index: number) {
    if (!confirm("Remove this section?")) return;
    setPage((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i })),
    }));
  }

  function toggleSectionVisibility(index: number) {
    setPage((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === index ? { ...s, isVisible: !s.isVisible } : s
      ),
    }));
  }

  function moveSection(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= page.sections.length) return;
    setPage((prev) => {
      const arr = [...prev.sections];
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return { ...prev, sections: arr.map((s, i) => ({ ...s, order: i })) };
    });
  }

  function updateSectionField(index: number, field: string, value: unknown) {
    setPage((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  }

  function updateSectionContent(index: number, key: string, value: unknown) {
    setPage((prev) => ({
      ...prev,
      sections: prev.sections.map((s, i) =>
        i === index ? { ...s, content: { ...s.content, [key]: value } } : s
      ),
    }));
  }

  async function handleSave() {
    if (!page.title || !page.slug) {
      alert("Title and slug are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (res.ok) {
        router.push("/admin/pages");
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

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Tabs */}
        <div className="flex gap-1 mb-4">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === "builder" ? "text-white" : "bg-white"
            }`}
            style={activeTab === "builder" ? { backgroundColor: "#343877" } : { color: "#343877" }}
          >
            Page Builder
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === "settings" ? "text-white" : "bg-white"
            }`}
            style={activeTab === "settings" ? { backgroundColor: "#343877" } : { color: "#343877" }}
          >
            <Settings size={14} /> Page Settings
          </button>
        </div>

        {activeTab === "builder" ? (
          <div className="space-y-3">
            {/* Sections */}
            {page.sections.map((section, i) => {
              const typeDef = SECTION_TYPES.find((s) => s.value === section.type);
              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl shadow-sm border-l-4 transition-all ${
                    section.isVisible ? "" : "opacity-50"
                  }`}
                  style={{ borderLeftColor: section.isVisible ? "#343877" : "#dee2e6" }}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <GripVertical size={16} className="cursor-grab" style={{ color: "#9e9e9e" }} />
                    <span className="text-lg">{typeDef?.icon || "🧩"}</span>
                    <input
                      value={section.title}
                      onChange={(e) => updateSectionField(i, "title", e.target.value)}
                      className="flex-1 text-sm font-semibold bg-transparent border-none outline-none"
                      style={{ color: "#343877" }}
                      placeholder="Section title..."
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: "#eef2ff", color: "#5e5c8b" }}>
                      {typeDef?.label || section.type}
                    </span>
                    <div className="flex items-center gap-0.5 ml-2">
                      <button onClick={() => moveSection(i, "up")} disabled={i === 0} className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-30">
                        <ChevronUp size={14} />
                      </button>
                      <button onClick={() => moveSection(i, "down")} disabled={i === page.sections.length - 1} className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-30">
                        <ChevronDown size={14} />
                      </button>
                      <button onClick={() => toggleSectionVisibility(i)} className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                        {section.isVisible ? <Eye size={14} style={{ color: "#2ec774" }} /> : <EyeOff size={14} style={{ color: "#9e9e9e" }} />}
                      </button>
                      <button onClick={() => removeSection(i)} className="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                        <Trash2 size={14} style={{ color: "#f58ca6" }} />
                      </button>
                    </div>
                  </div>

                  {/* Section content editor */}
                  <div className="px-4 pb-4 border-t" style={{ borderColor: "#f1f3f5" }}>
                    <SectionContentEditor
                      type={section.type}
                      content={section.content}
                      onChange={(key, val) => updateSectionContent(i, key, val)}
                    />
                  </div>
                </div>
              );
            })}

            {page.sections.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <p className="text-lg mb-2" style={{ color: "#9e9e9e" }}>No sections yet</p>
                <p className="text-sm mb-4" style={{ color: "#bbb" }}>Add blocks to build your page</p>
              </div>
            )}

            {/* Add block button */}
            <div className="relative">
              <button
                onClick={() => setShowAddBlock(!showAddBlock)}
                className="w-full py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors hover:border-solid flex items-center justify-center gap-2"
                style={{ borderColor: "#343877", color: "#343877" }}
              >
                <Plus size={16} /> Add Section Block
              </button>

              {showAddBlock && (
                <div className="absolute z-20 top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border p-4 max-h-80 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-2">
                    {SECTION_TYPES.map((st) => (
                      <button
                        key={st.value}
                        onClick={() => addSection(st.value)}
                        className="text-left px-3 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                        style={{ color: "#343877" }}
                      >
                        <span className="text-base">{st.icon}</span>
                        <span className="font-medium text-xs">{st.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Settings tab */
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Page Title</label>
              <input
                value={page.title}
                onChange={(e) => {
                  handlePageChange("title", e.target.value);
                  if (mode === "create") handlePageChange("slug", autoSlug(e.target.value));
                }}
                className={inputClass}
                style={{ borderColor: "#dee2e6" }}
                placeholder="My Page Title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Slug (URL Path)</label>
              <div className="flex items-center gap-1">
                <span className="text-sm" style={{ color: "#9e9e9e" }}>/</span>
                <input
                  value={page.slug}
                  onChange={(e) => handlePageChange("slug", e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "#dee2e6" }}
                  placeholder="my-page-title"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Meta Description</label>
              <textarea
                value={page.metaDescription}
                onChange={(e) => handlePageChange("metaDescription", e.target.value)}
                rows={2}
                className={inputClass}
                style={{ borderColor: "#dee2e6" }}
                placeholder="SEO description..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Meta Keywords</label>
              <input
                value={page.metaKeywords}
                onChange={(e) => handlePageChange("metaKeywords", e.target.value)}
                className={inputClass}
                style={{ borderColor: "#dee2e6" }}
                placeholder="keyword1, keyword2, ..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Featured Image</label>
                <input
                  value={page.featuredImage}
                  onChange={(e) => handlePageChange("featuredImage", e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "#dee2e6" }}
                  placeholder="/images/..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>Template</label>
                <select
                  value={page.template}
                  onChange={(e) => handlePageChange("template", e.target.value)}
                  className={inputClass}
                  style={{ borderColor: "#dee2e6" }}
                >
                  <option value="default">Default</option>
                  <option value="home">Home</option>
                  <option value="full-width">Full Width</option>
                  <option value="sidebar">With Sidebar</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="w-64 shrink-0 space-y-4">
        {/* Publish box */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-bold mb-3" style={{ color: "#343877" }}>Publish</h3>
          <div className="flex items-center gap-2 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={page.isPublished}
                onChange={(e) => handlePageChange("isPublished", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
            </label>
            <span className="text-sm font-medium" style={{ color: page.isPublished ? "#2ec774" : "#9e9e9e" }}>
              {page.isPublished ? "Published" : "Draft"}
            </span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ backgroundColor: "#2ec774" }}
          >
            <Save size={14} />
            {saving ? "Saving..." : mode === "edit" ? "Update Page" : "Create Page"}
          </button>
        </div>

        {/* Quick info */}
        {page.sections.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-bold mb-2" style={{ color: "#343877" }}>Sections ({page.sections.length})</h3>
            <div className="space-y-1">
              {page.sections.map((s, i) => {
                const td = SECTION_TYPES.find((t) => t.value === s.type);
                return (
                  <div
                    key={i}
                    className="text-xs flex items-center gap-1.5 py-1"
                    style={{ color: s.isVisible ? "#343877" : "#9e9e9e" }}
                  >
                    <span>{td?.icon}</span>
                    <span className="truncate">{s.title || td?.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Section content editors per type */
function SectionContentEditor({
  type,
  content,
  onChange,
}: {
  type: string;
  content: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";
  const style = { borderColor: "#dee2e6" };

  switch (type) {
    case "BANNER":
      return (
        <div className="pt-3 space-y-2">
          <input value={(content.heading as string) || ""} onChange={(e) => onChange("heading", e.target.value)} placeholder="Banner heading..." className={inputClass} style={style} />
          <input value={(content.backgroundImage as string) || ""} onChange={(e) => onChange("backgroundImage", e.target.value)} placeholder="Background image URL (optional)" className={inputClass} style={style} />
        </div>
      );
    case "RICH_TEXT":
    case "CUSTOM_HTML":
      return (
        <div className="pt-3">
          <textarea value={(content.html as string) || ""} onChange={(e) => onChange("html", e.target.value)} rows={6} placeholder="HTML content..." className={`${inputClass} font-mono text-xs`} style={style} />
        </div>
      );
    case "IMAGE_TEXT":
      return (
        <div className="pt-3 space-y-2">
          <input value={(content.image as string) || ""} onChange={(e) => onChange("image", e.target.value)} placeholder="Image URL" className={inputClass} style={style} />
          <textarea value={(content.text as string) || ""} onChange={(e) => onChange("text", e.target.value)} rows={3} placeholder="Text content..." className={inputClass} style={style} />
          <select value={(content.layout as string) || "image-left"} onChange={(e) => onChange("layout", e.target.value)} className={inputClass} style={style}>
            <option value="image-left">Image Left</option>
            <option value="image-right">Image Right</option>
          </select>
        </div>
      );
    case "CTA":
    case "VOLUNTEER":
      return (
        <div className="pt-3 space-y-2">
          <input value={(content.heading as string) || ""} onChange={(e) => onChange("heading", e.target.value)} placeholder="CTA heading..." className={inputClass} style={style} />
          <input value={(content.text as string) || ""} onChange={(e) => onChange("text", e.target.value)} placeholder="Supporting text..." className={inputClass} style={style} />
          <div className="grid grid-cols-2 gap-2">
            <input value={(content.buttonText as string) || ""} onChange={(e) => onChange("buttonText", e.target.value)} placeholder="Button text" className={inputClass} style={style} />
            <input value={(content.buttonLink as string) || ""} onChange={(e) => onChange("buttonLink", e.target.value)} placeholder="Button link" className={inputClass} style={style} />
          </div>
          <input value={(content.backgroundImage as string) || ""} onChange={(e) => onChange("backgroundImage", e.target.value)} placeholder="Background image URL" className={inputClass} style={style} />
        </div>
      );
    case "STATS":
      return (
        <div className="pt-3">
          <textarea
            value={(content.stats as string) || ""}
            onChange={(e) => onChange("stats", e.target.value)}
            rows={4}
            placeholder={'JSON array, e.g.:\n[{"label":"Communities","value":"150+"},{"label":"Beneficiaries","value":"50K+"}]'}
            className={`${inputClass} font-mono text-xs`}
            style={style}
          />
        </div>
      );
    case "FAQ":
      return (
        <div className="pt-3">
          <textarea
            value={(content.items as string) || ""}
            onChange={(e) => onChange("items", e.target.value)}
            rows={5}
            placeholder={'JSON array, e.g.:\n[{"question":"What is AGREDS?","answer":"AGREDS is..."}]'}
            className={`${inputClass} font-mono text-xs`}
            style={style}
          />
        </div>
      );
    case "SPACER":
      return (
        <div className="pt-3">
          <select value={(content.height as string) || "md"} onChange={(e) => onChange("height", e.target.value)} className={inputClass} style={style}>
            <option value="sm">Small (32px)</option>
            <option value="md">Medium (64px)</option>
            <option value="lg">Large (96px)</option>
            <option value="xl">Extra Large (128px)</option>
          </select>
        </div>
      );
    default:
      // Data-driven sections (HERO, CAUSES, PROJECTS, etc.) — auto-populated from DB
      return (
        <div className="pt-3">
          <p className="text-xs italic" style={{ color: "#9e9e9e" }}>
            This section auto-populates from the database. No additional configuration needed.
          </p>
        </div>
      );
  }
}
