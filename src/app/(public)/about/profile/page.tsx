import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Profile | AG Care Ghana",
  description:
    "Learn about AG Care Ghana — the humanitarian and development agency of the Assemblies of God Church, Ghana.",
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
                Assemblies of God Care — AG Care Ghana
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
                <strong>
                  AG Care Ghana is the humanitarian and development agency of
                  the Assemblies of God Church, Ghana.
                </strong>
              </p>
              <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
                Formally established in 1990 and registered as a
                non-governmental organisation in January 1991, AG Care Ghana is
                a national, non-profit, non-discriminatory organisation serving
                vulnerable and under-served communities irrespective of
                religious, ethnic or social background. As the 5th registered
                member of the Christian Health Association of Ghana (CHAG), we
                work with the Government of Ghana, Assemblies of God structures,
                communities, and international development partners including
                UNICEF, UNHCR, UNDP, DANIDA, Robertson Foundation-USA, Kerk in
                Actie, Children Believe, and World Servants Netherlands.
              </p>
              <p className="mb-6 leading-relaxed" style={{ color: "#555" }}>
                With a staff strength of 595 across Ghana, we have positively
                impacted tens of thousands of lives in more than 60 communities
                through our education, health, and economic livelihood
                empowerment programmes — Transforming Lives Together.
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
                  alt="AG Care Ghana team in the field"
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
              { number: "1991", label: "Registered NGO Since" },
              { number: "595", label: "Staff Across Ghana" },
              { number: "200K+", label: "Lives Directly Impacted" },
              { number: "60+", label: "Communities Served" },
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
              Our Strategic Objectives
            </h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: "#555" }}>
              We deliver on our mandate through three strategic objectives —
              contributing to SDG 1, 2, 4, 5, 8, 10 and 17.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Basic Education",
                desc: "Promoting access to good quality, inclusive basic education in under-served communities — building school infrastructure in over 60 communities and strengthening the capacity of teachers, School Management Committees and PTAs.",
                color: "#49C2DF",
              },
              {
                title: "Accessible Health Care",
                desc: "Providing quality preventive and curative health care through our four health facilities in Saboba, Nakpanduri, Bontanga and Akim-Ofoase — complementing Ghana's universal health and Free Primary Healthcare policy.",
                color: "#f58ca6",
              },
              {
                title: "Economic Livelihoods",
                desc: "Supporting vulnerable groups to build capital assets and escape the cycle of poverty through vocational and entrepreneurial skills — transforming the lives of young women, African refugees in Ghana, and returned migrants.",
                color: "#2ec774",
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
