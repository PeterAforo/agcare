import Image from "next/image";
import { prisma } from "@/lib/prisma";
import MediaActions from "./MediaActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination, PAGE_SIZE } from "@/lib/pagination";

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params, PAGE_SIZE * 2);
  const where = q
    ? { OR: [
        { filename: { contains: q, mode: "insensitive" as const } },
        { url: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};

  const [files, total] = await Promise.all([
    prisma.mediaFile.findMany({ where, orderBy: { uploadedAt: "desc" }, skip, take }),
    prisma.mediaFile.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Media Library</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
            {total} file{total === 1 ? "" : "s"} uploaded
          </p>
        </div>
        <SearchInput q={q} action="/admin/media" placeholder="Search media…" />
      </div>

      {files.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>{q ? `No media matching "${q}".` : "No media uploaded yet."}</p>
          <p className="text-xs mt-2" style={{ color: "#bbb" }}>
            Upload images from any content form (causes, projects, pages, etc.)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => {
            const isImage = file.mimeType?.startsWith("image/");
            return (
              <div key={file.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                <div className="relative aspect-square">
                  {isImage ? (
                    <Image
                      src={file.url}
                      alt={file.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 16vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-3xl">
                      📄
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium truncate" style={{ color: "#343877" }} title={file.filename}>
                    {file.filename}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px]" style={{ color: "#9e9e9e" }}>
                      {file.size ? `${(file.size / 1024).toFixed(0)} KB` : "—"}
                    </span>
                    <MediaActions id={file.id} url={file.url} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/media" params={{ q }} />
    </div>
  );
}
