import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "History | AGREDS",
  description:
    "The history of AGREDS — over three decades of humanitarian service across Ghana.",
};

export default function HistoryPage() {
  const timeline = [
    {
      year: "1990",
      title: "Foundation",
      desc: "AGREDS was established as the relief and development arm of the Assemblies of God Church, Ghana, to address the urgent needs of vulnerable communities.",
    },
    {
      year: "1995",
      title: "First Health Programmes",
      desc: "Launched mobile health clinics and community health education in underserved rural areas across northern Ghana.",
    },
    {
      year: "2000",
      title: "Child Development Expansion",
      desc: "Partnered with international organisations to establish child development centres, reaching thousands of children with education and nutritional support.",
    },
    {
      year: "2005",
      title: "Women's Empowerment Initiative",
      desc: "Introduced vocational training and micro-enterprise development programmes targeting women and young mothers.",
    },
    {
      year: "2010",
      title: "Nationwide Coverage",
      desc: "Expanded operations to cover all regions of Ghana, with integrated programmes in health, education, and community development.",
    },
    {
      year: "2015",
      title: "Peacebuilding & Advocacy",
      desc: "Added peacebuilding, conflict resolution, and civic education to our programme portfolio in response to community needs.",
    },
    {
      year: "2020",
      title: "COVID-19 Emergency Response",
      desc: "Mobilised rapid response teams to deliver PPE, food supplies, and health education to vulnerable communities during the pandemic.",
    },
    {
      year: "Present",
      title: "Continuing the Mission",
      desc: "With over 350 communities reached and 1.2 million lives impacted, AGREDS continues to expand its reach and deepen its impact across Ghana.",
    },
  ];

  return (
    <>
      <PageBanner
        title="Our History"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "History" },
        ]}
      />

      {/* Intro */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Our Journey
            </span>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: 32, color: "#343877" }}
            >
              Over Three Decades of Service
            </h2>
            <p className="leading-relaxed" style={{ color: "#555" }}>
              Since 1990, AGREDS has grown from a small church-based relief
              initiative to a leading faith-based development organisation
              serving vulnerable communities across all 16 regions of Ghana.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: "#dee2e6", transform: "translateX(-50%)" }}
            />

            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col lg:flex-row items-start mb-12 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`lg:w-1/2 pl-14 lg:pl-0 ${
                    i % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                  }`}
                >
                  <span
                    className="inline-block font-bold text-sm px-3 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: "#efc940",
                      color: "#343877",
                    }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: 20, color: "#343877" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                    {item.desc}
                  </p>
                </div>

                {/* Dot */}
                <div
                  className="absolute left-6 lg:left-1/2 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#2ec774",
                    transform: "translate(-50%, 6px)",
                  }}
                />

                {/* Spacer for alternating */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
