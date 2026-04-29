import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import SectionRenderer from "@/components/public/SectionRenderer";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const page = await prisma.page.findUnique({ where: { slug: slugPath } });

  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription || undefined,
    keywords: page.metaKeywords || undefined,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  const page = await prisma.page.findUnique({
    where: { slug: slugPath, isPublished: true },
    include: {
      sections: {
        where: { isVisible: true },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!page) notFound();

  return (
    <div>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
