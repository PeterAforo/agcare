import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/public/PageBanner";
import Pagination from "@/components/admin/Pagination";
import { getPagination } from "@/lib/pagination";
import { Search as SearchIcon, FileText, Newspaper, Heart, FolderKanban, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

const PAGE_SIZE = 10;

interface Result {
  type: string;
  label: string;
  title: string;
  excerpt?: string | null;
  href: string;
  icon: ReactNode;
  date?: Date | null;
}

const icons = {
  page: <FileText className="w-4 h-4" style={{ color: "#343877" }} />,
  blog: <Newspaper className="w-4 h-4" style={{ color: "#49C2DF" }} />,
  cause: <Heart className="w-4 h-4" style={{ color: "#f58ca6" }} />,
  project: <FolderKanban className="w-4 h-4" style={{ color: "#2ec774" }} />,
  event: <Calendar className="w-4 h-4" style={{ color: "#efc940" }} />,
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const { page, q } = getPagination(params, PAGE_SIZE);
  const skip = (page - 1) * PAGE_SIZE;

  let results: Result[] = [];
  let total = 0;

  if (q) {
    const contains = { contains: q, mode: "insensitive" as const };
    const [pages, posts, causes, projects, events] = await Promise.all([
      prisma.page.findMany({ where: { isPublished: true, OR: [{ title: contains }, { slug: contains }] } }),
      prisma.blogPost.findMany({ where: { isPublished: true, OR: [{ title: contains }, { excerpt: contains }, { content: contains }] } }),
      prisma.cause.findMany({ where: { isActive: true, OR: [{ title: contains }, { description: contains }] } }),
      prisma.project.findMany({ where: { isPublished: true, OR: [{ title: contains }, { description: contains }] } }),
      prisma.event.findMany({ where: { isPublished: true, OR: [{ title: contains }, { description: contains }, { location: contains }] } }),
    ]);

    results = [
      ...posts.map((p) => ({ type: "News", label: "News & Blog", title: p.title, excerpt: p.excerpt, href: `/media/news/${p.slug}`, icon: icons.blog, date: p.publishedAt })),
      ...pages.map((p) => ({ type: "Page", label: "Page", title: p.title, excerpt: p.metaDescription, href: `/${p.slug}`, icon: icons.page, date: null })),
      ...causes.map((c) => ({ type: "Cause", label: "Programme", title: c.title, excerpt: c.description?.slice(0, 160), href: "/causes/programs", icon: icons.cause, date: null })),
      ...projects.map((p) => ({ type: "Project", label: "Project", title: p.title, excerpt: p.description?.slice(0, 160), href: "/causes/projects", icon: icons.project, date: null })),
      ...events.map((e) => ({ type: "Event", label: "Event", title: e.title, excerpt: e.description?.slice(0, 160) || e.location, href: "/media/news", icon: icons.event, date: e.startDate })),
    ];
    total = results.length;
    results = results.slice(skip, skip + PAGE_SIZE);
  }

  return (
    <>
      <PageBanner
        title="Search"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form action="/search" method="get" className="relative mb-10">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#9e9e9e" }} />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Search news, pages, programmes, projects…"
                className="w-full pl-14 pr-32 py-4 rounded-full border-2 text-base focus:outline-none"
                style={{ borderColor: "#343877" }}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wide"
                style={{ backgroundColor: "#2ec774" }}
              >
                Search
              </button>
            </form>

            {q && (
              <p className="text-sm mb-8" style={{ color: "#9e9e9e" }}>
                {total} result{total === 1 ? "" : "s"} for &ldquo;<span style={{ color: "#343877" }}>{q}</span>&rdquo;
              </p>
            )}

            {q && results.length === 0 && (
              <div className="text-center py-16">
                <SearchIcon className="w-12 h-12 mx-auto mb-4" style={{ color: "#dee2e6" }} />
                <p style={{ color: "#9e9e9e" }}>No results found. Try different keywords.</p>
              </div>
            )}

            <div className="space-y-4">
              {results.map((r, i) => (
                <Link
                  key={`${r.href}-${i}`}
                  href={r.href}
                  className="block bg-white rounded-xl p-5 shadow-sm border transition-transform hover:-translate-y-0.5"
                  style={{ borderColor: "#f1f3f5" }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {r.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#9e9e9e" }}>
                      {r.label}
                    </span>
                    {r.date && (
                      <span className="text-[10px]" style={{ color: "#bbb" }}>
                        · {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold mb-1" style={{ color: "#343877" }}>{r.title}</h3>
                  {r.excerpt && (
                    <p className="text-sm line-clamp-2" style={{ color: "#555" }}>{r.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>

            <Pagination page={page} total={total} pageSize={PAGE_SIZE} base="/search" params={{ q }} />
          </div>
        </div>
      </section>
    </>
  );
}
