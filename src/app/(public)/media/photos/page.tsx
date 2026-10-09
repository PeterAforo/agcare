import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Photo Gallery | AG Care Ghana",
  description:
    "Browse photo albums from AG Care Ghana programmes and events across Ghana.",
};

export default async function PhotosPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  // Fallback albums if the gallery is empty
  const fallbackImages = [
    { image: "/images/education/education-model-early-childhood-education-centre.jpg", caption: "Early Childhood Education Centre", category: "Education" },
    { image: "/images/education/photo-0253.jpg", caption: "Pupils with Learning Materials", category: "Education" },
    { image: "/images/education/school-health-session-education.jpg", caption: "School Health Session", category: "Education" },
    { image: "/images/community-infrastructure/classroom-block-at-kokosiase.jpg", caption: "Classroom Block at Kokosiase", category: "Community Infrastructure" },
    { image: "/images/community-infrastructure/teachers-block-at-namiyela.jpg", caption: "Teachers' Block at Namiyela", category: "Community Infrastructure" },
    { image: "/images/community-infrastructure/symbolic-handing-over-at-kokosiase.jpg", caption: "Symbolic Handing Over at Kokosiase", category: "Community Infrastructure" },
    { image: "/images/lifeline/skills-training.jpg", caption: "Skills Training — Lifeline Project", category: "Lifeline" },
    { image: "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg", caption: "Soap Making Training — AG Women, Tamale", category: "Lifeline" },
    { image: "/images/lifeline/photo-20241023-105706.jpg", caption: "Livelihoods Training — Lifeline Project", category: "Lifeline" },
  ];

  const gallery = images.length > 0 ? images : fallbackImages;

  // Group photos into albums by category
  const albumMap = new Map<string, { name: string; cover: string; count: number }>();
  for (const item of gallery) {
    const name = item.category || "Other";
    const existing = albumMap.get(name);
    if (existing) {
      existing.count += 1;
    } else {
      albumMap.set(name, { name, cover: item.image, count: 1 });
    }
  }
  const albums = Array.from(albumMap.values());

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
              Photo Albums
            </h2>
            <p className="mt-3" style={{ color: "#777" }}>
              Browse photos from our programmes and events across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Link
                key={album.name}
                href={`/media/photos/${slugify(album.name)}`}
                className="relative group rounded-lg overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={album.cover}
                  alt={album.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-colors duration-300"
                  style={{ backgroundColor: "rgba(0,0,0,.45)" }}
                >
                  <h3 className="text-white font-bold text-xl mb-2">{album.name}</h3>
                  <span
                    className="text-white text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#49C2DF" }}
                  >
                    {album.count} {album.count === 1 ? "photo" : "photos"}
                  </span>
                  <span className="text-white/80 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Album →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
