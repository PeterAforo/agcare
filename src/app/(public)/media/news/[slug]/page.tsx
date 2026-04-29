import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/public/PageBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Not Found | AGREDS" };
  return {
    title: `${post.title} | AGREDS`,
    description: post.excerpt || post.title,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, avatar: true } } },
  });

  if (!post || !post.isPublished) notFound();

  return (
    <>
      <PageBanner
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/media/news" },
          { label: post.title },
        ]}
      />

      <article className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: "#9e9e9e" }}>
              {post.publishedAt && (
                <time>
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>By {post.author.name}</span>
                </>
              )}
              {post.badge && (
                <>
                  <span>•</span>
                  <span
                    className="text-white text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: post.badgeColor || "#49C2DF" }}
                  >
                    {post.badge}
                  </span>
                </>
              )}
            </div>

            {/* Featured Image */}
            {post.image && (
              <div
                className="relative rounded-lg overflow-hidden mb-10"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              style={{ color: "#333", lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* Back */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: "#dee2e6" }}>
              <Link
                href="/media/news"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: "#343877" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
