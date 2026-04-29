import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "image", label: "Image URL", type: "text", required: true, placeholder: "/images/photo.jpg" },
  { name: "caption", label: "Caption", type: "text" },
  { name: "category", label: "Category", type: "text", half: true, placeholder: "Health, Education, etc." },
  { name: "order", label: "Order", type: "number", half: true },
];

export default function NewGalleryImagePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Upload Gallery Image</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="gallery" mode="create" backHref="/admin/gallery" initialData={{ order: 0 }} />
      </div>
    </div>
  );
}
