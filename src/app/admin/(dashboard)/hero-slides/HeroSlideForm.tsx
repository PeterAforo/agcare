"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createHeroSlide, updateHeroSlide } from "./actions";
import ImageUpload from "@/components/admin/ImageUpload";

interface HeroSlideData {
  id?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  mobileImage: string;
  tabletImage: string;
  order: number;
  isActive: boolean;
}

interface Props {
  initialData?: HeroSlideData;
  mode: "create" | "edit";
}

export default function HeroSlideForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<HeroSlideData>(
    initialData || {
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
      image: "",
      mobileImage: "",
      tabletImage: "",
      order: 0,
      isActive: true,
    }
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (mode === "edit" && form.id) {
        const { id, ...data } = form;
        await updateHeroSlide(id, data);
      } else {
        const { id: _id, ...data } = form;
        await createHeroSlide(data);
      }
      router.push("/admin/hero-slides");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
          Title
        </label>
        <textarea
          name="title"
          required
          rows={2}
          value={form.title}
          onChange={handleChange}
          placeholder='Line 1\nLine 2 (use line breaks for two-line titles)'
          className={inputClass}
          style={{ borderColor: "#dee2e6" }}
        />
        <p className="text-xs mt-1" style={{ color: "#9e9e9e" }}>
          Use a new line to separate the two title lines (line 1 = white, line 2 = yellow Storytella)
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
          Subtitle
        </label>
        <textarea
          name="subtitle"
          rows={3}
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Slide description text"
          className={inputClass}
          style={{ borderColor: "#dee2e6" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
            CTA Text
          </label>
          <input
            name="ctaText"
            value={form.ctaText}
            onChange={handleChange}
            placeholder="Learn More"
            className={inputClass}
            style={{ borderColor: "#dee2e6" }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
            CTA Link
          </label>
          <input
            name="ctaLink"
            value={form.ctaLink}
            onChange={handleChange}
            placeholder="#about"
            className={inputClass}
            style={{ borderColor: "#dee2e6" }}
          />
        </div>
      </div>

      <div>
        <ImageUpload
          label="Image (Desktop)"
          value={form.image}
          onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <ImageUpload
            label="Tablet Image"
            value={form.tabletImage}
            onChange={(url) => setForm((prev) => ({ ...prev, tabletImage: url }))}
          />
        </div>
        <div>
          <ImageUpload
            label="Mobile Image"
            value={form.mobileImage}
            onChange={(url) => setForm((prev) => ({ ...prev, mobileImage: url }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
            Order
          </label>
          <input
            name="order"
            type="number"
            value={form.order}
            onChange={handleChange}
            className={inputClass}
            style={{ borderColor: "#dee2e6" }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#343877" }}>
            Status
          </label>
          <select
            name="isActive"
            value={form.isActive ? "true" : "false"}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                isActive: e.target.value === "true",
              }))
            }
            className={inputClass}
            style={{ borderColor: "#dee2e6" }}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          style={{ backgroundColor: "#2ec774" }}
        >
          {saving ? "Saving..." : mode === "edit" ? "Update Slide" : "Create Slide"}
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
