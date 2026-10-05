import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenericForm from "@/components/admin/GenericForm";
import type { FieldDef } from "@/components/admin/GenericForm";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", required: true },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Content (HTML)", type: "textarea" },
  { name: "image", label: "Featured Image", type: "image" },
  { name: "badge", label: "Badge / Category", type: "text", half: true },
  { name: "badgeColor", label: "Badge Color", type: "color", half: true },
  { name: "publishedAt", label: "Publish Date", type: "date", half: true },
  { name: "isPublished", label: "Status", type: "select", half: true, options: [{ label: "Published", value: "true" }, { label: "Draft", value: "false" }] },
];

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Blog Post</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <GenericForm fields={fields} apiModel="blog" mode="edit" backHref="/admin/blog" initialData={{
          id: post.id, title: post.title, slug: post.slug, excerpt: post.excerpt || "",
          content: post.content || "", image: post.image || "",
          badge: post.badge || "", badgeColor: post.badgeColor || "#49C2DF",
          publishedAt: post.publishedAt ? post.publishedAt.toISOString().split("T")[0] : "",
          isPublished: String(post.isPublished),
        }} />
      </div>
    </div>
  );
}
