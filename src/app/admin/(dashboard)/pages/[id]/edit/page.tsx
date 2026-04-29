import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageEditor from "../../PageEditor";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Page: {page.title}</h1>
      <PageEditor
        mode="edit"
        initialData={{
          id: page.id,
          title: page.title,
          slug: page.slug,
          metaDescription: page.metaDescription || "",
          metaKeywords: page.metaKeywords || "",
          featuredImage: page.featuredImage || "",
          template: page.template,
          isPublished: page.isPublished,
          sections: page.sections.map((s) => ({
            id: s.id,
            type: s.type,
            title: s.title || "",
            order: s.order,
            isVisible: s.isVisible,
            content: (s.content as Record<string, unknown>) || {},
          })),
        }}
      />
    </div>
  );
}
