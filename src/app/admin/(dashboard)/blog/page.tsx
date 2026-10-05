import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ItemActions from "@/components/admin/ItemActions";
import SearchInput from "@/components/admin/SearchInput";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const params = await searchParams;
  const { page, q, take, skip } = getPagination(params);
  const where = q
    ? { OR: [
        { title: { contains: q, mode: "insensitive" as const } },
        { slug: { contains: q, mode: "insensitive" as const } },
        { excerpt: { contains: q, mode: "insensitive" as const } },
      ] }
    : {};
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
      skip,
      take,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Blog Posts</h1>
          <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage news and blog articles</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput q={q} action="/admin/blog" placeholder="Search posts…" />
          <Link href="/admin/blog/new" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: "#2ec774" }}>+ New Post</Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p style={{ color: "#9e9e9e" }}>{q ? `No posts matching "${q}".` : "No posts yet."}</p>
        </div>
      ) : (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Image</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Title</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Author</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Published</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: "#343877" }}>Status</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: "#343877" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t" style={{ borderColor: "#f1f3f5" }}>
                <td className="px-4 py-3">
                  {post.image ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : <div className="w-16 h-12 rounded bg-gray-100" />}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium" style={{ color: "#343877" }}>{post.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9e9e9e" }}>/media/news/{post.slug}</p>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>{post.author?.name || "—"}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "#555" }}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: post.isPublished ? "#2ec77415" : "#f58ca615", color: post.isPublished ? "#2ec774" : "#f58ca6" }}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3"><ItemActions id={post.id} isActive={post.isPublished} editHref={`/admin/blog/${post.id}/edit`} deleteAction="blog" toggleAction="blog" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      <Pagination page={page} total={total} pageSize={take} base="/admin/blog" params={{ q }} />
    </div>
  );
}
