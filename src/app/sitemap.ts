import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://agredsghana.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes = [
    "",
    "/about/profile",
    "/about/governance",
    "/about/history",
    "/about/mission",
    "/about/vision",
    "/about/impact",
    "/contacts",
    "/causes/programs",
    "/causes/projects",
    "/get-involved/volunteer",
    "/get-involved/donate",
    "/get-involved/partner",
    "/media/news",
    "/media/reports",
    "/media/stories",
    "/media/photos",
    "/media/videos",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/media/news/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
