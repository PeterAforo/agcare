"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Search } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  openNewTab?: boolean;
  children?: NavItem[];
}

export interface HeaderSettings {
  siteName: string;
  tagline?: string | null;
  logoLight: string | null;
  logoDark: string | null;
  favicon?: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  contactPhone2: string | null;
  address?: string | null;
  socialLinks: Record<string, string> | null;
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#", children: [
    { label: "Profile", href: "/about/profile" },
    { label: "Governance", href: "/about/governance" },
    { label: "History", href: "/about/history" },
    { label: "Mission & Vision", href: "/about/mission" },
    { label: "Our Impact", href: "/about/impact" },
  ]},
  { label: "Causes", href: "#", children: [
    { label: "Programs", href: "/causes/programs" },
    { label: "Projects", href: "/causes/projects" },
  ]},
  { label: "Get Involved", href: "#", children: [
    { label: "Volunteer", href: "/get-involved/volunteer" },
    { label: "Donate", href: "/get-involved/donate" },
    { label: "Partner", href: "/get-involved/partner" },
  ]},
  { label: "Media", href: "#", children: [
    { label: "News & Updates", href: "/media/news" },
    { label: "Reports", href: "/media/reports" },
    { label: "Success Stories", href: "/media/stories" },
    { label: "Photos", href: "/media/photos" },
    { label: "Videos", href: "/media/videos" },
  ]},
  { label: "Contacts", href: "/contacts" },
];

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-[5px] w-[22px] cursor-pointer ${className ?? ""}`}>
      <span className="block h-[2px] w-full bg-current" />
      <span className="block h-[2px] w-full bg-current" />
      <span className="block h-[2px] w-full bg-current" />
    </div>
  );
}

export default function Header({
  navItems,
  settings,
}: {
  navItems?: NavItem[];
  settings?: HeaderSettings;
}) {
  const items = navItems && navItems.length > 0 ? navItems : defaultNavItems;
  const logoDark = settings?.logoDark || "/images/logo_dark.png";
  const logoLight = settings?.logoLight || "/images/logo_white.png";
  const email = settings?.contactEmail || "agreds@ighamail.com";
  const phone1 = settings?.contactPhone || "+233 30 229 062";
  const phone2 = settings?.contactPhone2 || "+233 30 224 507";
  const socials = settings?.socialLinks || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-stretch justify-between">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-4 pl-6 lg:pl-10">
            <button
              className="hidden sm:block"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <HamburgerIcon
                className={isScrolled ? "text-gray-800" : "text-white"}
              />
            </button>
            <Link href="/" className="flex-shrink-0 py-4">
              <Image
                src={isScrolled ? logoDark : logoLight}
                alt={settings?.siteName || "AGREDS"}
                width={160}
                height={50}
                className="h-10 md:h-12 w-auto transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            {items.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-[.05em] flex items-center gap-1 transition-colors ${
                    isScrolled
                      ? "text-primary hover:text-accent-yellow"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3 ml-0.5" />}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-0 bg-white shadow-xl border border-gray-100 py-2 min-w-[200px] z-50"
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block px-5 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors font-medium"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Donate button (yellow, squared, full height) + mobile hamburger */}
          <div className="flex items-stretch">
            <button
              className="sm:hidden flex items-center px-4"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <HamburgerIcon
                className={isScrolled ? "text-gray-800" : "text-white"}
              />
            </button>
            <Link
              href="/search"
              aria-label="Search"
              className={`hidden sm:flex items-center px-4 transition-colors ${
                isScrolled ? "text-primary hover:text-accent-yellow" : "text-white/90 hover:text-white"
              }`}
            >
              <Search className="w-4 h-4" />
            </Link>
            <Link
              href="/get-involved/donate"
              className={`hidden sm:flex items-center justify-center bg-accent-yellow text-primary font-bold text-xs uppercase tracking-[.05em] transition-transform hover:scale-95 ${
                isScrolled ? "w-40 px-6" : "w-52 px-8"
              }`}
            >
              Donate
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile / Aside Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 h-full w-80 bg-dark text-white z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Image
                  src={logoLight}
                  alt={settings?.siteName || "AGREDS"}
                  width={130}
                  height={40}
                  className="h-8 w-auto"
                />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="p-5">
                <Link
                  href="/search"
                  className="flex items-center gap-2 py-3 text-base font-medium border-b border-white/10 hover:text-accent-yellow transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Search className="w-4 h-4" /> Search
                </Link>
                {items.map((item) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </nav>

              <div className="p-5 border-t border-white/10">
                <div className="mb-3">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Email</span>
                  <a href={`mailto:${email}`} className="block text-sm mt-1 hover:text-accent-yellow transition-colors">
                    {email}
                  </a>
                </div>
                <div className="mb-3">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Phone numbers</span>
                  <a href={`tel:${phone1.replace(/\s/g, "")}`} className="block text-sm mt-1 hover:text-accent-yellow transition-colors">{phone1}</a>
                  {phone2 && (
                    <a href={`tel:${phone2.replace(/\s/g, "")}`} className="block text-sm mt-1 hover:text-accent-yellow transition-colors">{phone2}</a>
                  )}
                </div>
                <ul className="flex gap-3 my-4">
                  {(Object.keys(socials).length > 0
                    ? Object.keys(socials)
                    : ["instagram", "google-plus", "twitter", "facebook"]
                  ).map((s) => (
                    <li key={s}>
                      <a
                        href={socials[s] || "#"}
                        target={socials[s] ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors text-xs uppercase"
                      >
                        {s[0].toUpperCase()}
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-involved/donate"
                  className="block text-center bg-accent-yellow text-primary font-bold px-6 py-3 transition-colors text-xs uppercase tracking-[.05em]"
                  onClick={() => setMobileOpen(false)}
                >
                  Donate
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-3 text-base font-medium border-b border-white/10 hover:text-accent-yellow transition-colors"
        onClick={onClose}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-white/10">
      <button
        className="flex items-center justify-between w-full py-3 text-base font-medium hover:text-accent-yellow transition-colors"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4"
          >
            {item.children.map((child) => (
              <li key={child.label}>
                <Link
                  href={child.href}
                  className="block py-2 text-sm text-white/70 hover:text-accent-yellow transition-colors"
                  onClick={onClose}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
