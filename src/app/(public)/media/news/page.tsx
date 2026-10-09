import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "News & Updates | AG Care Ghana",
  description:
    "Latest news and updates from AG Care Ghana — stories of impact from across Ghana.",
};

export default async function NewsPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <>
      <PageBanner
        title="News & Updates"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media/news" },
          { label: "News & Updates" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Stay Informed
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Latest News
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: "#9e9e9e" }}>
                No news published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
                  style={{ boxShadow: "0 0 15px rgba(15,13,13,0.06)" }}
                >
                  {post.image && (
                    <div className="relative" style={{ aspectRatio: "16/10" }}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {post.badge && (
                        <span
                          className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded"
                          style={{ backgroundColor: post.badgeColor || "#49C2DF" }}
                        >
                          {post.badge}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "#9e9e9e" }}>
                      {post.publishedAt && (
                        <time>
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      )}
                      {post.author && (
                        <>
                          <span>•</span>
                          <span>{post.author.name}</span>
                        </>
                      )}
                    </div>
                    <h3
                      className="font-bold mb-2"
                      style={{ fontSize: 18, color: "#343877" }}
                    >
                      <Link href={`/media/news/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p
                        className="text-sm leading-relaxed line-clamp-3"
                        style={{ color: "#555" }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
