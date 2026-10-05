import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image", label: "Image", type: "image" },
  { name: "location", label: "Location", type: "text", placeholder: "Accra, Ghana" },
  { name: "startDate", label: "Start Date", type: "date", required: true, half: true },
  { name: "endDate", label: "End Date", type: "date", half: true },
  { name: "time", label: "Time", type: "text", half: true, placeholder: "9:00 AM - 4:00 PM" },
  { name: "isPublished", label: "Status", type: "select", half: true, options: [{ label: "Published", value: "true" }, { label: "Draft", value: "false" }] },
];

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Add Event</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="event" mode="create" backHref="/admin/events" initialData={{ isPublished: "true" }} />
      </div>
    </div>
  );
}
