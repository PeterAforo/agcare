import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Vision | AGREDS",
  description:
    "The vision of AGREDS — a Ghana where every community thrives with dignity, hope, and opportunity.",
};

export default function VisionPage() {
  return (
    <>
      <PageBanner
        title="Our Vision"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "Vision" },
        ]}
      />

      {/* Vision Statement */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Looking Ahead
            </span>
            <h2
              className="font-bold mb-8"
              style={{ fontSize: 32, color: "#343877", lineHeight: 1.3 }}
            >
              A Ghana where every community thrives with dignity, hope, and
              opportunity — free from hunger, poverty, disease, and injustice.
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full mb-8"
              style={{ backgroundColor: "#efc940" }}
            />
            <p className="leading-relaxed text-lg" style={{ color: "#555" }}>
              We envision transformed communities where children grow up healthy
              and educated, women are empowered, families are strong, and every
              person has access to the resources and opportunities needed to live
              a life of purpose and fulfilment.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Strategic Goals
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              Our vision is guided by five strategic goals driving everything we
              do across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Universal Health Access",
                desc: "Ensure vulnerable communities have access to quality, affordable healthcare through clinics, outreach, and health education.",
              },
              {
                num: "02",
                title: "Quality Education for All",
                desc: "Provide every child with access to education, from early childhood through secondary school, regardless of economic background.",
              },
              {
                num: "03",
                title: "Economic Empowerment",
                desc: "Equip women, youth, and families with vocational skills and micro-enterprise support for sustainable livelihoods.",
              },
              {
                num: "04",
                title: "Resilient Communities",
                desc: "Build community infrastructure — water, sanitation, agriculture — that withstands shocks and supports long-term growth.",
              },
              {
                num: "05",
                title: "Peace & Social Cohesion",
                desc: "Promote peacebuilding, conflict resolution, and civic engagement to create safe, harmonious communities.",
              },
              {
                num: "06",
                title: "Effective Emergency Response",
                desc: "Maintain rapid-response capability to deliver life-saving relief to communities affected by disasters and conflict.",
              },
            ].map((goal) => (
              <div key={goal.num} className="bg-white rounded-lg p-8 shadow-sm">
                <span
                  className="block font-bold mb-3"
                  style={{ fontSize: 36, color: "#efc940" }}
                >
                  {goal.num}
                </span>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: 18, color: "#343877" }}
                >
                  {goal.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  {goal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
