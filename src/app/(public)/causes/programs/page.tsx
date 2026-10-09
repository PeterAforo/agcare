import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Programmes & Projects | AG Care Ghana",
  description:
    "AG Care Ghana's programmes — Education, Health Services, Community Infrastructure, Migration & Reintegration, and the Lifeline Project.",
};

const programs = [
  {
    title: "Education Programme",
    slug: "education",
    tagline: "Access to quality education in under-served communities",
    desc: "AG Care's Education Programme responds to poverty, inadequate infrastructure and teacher shortages that constrain access to education in rural Ghana. With special attention to kindergarten and primary education, our interventions include classroom blocks, teachers' quarters and toilet facilities; teacher training and professional development; School Management Committees and PTAs; teaching and learning materials; engagement with Municipal Assemblies; girl-child education advocacy; school WASH facilities; and livelihoods support for parents. Funding partners including Children Believe, ChorogUsan for Children and KOICA have shaped interventions across thirty-six (36) supported communities in the Northern and Northeast Regions — areas of greatest need where government services have been inadequate.",
    image: "/images/education/education-model-early-childhood-education-centre.jpg",
    color: "#49C2DF",
    stats: ["36 supported communities", "Northern & Northeast Regions", "School infrastructure, teacher training & WASH"],
  },
  {
    title: "Health Services (AGHS)",
    slug: "health",
    tagline: "Compassionate, holistic, affordable healthcare since 1948",
    desc: "Delivered through Assemblies of God Health Services (AGHS) — the oldest of our community mission programmes — we provide outpatient and inpatient care, maternal and child health, laboratory diagnostics, immunization and health education. As a member of the Christian Health Association of Ghana (CHAG), a network of over 300 Christian mission health facilities, we partner with the Government of Ghana to advance Universal Health Coverage and the Free Primary Health Care Programme. Our facilities — AG Hospital in Saboba, AG Health Centre in Nakpanduri, AG Kings Medical Centre in Bontanga and AG Eye Medical Centre in Akim-Ofoase — are staffed by about 600 qualified professionals, and run community outreach such as medical screenings and preventive health campaigns.",
    image: "/images/causes_2.jpg",
    color: "#f58ca6",
    stats: ["4 health facilities", "~600 health professionals", "CHAG member"],
  },
  {
    title: "Community Infrastructure Programme",
    slug: "community-infrastructure",
    tagline: "Community-led facilities with World Servants Netherlands",
    desc: "In partnership with World Servants Netherlands, this programme improves the living conditions, learning environment and resilience of under-served communities. Interventions include the construction and rehabilitation of essential facilities — school blocks, teachers', doctors' and nurses' accommodation — identified and driven by the communities themselves. Local stakeholders contribute to planning, implementation, supervision and maintenance, promoting ownership and sustainability, while AG Care Ghana provides local coordination, stakeholder engagement, monitoring and oversight.",
    image: "/images/community-infrastructure/classroom-block-at-kokosiase.jpg",
    color: "#efc940",
    stats: ["With World Servants Netherlands", "Community-led delivery", "Schools & staff accommodation"],
  },
  {
    title: "EU Migration, Return & Reintegration",
    slug: "migration-reintegration",
    tagline: "Rebuilding lives with dignity, safety and hope",
    desc: "This project supports vulnerable migrants, returnees and their families returning from some European Union member countries. Through a holistic, person-centred approach we offer pre-departure counselling, airport pickup on request, vocational training, business start-up support, employment guidance, referrals to essential services, psycho-social support, family reintegration and mediation. Working closely with local communities, institutions and partners, we aim to reduce vulnerability, prevent distress-driven re-migration, and empower returnees to become active contributors to their families and communities.",
    image: "/images/projects_5.jpg",
    color: "#343877",
    stats: ["Livelihoods, education & wellbeing", "Psycho-social & family support", "Safe, sustainable reintegration"],
  },
  {
    title: "The Lifeline Project",
    slug: "lifeline",
    tagline: "Protecting vulnerable children since 1999",
    desc: "A long-standing intervention protecting vulnerable children and young people from exploitation, trafficking and harmful labour practices. The project identifies and supports trafficked and exploited girls — especially those aged 15–20 — providing supervised care, individual and group counselling, health and moral education, HIV/AIDS awareness, functional literacy, entrepreneurial training, and vocational skills in dressmaking, catering and beauty care. Graduates receive start-up kits and follow-up visits to support lasting independence. Prevention work with the Ghana Police Service, Department of Social Welfare, faith groups, transport unions and traditional leaders is currently active in La Nkwantanang Madina Municipal (Greater Accra) and Mion District (Northern Region), with support from partners including Kerk in Actie.",
    image: "/images/lifeline/skills-training.jpg",
    color: "#2ec774",
    stats: ["Running since 1999", "Protection, rehabilitation & prevention", "Greater Accra & Northern Region"],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageBanner
        title="Our Programmes & Projects"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Causes", href: "/causes/programs" },
          { label: "Programmes" },
        ]}
      />

      {/* Programs Grid */}
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
              Our Programmes & Projects
            </h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: "#555" }}>
              AG Care Ghana delivers on its mandate through five flagship
              programmes — improving wellbeing, resilience and livelihoods for
              vulnerable people and communities across Ghana.
            </p>
          </div>

          <div className="space-y-12">
            {programs.map((prog, i) => (
              <div
                key={prog.slug}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="lg:w-5/12">
                  <div
                    className="relative rounded-lg overflow-hidden shadow-lg"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div
                      className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded"
                      style={{ backgroundColor: prog.color }}
                    >
                      {prog.tagline}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-7/12">
                  <h3
                    className="font-bold mb-3"
                    style={{ fontSize: 24, color: "#343877" }}
                  >
                    {prog.title}
                  </h3>
                  <p className="mb-5 leading-relaxed" style={{ color: "#555" }}>
                    {prog.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-5">
                    {prog.stats.map((stat) => (
                      <span
                        key={stat}
                        className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: prog.color + "15",
                          color: prog.color === "#efc940" ? "#343877" : prog.color,
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/get-involved/donate"
                    className="inline-block px-6 py-2.5 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: prog.color }}
                  >
                    Support This Programme
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
