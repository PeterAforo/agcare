import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Partner With Us | AGREDS",
  description:
    "Partner with AGREDS — collaborate with us to deliver development programmes and humanitarian support across Ghana.",
};

export default async function PartnerPage() {
  const donors = await prisma.donor.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageBanner
        title="Partner With Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved" },
          { label: "Partner" },
        ]}
      />

      {/* Intro */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Collaborate With Us
            </span>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: 32, color: "#343877", lineHeight: 1.3 }}
            >
              Together, We Can Do More
            </h2>
            <p className="leading-relaxed text-lg" style={{ color: "#555" }}>
              AGREDS partners with churches, government agencies, international
              NGOs, corporate organizations, and community groups to deliver
              programmes that transform lives. We welcome partnerships at every
              level — from funding and technical support to implementation and
              advocacy.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Partnership Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Funding Partners",
                desc: "Provide grants, donations, or sponsorships to support specific programmes or the organization as a whole.",
                color: "#2ec774",
              },
              {
                title: "Technical Partners",
                desc: "Share expertise in health, education, agriculture, water/sanitation, or organizational development.",
                color: "#49C2DF",
              },
              {
                title: "Corporate Partners",
                desc: "CSR engagement through employee volunteering, matching gifts, cause marketing, or in-kind donations.",
                color: "#efc940",
              },
              {
                title: "Church & Community Partners",
                desc: "Local Assemblies of God congregations and community groups implementing programmes at the grassroots level.",
                color: "#343877",
              },
            ].map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-lg p-8 shadow-sm border-t-4"
                style={{ borderTopColor: type.color }}
              >
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: 20, color: "#343877" }}
                >
                  {type.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      {donors.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
                Our Partners
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10">
              {donors.map((donor) => (
                <div key={donor.id} className="flex-shrink-0">
                  {donor.url ? (
                    <a
                      href={donor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={donor.logo}
                        alt={donor.name}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <div className="opacity-60">
                      <Image
                        src={donor.logo}
                        alt={donor.name}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-16 lg:py-24 text-center text-white"
        style={{ backgroundColor: "#292943" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-white mb-4" style={{ fontSize: 28 }}>
            Interested in Partnering?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#a9a9ab" }}>
            We&apos;d love to explore how we can work together. Get in touch
            with our partnerships team.
          </p>
          <Link
            href="/contacts"
            className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#2ec774" }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
