import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import PageBanner from "@/components/public/PageBanner";
import PhotoAlbumGrid from "@/components/public/PhotoAlbumGrid";

interface Props {
  params: Promise<{ album: string }>;
}

async function getAlbum(slug: string) {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });
  const categories = new Set(images.map((i) => i.category || "Other"));
  const name = Array.from(categories).find((c) => slugify(c) === slug);
  if (!name) return null;
  return {
    name,
    photos: images.filter((i) => (i.category || "Other") === name),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: slug } = await params;
  const album = await getAlbum(slug);
  if (!album) return { title: "Not Found | AG Care Ghana" };
  return {
    title: `${album.name} Photos | AG Care Ghana`,
    description: `Photos from ${album.name} — AG Care Ghana.`,
  };
}

export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params;
  const album = await getAlbum(slug);
  if (!album) notFound();

  return (
    <>
      <PageBanner
        title={album.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media/news" },
          { label: "Photos", href: "/media/photos" },
          { label: album.name },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Link
              href="/media/photos"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: "#343877" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Albums
            </Link>
            <h2 className="font-bold mt-4" style={{ fontSize: 32, color: "#343877" }}>
              {album.name}
            </h2>
            <p style={{ color: "#777" }}>
              {album.photos.length} {album.photos.length === 1 ? "photo" : "photos"} — click any photo to view it full size.
            </p>
          </div>

          <PhotoAlbumGrid
            photos={album.photos.map((p) => ({ image: p.image, caption: p.caption }))}
          />
        </div>
      </section>
    </>
  );
}
