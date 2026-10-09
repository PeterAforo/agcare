import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Vision | AG Care Ghana",
  description:
    "The vision of AG Care Ghana — transformed communities free from poverty.",
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
              Transformed Communities Free from Poverty.
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full mb-8"
              style={{ backgroundColor: "#efc940" }}
            />
            <p className="leading-relaxed text-lg" style={{ color: "#555" }}>
              We envision communities where wellbeing, resilience and
              livelihoods are improved — where vulnerable people are equipped to
              reach their full potential, and where transformation is holistic,
              lasting and community-led.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Our Strategic Objectives
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              Three objectives drive our work — and our contribution to the
              Sustainable Development Goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Inclusive Basic Education",
                desc: "Promote access to good quality, inclusive basic education in under-served communities — improving learning environments through school infrastructure and building the capacity of teachers, School Management Committees and PTAs.",
              },
              {
                num: "02",
                title: "Quality Health Care",
                desc: "Provide quality, accessible preventive and curative health care through our four health facilities in Saboba, Nakpanduri, Bontanga and Akim-Ofoase — complementing Ghana's universal health and Free Primary Healthcare policy.",
              },
              {
                num: "03",
                title: "Sustainable Livelihoods",
                desc: "Support vulnerable groups to improve their capital assets and escape the vicious cycle of poverty through sustainable economic livelihood empowerment — vocational and entrepreneurial skills for young women, refugees and returned migrants.",
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

          {/* SDGs */}
          <div className="max-w-3xl mx-auto text-center mt-14">
            <h3
              className="font-bold mb-4"
              style={{ fontSize: 20, color: "#343877" }}
            >
              Contributing to the Global Goals
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: "#555" }}>
              Through our interventions we contribute towards the achievement of
              the Sustainable Development Goals:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "SDG 1 · No Poverty",
                "SDG 2 · Zero Hunger",
                "SDG 4 · Quality Education",
                "SDG 5 · Gender Equality",
                "SDG 8 · Decent Work",
                "SDG 10 · Reduced Inequalities",
                "SDG 17 · Partnerships",
              ].map((sdg) => (
                <span
                  key={sdg}
                  className="inline-block text-xs font-semibold px-4 py-2 rounded-full bg-white shadow-sm"
                  style={{ color: "#343877" }}
                >
                  {sdg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
