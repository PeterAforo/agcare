import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Volunteer | AGREDS",
  description:
    "Volunteer with AGREDS — join our mission to transform lives and build hope across Ghana.",
};

export default function VolunteerPage() {
  const roles = [
    {
      title: "Health Outreach Volunteer",
      desc: "Assist with mobile clinics, health screening events, and community health education in rural areas.",
      icon: "🏥",
    },
    {
      title: "Education & Tutoring",
      desc: "Support children in AGREDS learning centres with tutoring, mentoring, and extracurricular activities.",
      icon: "📚",
    },
    {
      title: "Community Development",
      desc: "Help with water, sanitation, and agricultural projects that build resilient communities.",
      icon: "🌱",
    },
    {
      title: "Administrative Support",
      desc: "Assist with office work, data entry, communications, reporting, and event coordination.",
      icon: "💼",
    },
    {
      title: "Skills Training Facilitator",
      desc: "Teach vocational skills — sewing, computing, food processing, or any professional skill you have.",
      icon: "🎓",
    },
    {
      title: "Emergency Response",
      desc: "Join our rapid response teams during disasters to deliver relief supplies and support affected families.",
      icon: "🚑",
    },
  ];

  return (
    <>
      <PageBanner
        title="Volunteer With Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved" },
          { label: "Volunteer" },
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
                Make a Difference
              </span>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: 32, color: "#343877", lineHeight: 1.25 }}
              >
                Your Time Can Transform Lives
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
                Volunteers are at the heart of everything AGREDS does. Whether
                you have a few hours a week or want to commit to a longer-term
                placement, your skills and passion can make a real difference in
                the lives of vulnerable families across Ghana.
              </p>
              <p className="mb-6 leading-relaxed" style={{ color: "#555" }}>
                We welcome individuals, church groups, corporate teams, and
                international volunteers who share our vision of serving
                communities with compassion and integrity.
              </p>
              <Link
                href="/contacts"
                className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#2ec774" }}
              >
                Apply to Volunteer
              </Link>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/promo_3.jpg"
                  alt="AGREDS volunteers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Volunteer Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-lg p-8 shadow-sm transition-transform hover:-translate-y-1"
              >
                <span className="text-3xl mb-4 block">{role.icon}</span>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: 18, color: "#343877" }}
                >
                  {role.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-24 text-center text-white"
        style={{ backgroundColor: "#292943" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-white mb-4" style={{ fontSize: 28 }}>
            Ready to Get Started?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#a9a9ab" }}>
            Contact us to learn more about volunteer opportunities or to
            register your interest. We&apos;ll match you with the role that best
            fits your skills and availability.
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
