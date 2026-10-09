import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Photo Gallery | AG Care Ghana",
  description:
    "Browse photos from AG Care Ghana programmes and events across Ghana.",
};

export default async function PhotosPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  // Fallback images if gallery is empty
  const fallbackImages = [
    { image: "/images/education/education-model-early-childhood-education-centre.jpg", caption: "Early Childhood Education Centre", category: "Education" },
    { image: "/images/community-infrastructure/classroom-block-at-kokosiase.jpg", caption: "Classroom Block at Kokosiase", category: "Community Infrastructure" },
    { image: "/images/lifeline/skills-training.jpg", caption: "Skills Training — Lifeline Project", category: "Lifeline" },
    { image: "/images/community-infrastructure/teachers-block-at-namiyela.jpg", caption: "Teachers' Block at Namiyela", category: "Community Infrastructure" },
    { image: "/images/education/school-health-session-education.jpg", caption: "School Health Session", category: "Education" },
    { image: "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg", caption: "Soap Making Training — AG Women, Tamale", category: "Lifeline" },
    { image: "/images/community-infrastructure/symbolic-handing-over-at-kokosiase.jpg", caption: "Symbolic Handing Over at Kokosiase", category: "Community Infrastructure" },
    { image: "/images/education/education-opening-of-early-childhood-educationn-centre-at-namenboku.jpg", caption: "Opening of Early Childhood Education Centre — Namenboku", category: "Education" },
    { image: "/images/lifeline/photo-20241023-105706.jpg", caption: "Livelihoods Training — Lifeline Project", category: "Lifeline" },
  ];

  const gallery = images.length > 0 ? images : fallbackImages;

  return (
    <>
      <PageBanner
        title="Photo Gallery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media/news" },
          { label: "Photos" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Gallery
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Photos from the Field
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden cursor-pointer"
                style={{ aspectRatio: i % 3 === 0 ? "4/3" : "1/1" }}
              >
                <Image
                  src={item.image}
                  alt={item.caption || "AG Care Ghana photo"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {item.caption && (
                      <p className="text-white text-sm font-semibold">
                        {item.caption}
                      </p>
                    )}
                    {item.category && (
                      <span className="text-white/70 text-xs">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
