import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Mission | AG Care Ghana",
  description:
    "The mission of AG Care Ghana — to work with partners in the love of God to eliminate poverty.",
};

export default function MissionPage() {
  return (
    <>
      <PageBanner
        title="Our Mission"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "Mission" },
        ]}
      />

      {/* Mission Statement */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Our Purpose
            </span>
            <h2
              className="font-bold mb-8"
              style={{ fontSize: 32, color: "#343877", lineHeight: 1.3 }}
            >
              To work with partners in the love of God to eliminate poverty.
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full mb-8"
              style={{ backgroundColor: "#efc940" }}
            />
            <p className="leading-relaxed text-lg" style={{ color: "#555" }}>
              AG Care Ghana exists to demonstrate Christian compassion through
              practical responses to poverty, vulnerability and community needs —
              Transforming Lives Together through health, education and economic
              livelihood empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Respect & Fairness",
                desc: "Treating every person — beneficiary, partner and staff — with dignity and equity, serving communities irrespective of religious, ethnic or social background.",
                color: "#f58ca6",
              },
              {
                title: "Accountability & Transparency",
                desc: "Maintaining rigorous stewardship and open reporting to donors, partners, communities and church leadership.",
                color: "#343877",
              },
              {
                title: "Equal Participation",
                desc: "Ensuring communities and vulnerable groups take part in shaping and owning the programmes that affect their lives.",
                color: "#2ec774",
              },
              {
                title: "Innovation",
                desc: "Finding creative, practical and sustainable responses to poverty, vulnerability and community needs.",
                color: "#49C2DF",
              },
              {
                title: "Commitment & Partnerships",
                desc: "Working hand-in-hand with the Church, the Government of Ghana, communities and development partners at home and abroad for lasting impact.",
                color: "#efc940",
              },
              {
                title: "Diversity & Human Rights",
                desc: "Upholding the rights and dignity of every person and valuing diversity in all our interventions.",
                color: "#f8ac3a",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-lg p-8 shadow-sm flex gap-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: pillar.color + "18" }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pillar.color }}
                  />
                </div>
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: 18, color: "#343877" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-16 lg:py-24 text-center text-white"
        style={{ backgroundColor: "#292943" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-white mb-4" style={{ fontSize: 28 }}>
            Join Us in Our Mission
          </h2>
          <p
            className="mb-8 max-w-xl mx-auto"
            style={{ color: "#a9a9ab" }}
          >
            Whether through volunteering, donating, or partnering, you can help
            AG Care Ghana bring hope and transformation to communities across
            Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved/volunteer"
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#2ec774" }}
            >
              Volunteer
            </Link>
            <Link
              href="/get-involved/donate"
              className="inline-block px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: "transparent",
                border: "2px solid #efc940",
                color: "#efc940",
              }}
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
