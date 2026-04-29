import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image", label: "Image URL", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "startDate", label: "Start Date", type: "date", required: true, half: true },
  { name: "endDate", label: "End Date", type: "date", half: true },
  { name: "time", label: "Time", type: "text", half: true },
  { name: "isPublished", label: "Status", type: "select", half: true, options: [{ label: "Published", value: "true" }, { label: "Draft", value: "false" }] },
];

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Event</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="event" mode="edit" backHref="/admin/events" initialData={{
          id: event.id, title: event.title, description: event.description || "",
          image: event.image || "", location: event.location || "",
          startDate: event.startDate.toISOString().split("T")[0],
          endDate: event.endDate ? event.endDate.toISOString().split("T")[0] : "",
          time: event.time || "", isPublished: String(event.isPublished),
        }} />
      </div>
    </div>
  );
}
