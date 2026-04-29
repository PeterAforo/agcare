"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#292943",
        minHeight: 280,
        paddingTop: 100,
        paddingBottom: 50,
      }}
    >
      {/* Decorative overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, #efc940 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2ec774 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold mb-4"
          style={{ fontSize: 40, letterSpacing: "-0.03em" }}
        >
          {title}
        </motion.h1>

        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2 text-sm">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <span style={{ color: "#65656b" }}>/</span>
                  )}
                  {isLast || !crumb.href ? (
                    <span style={{ color: "#efc940" }}>{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-opacity hover:opacity-80"
                      style={{ color: "#a9a9ab" }}
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>
      </div>
    </section>
  );
}
