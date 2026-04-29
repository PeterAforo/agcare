import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HeroSlideActions from "./HeroSlideActions";

export default async function HeroSlidesPage() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>
            Hero Slides
          </h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
            Manage homepage hero slider
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#2ec774" }}
        >
          + Add Slide
        </Link>
      </div>

      {slides.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>No hero slides yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-5"
            >
              {/* Thumbnail */}
              <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-sm truncate"
                  style={{ color: "#343877" }}
                >
                  {slide.title.split("\n")[0]}
                </h3>
                <p className="text-xs mt-1 truncate" style={{ color: "#9e9e9e" }}>
                  {slide.subtitle?.slice(0, 80)}...
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: slide.isActive ? "#2ec77415" : "#f58ca615",
                      color: slide.isActive ? "#2ec774" : "#f58ca6",
                    }}
                  >
                    {slide.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="text-[10px]" style={{ color: "#9e9e9e" }}>
                    Order: {slide.order}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <HeroSlideActions id={slide.id} isActive={slide.isActive} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
