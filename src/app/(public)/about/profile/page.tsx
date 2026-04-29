import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Profile | AGREDS",
  description:
    "Learn about AGREDS — the humanitarian and development arm of the Assemblies of God Church, Ghana.",
};

export default function ProfilePage() {
  return (
    <>
      <PageBanner
        title="Our Profile"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "Profile" },
        ]}
      />

      {/* Intro */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-3 block"
                style={{ color: "#9e9e9e" }}
              >
                Who We Are
              </span>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: 32, color: "#343877", lineHeight: 1.25 }}
              >
                Assemblies of God Relief &amp; Development Services
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
                <strong>
                  AGREDS is the humanitarian and development arm of the
                  Assemblies of God Church, Ghana — committed to fighting
                  hunger, poverty, disease, illiteracy, and social injustice
                  while restoring dignity and hope to vulnerable communities.
                </strong>
              </p>
              <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
                Established as a faith-based non-governmental organization,
                AGREDS operates across all 16 regions of Ghana, implementing
                programmes in health, education, child development, women&apos;s
                empowerment, community development, peacebuilding, and emergency
                relief.
              </p>
              <p className="mb-6 leading-relaxed" style={{ color: "#555" }}>
                Our approach integrates holistic, community-driven development
                with Christian compassion — partnering with local churches,
                government agencies, and international organizations to deliver
                sustainable impact at scale.
              </p>
              <Link
                href="/about/mission"
                className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#2ec774" }}
              >
                Our Mission
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/about-us.jpg"
                  alt="AGREDS team in the field"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              At a Glance
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Key Facts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "30+", label: "Years of Service" },
              { number: "16", label: "Regions Covered" },
              { number: "1.2M+", label: "Lives Impacted" },
              { number: "350+", label: "Communities Reached" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-lg p-8 text-center shadow-sm"
              >
                <span
                  className="block font-bold mb-2"
                  style={{ fontSize: 42, color: "#efc940" }}
                >
                  {item.number}
                </span>
                <span
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: "#343877" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Areas */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              What We Do
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Core Programme Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Health & Medical Outreach",
                desc: "Supporting clinics, hospitals, and mobile outreach services delivering essential healthcare to remote families.",
                color: "#f58ca6",
              },
              {
                title: "Education & Child Development",
                desc: "Running pre-schools, literacy programmes, child development centres, and educational support for vulnerable children.",
                color: "#49C2DF",
              },
              {
                title: "Women & Family Empowerment",
                desc: "Vocational training, micro-enterprise support, and family strengthening initiatives for women and caregivers.",
                color: "#2ec774",
              },
              {
                title: "Community Development",
                desc: "Water, sanitation, agriculture, and livelihood programmes building resilient rural communities.",
                color: "#efc940",
              },
              {
                title: "Humanitarian Relief",
                desc: "Emergency response, disaster relief, and recovery support for conflict- and disaster-affected populations.",
                color: "#f8ac3a",
              },
              {
                title: "Peacebuilding & Advocacy",
                desc: "Conflict resolution, civic education, and advocacy for the rights of vulnerable groups and communities.",
                color: "#343877",
              },
            ].map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-lg p-8 shadow-sm border-t-4 transition-transform hover:-translate-y-1"
                style={{ borderTopColor: area.color }}
              >
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: 18, color: "#343877" }}
                >
                  {area.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
