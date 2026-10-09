import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Projects | AG Care Ghana",
  description:
    "AG Care Ghana projects — ongoing and completed initiatives delivering impact across Ghana.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageBanner
        title="Our Projects"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Causes", href: "/causes/programs" },
          { label: "Projects" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Our Work in Action
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Projects
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              Browse our ongoing and completed projects delivering real impact to
              vulnerable communities across Ghana.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: "#9e9e9e" }}>
                Projects coming soon. Check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const progress = project.goalAmount
                  ? Math.min(100, Math.round(((project.goalAmount ?? 0) * 0.6) / (project.goalAmount ?? 1) * 100))
                  : 0;

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
                    style={{ boxShadow: "0 0 15px rgba(15,13,13,0.06)" }}
                  >
                    {/* Image */}
                    <div className="relative" style={{ aspectRatio: "16/10" }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {project.badge && (
                        <span
                          className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded"
                          style={{
                            backgroundColor: project.badgeColor || "#2ec774",
                          }}
                        >
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <h3
                        className="font-bold mb-2"
                        style={{ fontSize: 18, color: "#343877" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4 line-clamp-3"
                        style={{ color: "#555" }}
                      >
                        {project.description}
                      </p>

                      {project.goalAmount ? (
                        <>
                          {/* Progress bar */}
                          <div
                            className="relative w-full rounded-full mb-3"
                            style={{
                              height: 13,
                              backgroundColor: "#f9f7f6",
                            }}
                          >
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${progress}%`,
                                backgroundColor: project.badgeColor || "#2ec774",
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span style={{ color: "#555" }}>
                              Goal:{" "}
                              <span style={{ color: "#333" }}>
                                ${project.goalAmount.toLocaleString()}
                              </span>
                            </span>
                            <span style={{ color: "#555" }}>{progress}%</span>
                          </div>
                        </>
                      ) : null}

                      <Link
                        href="/get-involved/donate"
                        className="inline-block mt-4 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-colors"
                        style={{
                          border: "2px solid #efc940",
                          color: "#343877",
                        }}
                      >
                        + Donate
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
