"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Photo {
  image: string;
  caption: string | null;
}

export default function PhotoAlbumGrid({ photos }: { photos: Photo[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? null : (c - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c === null ? null : (c + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close, prev, next]);

  const active = current !== null ? photos[current] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className="relative group rounded-lg overflow-hidden cursor-pointer text-left"
            style={{ aspectRatio: "4/3" }}
            aria-label={photo.caption || `Photo ${i + 1}`}
          >
            <Image
              src={photo.image}
              alt={photo.caption || "AG Care Ghana photo"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
              <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption && (
                  <p className="text-white text-sm font-semibold">{photo.caption}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,.92)" }}
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[82vh] mx-14 sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={active.caption || "AG Care Ghana photo"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}

          {/* Caption + counter */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-center px-4 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {active.caption && (
              <p className="text-white text-sm font-semibold mb-1">{active.caption}</p>
            )}
            <span className="text-white/60 text-xs">
              {(current ?? 0) + 1} / {photos.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
