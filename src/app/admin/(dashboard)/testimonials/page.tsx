import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Testimonials</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage testimonials for the homepage</p>
        </div>
        <Link href="/admin/testimonials/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Add Testimonial</Link>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-sm italic line-clamp-2" style={{ color: "#555" }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold" style={{ color: "#343877" }}>{t.authorName}</span>
                {t.authorRole && <span className="text-xs" style={{ color: "#9e9e9e" }}>— {t.authorRole}</span>}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded mt-2 inline-block" style={{ backgroundColor: t.isActive ? "#2ec77415" : "#f58ca615", color: t.isActive ? "#2ec774" : "#f58ca6" }}>
                {t.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <ItemActions id={t.id} isActive={t.isActive} editHref={`/admin/testimonials/${t.id}/edit`} deleteAction="testimonial" toggleAction="testimonial" />
          </div>
        ))}
      </div>
    </div>
  );
}
