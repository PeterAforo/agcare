import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params, 24);
  const where = q ? { caption: { contains: q, mode: "insensitive" as const } } : {};
  const [images, total] = await Promise.all([
    prisma.galleryImage.findMany({ where, orderBy: { order: "asc" }, skip, take }),
    prisma.galleryImage.count({ where }),
  ]);

  async function handleDelete(id: string) {
    "use server";
    const { getSessionUser, hasMinRole } = await import("@/lib/rbac");
    const user = await getSessionUser();
    if (!user || !hasMinRole(user.role, "EDITOR")) {
      throw new Error("Unauthorized");
    }
    await prisma.galleryImage.delete({ where: { id } });
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/admin/gallery");
    revalidatePath("/media/photos");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Photo Gallery</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage gallery images</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/gallery" placeholder="Search captions…" />
          <Link href="/admin/gallery/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ Upload Photos</Link>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>{q ? `No images matching "${q}".` : "No gallery images yet."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <Image src={img.image} alt={img.caption || "Gallery"} fill className="object-cover" sizes="200px" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <form action={handleDelete.bind(null, img.id)}>
                  <button
                    type="submit"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-red-500 px-3 py-1 rounded text-xs font-bold"
                  >
                    Delete
                  </button>
                </form>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-[10px] truncate">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/gallery" params={{ q }} />
    </div>
  );
}
