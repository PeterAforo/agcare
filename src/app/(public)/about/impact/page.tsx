import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Impact Statistics | AGREDS",
  description:
    "AGREDS impact statistics — the numbers behind three decades of humanitarian service across Ghana.",
};

export default function ImpactPage() {
  const stats = [
    { number: "1.2M+", label: "People Supported Since 1990", color: "#efc940" },
    { number: "350+", label: "Communities Reached", color: "#2ec774" },
    { number: "16", label: "Regions Covered", color: "#49C2DF" },
    { number: "30+", label: "Years of Service", color: "#f58ca6" },
    { number: "50,000+", label: "Children in Development Programmes", color: "#f8ac3a" },
    { number: "15,000+", label: "Women Empowered Through Skills Training", color: "#343877" },
    { number: "200+", label: "Health Outreach Programmes", color: "#2ec774" },
    { number: "100+", label: "Schools & Learning Centres Supported", color: "#efc940" },
  ];

  const sectors = [
    {
      title: "Health & Medical Outreach",
      metrics: [
        "200+ mobile health clinics conducted",
        "50,000+ patients treated annually",
        "HIV/AIDS, malaria, and maternal health programmes in all regions",
      ],
      color: "#f58ca6",
    },
    {
      title: "Education & Child Development",
      metrics: [
        "50,000+ children enrolled in development programmes",
        "100+ schools and learning centres supported",
        "Literacy and numeracy programmes for out-of-school children",
      ],
      color: "#49C2DF",
    },
    {
      title: "Women & Family Empowerment",
      metrics: [
        "15,000+ women trained in vocational skills",
        "5,000+ micro-enterprises supported",
        "Family strengthening and gender-based violence prevention",
      ],
      color: "#2ec774",
    },
    {
      title: "Community Development",
      metrics: [
        "150+ boreholes and water systems constructed",
        "Agricultural extension services to 10,000+ farmers",
        "Sanitation and hygiene education in 200+ communities",
      ],
      color: "#efc940",
    },
    {
      title: "Humanitarian Relief",
      metrics: [
        "Emergency response in all major disasters since 1990",
        "COVID-19 relief to 50,000+ households",
        "Displacement and conflict recovery programmes",
      ],
      color: "#f8ac3a",
    },
    {
      title: "Peacebuilding & Advocacy",
      metrics: [
        "Peace education in 100+ conflict-affected communities",
        "Civic engagement training for youth leaders",
        "Advocacy for child protection and women's rights",
      ],
      color: "#343877",
    },
  ];

  return (
    <>
      <PageBanner
        title="Impact Statistics"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "Impact Statistics" },
        ]}
      />

      {/* Top Stats */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Our Impact
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              The Numbers Tell the Story
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg p-6 text-center shadow-sm border-b-4"
                style={{ borderBottomColor: stat.color }}
              >
                <span
                  className="block font-bold mb-2"
                  style={{ fontSize: 36, color: stat.color }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#343877" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Breakdown */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Impact by Sector
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <div
                key={sector.title}
                className="bg-white rounded-lg p-8 shadow-sm border-t-4"
                style={{ borderTopColor: sector.color }}
              >
                <h3
                  className="font-bold mb-4"
                  style={{ fontSize: 18, color: "#343877" }}
                >
                  {sector.title}
                </h3>
                <ul className="space-y-2">
                  {sector.metrics.map((metric, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ color: "#555" }}
                    >
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: sector.color }}
                      />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
