import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Images,
  Heart,
  FolderKanban,
  Calendar,
  FileText,
  MessageSquareQuote,
  Handshake,
  ImageIcon,
  Users,
  Mail,
  FileStack,
  Menu,
} from "lucide-react";

export default async function AdminDashboard() {
  const [
    pages,
    menus,
    heroSlides,
    causes,
    projects,
    events,
    blogPosts,
    testimonials,
    donors,
    gallery,
    users,
    subscribers,
  ] = await Promise.all([
    prisma.page.count(),
    prisma.menu.count(),
    prisma.heroSlide.count(),
    prisma.cause.count(),
    prisma.project.count(),
    prisma.event.count(),
    prisma.blogPost.count(),
    prisma.testimonial.count(),
    prisma.donor.count(),
    prisma.galleryImage.count(),
    prisma.user.count(),
    prisma.subscriber.count(),
  ]);

  const stats = [
    { label: "Pages", count: pages, icon: FileStack, href: "/admin/pages", color: "#343877" },
    { label: "Menus", count: menus, icon: Menu, href: "/admin/menus", color: "#5e5c8b" },
    { label: "Hero Slides", count: heroSlides, icon: Images, href: "/admin/hero-slides", color: "#f58ca6" },
    { label: "Causes", count: causes, icon: Heart, href: "/admin/causes", color: "#2ec774" },
    { label: "Projects", count: projects, icon: FolderKanban, href: "/admin/projects", color: "#49C2DF" },
    { label: "Events", count: events, icon: Calendar, href: "/admin/events", color: "#efc940" },
    { label: "Blog Posts", count: blogPosts, icon: FileText, href: "/admin/blog", color: "#343877" },
    { label: "Testimonials", count: testimonials, icon: MessageSquareQuote, href: "/admin/testimonials", color: "#f8ac3a" },
    { label: "Donors", count: donors, icon: Handshake, href: "/admin/donors", color: "#5e5c8b" },
    { label: "Gallery", count: gallery, icon: ImageIcon, href: "/admin/gallery", color: "#25a560" },
    { label: "Users", count: users, icon: Users, href: "/admin/users", color: "#282a43" },
    { label: "Subscribers", count: subscribers, icon: Mail, href: "/admin", color: "#2ec774" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>
          Overview of your website content
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: stat.color + "15" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                  />
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ color: "#343877" }}
                >
                  {stat.count}
                </span>
              </div>
              <p className="text-xs font-semibold" style={{ color: "#9e9e9e" }}>
                {stat.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4" style={{ color: "#343877" }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "New Page", href: "/admin/pages/new" },
            { label: "New Blog Post", href: "/admin/blog/new" },
            { label: "Add Cause", href: "/admin/causes/new" },
            { label: "Add Event", href: "/admin/events/new" },
            { label: "Add Project", href: "/admin/projects/new" },
            { label: "Upload Photos", href: "/admin/gallery/new" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-semibold shadow-sm transition-colors hover:shadow-md"
              style={{ color: "#343877" }}
            >
              <span className="text-lg" style={{ color: "#2ec774" }}>+</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
