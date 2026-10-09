import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "History | AG Care Ghana",
  description:
    "The history of AG Care Ghana — from the Assemblies of God's earliest health missions in 1948 to a national humanitarian and development agency.",
};

export default function HistoryPage() {
  const timeline = [
    {
      year: "1948–1951",
      title: "Missionary Roots",
      desc: "The Assemblies of God's social and health interventions in Ghana begin, including the establishment of health facilities in the northern parts of the country — the earliest expression of the Church's commitment to Christian compassion in action.",
    },
    {
      year: "1990",
      title: "Formal Establishment",
      desc: "AG Care Ghana is formally established, providing an institutional framework through which the Assemblies of God Church, Ghana can coordinate and expand its relief, development and social action programmes.",
    },
    {
      year: "1991",
      title: "NGO Registration",
      desc: "Officially registered as a non-governmental organisation in January 1991, and later becomes the 5th registered member of the Christian Health Association of Ghana (CHAG).",
    },
    {
      year: "1999",
      title: "The Lifeline Project",
      desc: "Launched in response to the growing problem of child trafficking, the Lifeline Project begins protecting vulnerable children and young people from exploitation — combining protection, rehabilitation, reintegration and prevention.",
    },
    {
      year: "2000s",
      title: "Growing Partnerships",
      desc: "Working alongside the Government of Ghana and international development partners including UNICEF, UNHCR, UNDP, DANIDA, Robertson Foundation-USA, Kerk in Actie, Children Believe and World Servants Netherlands, programmes expand across health, education, livelihoods and community development.",
    },
    {
      year: "2010s",
      title: "National Reach",
      desc: "Interventions grow to include support for schools and teachers, healthcare delivery through four health facilities, skills development for vulnerable young people, child protection, community infrastructure, refugee management, peace and conflict transformation, and emergency relief.",
    },
    {
      year: "Today",
      title: "AG Care Ghana",
      desc: "Formerly known as AG Care Ghana, AG Care Ghana continues as the humanitarian and development agency of the Assemblies of God Church, Ghana — with 595 staff, over 200,000 lives directly impacted, and programmes in more than 60 communities. Transforming Lives Together.",
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
              From the Assemblies of God&apos;s earliest health missions in
              northern Ghana to a national non-profit organisation, AG Care
              Ghana has evolved into a vehicle for the Church&apos;s commitment
              to holistic transformation — improving the wellbeing, resilience
              and livelihoods of vulnerable people and communities across Ghana
              and beyond its borders.
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
