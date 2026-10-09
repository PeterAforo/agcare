import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Impact | AG Care Ghana",
  description:
    "AG Care Ghana's impact — the numbers behind over three decades of humanitarian and development service across Ghana.",
};

export default function ImpactPage() {
  const stats = [
    { number: "200,000+", label: "Lives Directly Impacted", color: "#efc940" },
    { number: "60+", label: "Communities Served", color: "#2ec774" },
    { number: "595", label: "Staff Across Ghana", color: "#49C2DF" },
    { number: "1991", label: "Registered NGO Since", color: "#f58ca6" },
    { number: "4", label: "Health Facilities", color: "#f8ac3a" },
    { number: "~600", label: "Health Professionals", color: "#343877" },
    { number: "36", label: "Education Communities Supported", color: "#2ec774" },
    { number: "1999", label: "Lifeline Project Running Since", color: "#efc940" },
  ];

  const sectors = [
    {
      title: "Education",
      metrics: [
        "School infrastructure in 60+ communities over three decades",
        "36 supported communities in the Northern and Northeast Regions",
        "Teacher training, SMC/PTA strengthening, and learning materials",
        "WASH facilities and girl-child education advocacy in schools",
      ],
      color: "#49C2DF",
    },
    {
      title: "Health Services (AGHS)",
      metrics: [
        "4 facilities: Saboba Hospital, Nakpanduri Health Centre, Kings Medical Centre (Bontanga), Eye Medical Centre (Akim-Ofoase)",
        "~600 qualified healthcare professionals",
        "Outpatient, inpatient, maternal & child health, laboratory and immunization services",
        "Community outreach: medical screenings and health awareness campaigns",
      ],
      color: "#f58ca6",
    },
    {
      title: "Economic Livelihoods",
      metrics: [
        "Thousands of vulnerable young women equipped with vocational and entrepreneurial skills",
        "Hundreds of African refugees in Ghana and Ghanaian returned migrants supported",
        "Small business start-up support and follow-up for graduates",
      ],
      color: "#2ec774",
    },
    {
      title: "Child Protection — Lifeline",
      metrics: [
        "Protecting children from trafficking and exploitative labour since 1999",
        "Rehabilitation: counselling, literacy, vocational skills (dressmaking, catering, beauty care)",
        "Active in La Nkwantanang Madina Municipal and Mion District",
      ],
      color: "#f8ac3a",
    },
    {
      title: "Community Infrastructure",
      metrics: [
        "Community-led construction with World Servants Netherlands",
        "School blocks, teachers', doctors' and nurses' accommodation",
        "Local ownership through community participation in planning and maintenance",
      ],
      color: "#efc940",
    },
    {
      title: "Migration & Reintegration",
      metrics: [
        "EU-supported return and reintegration for vulnerable migrants",
        "Pre-departure counselling, airport pickup, vocational training",
        "Psycho-social support, family mediation and business start-up support",
      ],
      color: "#343877",
    },
  ];

  return (
    <>
      <PageBanner
        title="Our Impact"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "Impact" },
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
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: "#555" }}>
              Together with the Church, the Government of Ghana and our partners
              at home and abroad, AG Care Ghana has positively impacted tens of
              thousands of lives across the country.
            </p>
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
              Impact by Programme
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
