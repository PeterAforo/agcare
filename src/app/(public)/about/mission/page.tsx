import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Mission | AGREDS",
  description:
    "The mission of AGREDS — fighting hunger, poverty, disease, illiteracy, and social injustice across Ghana.",
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
              To fight hunger, poverty, disease, illiteracy, and social
              injustice — empowering vulnerable children, women, families, and
              entire communities across Ghana.
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full mb-8"
              style={{ backgroundColor: "#efc940" }}
            />
            <p className="leading-relaxed text-lg" style={{ color: "#555" }}>
              AGREDS exists to demonstrate the love and compassion of Christ
              through practical, sustainable development programmes that
              transform lives, restore dignity, and build resilient communities
              across every region of Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Mission Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Compassion",
                desc: "Responding to human suffering with the love of Christ, providing practical relief and lasting support to the most vulnerable.",
                color: "#f58ca6",
              },
              {
                title: "Empowerment",
                desc: "Equipping communities with knowledge, skills, and resources to become self-reliant and agents of their own transformation.",
                color: "#2ec774",
              },
              {
                title: "Integrity",
                desc: "Maintaining transparency, accountability, and ethical stewardship in all our operations and relationships.",
                color: "#343877",
              },
              {
                title: "Partnership",
                desc: "Collaborating with churches, governments, NGOs, and communities to maximise impact and reach more people in need.",
                color: "#efc940",
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
            AGREDS bring hope and transformation to communities across Ghana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-involved/volunteer"
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#2ec774" }}
            >
              Volunteer
            </a>
            <a
              href="/get-involved/donate"
              className="inline-block px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: "transparent",
                border: "2px solid #efc940",
                color: "#efc940",
              }}
            >
              Donate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
