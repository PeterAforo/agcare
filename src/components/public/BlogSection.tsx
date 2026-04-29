"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  badge: string | null;
  badgeColor: string;
  publishedAt: string | null;
}

function fmtDate(d: string | null) {
  if (!d) return "";
  const dt = new Date(d);
  const day = String(dt.getDate()).padStart(2, "0");
  const mon = dt.toLocaleDateString("en-US", { month: "short" });
  const yr = String(dt.getFullYear()).slice(-2);
  return `${day} ${mon}' ${yr}`;
}

/* layout pattern per group of 4: [style-1 narrow, style-2 wide, style-2 wide, style-1 narrow] */
function getLayout(i: number) {
  const pos = i % 4;
  if (pos === 0 || pos === 3) return { style: 1 as const, colClass: "xl:col-span-4 lg:col-span-5 md:col-span-6" };
  return { style: 2 as const, colClass: "xl:col-span-8 lg:col-span-7 md:col-span-6" };
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="py-20 lg:py-28 relative" id="blog">
      {/* blog__bg — right side, vertically centered */}
      <Image
        src="/images/blog_bg.png"
        alt=""
        width={600}
        height={800}
        className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none hidden lg:block h-auto w-auto"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading — centered */}
        <div className="text-center max-w-[600px] mx-auto mb-[50px]">
          <span className="inline-block text-secondary font-bold mb-[10px] text-sm">
            News
          </span>
          <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] leading-tight mb-0">
            <span>AGREDS </span>
            <span className="font-light">Updates</span>
          </h2>
        </div>

        {/* Blog grid — 12 columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {posts.map((post, i) => {
            const { style, colClass } = getLayout(i);

            return (
              <motion.div
                key={post.id}
                className={colClass}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {style === 1 ? (
                  /* ── Style 1: White card with image + content below ── */
                  <div className="bg-white p-[15px] shadow-[0_3px_15px_2px_rgba(0,0,0,0.06)] mb-[50px] mx-2">
                    {/* Image with badge */}
                    <div className="relative overflow-hidden">
                      <div style={{ paddingTop: "76.47%" }} />
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      {post.badge && (
                        <span
                          className="absolute bottom-[-16px] left-[13px] z-10 text-white text-[14px] font-bold px-[13px] py-[6px] rounded"
                          style={{ backgroundColor: post.badgeColor }}
                        >
                          {post.badge}
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div className="pt-[37px] px-[13px] pb-[15px]">
                      <h6 className="font-bold leading-[30px] mb-[15px]">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-primary hover:opacity-75 transition-opacity"
                        >
                          {post.title}
                        </Link>
                      </h6>
                      <p className="text-[14px] leading-relaxed text-gray-600 mb-0">
                        {post.excerpt}
                      </p>
                      {/* Details */}
                      <div className="flex justify-between items-center mt-[20px] text-[14px] font-medium text-gray-500">
                        <span>{fmtDate(post.publishedAt)}</span>
                        <span className="flex items-center gap-[8px]">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          {[18, 42, 29, 33][i % 4]}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── Style 2: Full image overlay card ── */
                  <div className="relative flex flex-col justify-end text-white min-h-[541px] p-[30px] overflow-hidden mb-[50px] mx-2">
                    {/* BG image */}
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(53,57,118,.7)" }} />
                    {/* Content */}
                    <div className="relative z-10 w-full max-w-[440px]">
                      {post.badge && (
                        <span
                          className="inline-block text-white text-[14px] font-bold px-[13px] py-[6px] rounded"
                          style={{ backgroundColor: post.badgeColor }}
                        >
                          {post.badge}
                        </span>
                      )}
                      <h6 className="font-bold leading-[30px] mb-[15px] mt-[27px]">
                        <Link href={`/blog/${post.slug}`} className="text-white hover:opacity-75 transition-opacity">
                          {post.title}
                        </Link>
                      </h6>
                      <p className="text-[14px] leading-relaxed text-white/80 mb-0">
                        {post.excerpt}
                      </p>
                    </div>
                    {/* Details — bottom */}
                    <div className="relative z-10 flex justify-between items-center mt-4 text-[14px] font-medium text-white/80 w-full">
                      <span>{fmtDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-[8px]">
                        <MessageSquare className="w-4 h-4" />
                        {[18, 42, 29, 33][i % 4]}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
