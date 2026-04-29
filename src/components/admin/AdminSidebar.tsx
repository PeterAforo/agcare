"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  Heart,
  FolderKanban,
  Calendar,
  FileText,
  MessageSquareQuote,
  Handshake,
  ImageIcon,
  Users,
  Settings,
  Globe,
  FileStack,
  Menu,
} from "lucide-react";

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Pages", href: "/admin/pages", icon: FileStack },
      { label: "Menus", href: "/admin/menus", icon: Menu },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Hero Slides", href: "/admin/hero-slides", icon: Images },
      { label: "Causes", href: "/admin/causes", icon: Heart },
      { label: "Projects", href: "/admin/projects", icon: FolderKanban },
      { label: "Events", href: "/admin/events", icon: Calendar },
      { label: "Blog Posts", href: "/admin/blog", icon: FileText },
      { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
      { label: "Donors", href: "/admin/donors", icon: Handshake },
      { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col border-r"
      style={{ backgroundColor: "#292943", borderColor: "#343877" }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "#3a3a5c" }}>
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/images/logo_white.png"
            alt="AGREDS"
            width={130}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        <p className="text-[10px] mt-1 uppercase tracking-widest" style={{ color: "#65656b" }}>
          CMS
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <p
              className="px-5 mb-2 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: "#65656b" }}
            >
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "hover:text-white"
                  }`}
                  style={{
                    color: isActive ? "#fff" : "#a9a9ab",
                    backgroundColor: isActive ? "#343877" : "transparent",
                    borderRight: isActive ? "3px solid #efc940" : "3px solid transparent",
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* View Site */}
      <div className="p-4 border-t" style={{ borderColor: "#3a3a5c" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-white"
          style={{ color: "#a9a9ab" }}
        >
          <Globe className="w-3.5 h-3.5" />
          View Website
        </Link>
      </div>
    </aside>
  );
}
