import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Programs | AGREDS",
  description:
    "AGREDS programme areas — Health, Education, Child Development, Women's Empowerment, Community Development, and Humanitarian Relief.",
};

const programs = [
  {
    title: "Health & Medical Outreach",
    slug: "health",
    desc: "AGREDS supports clinics, hospitals, and mobile health outreach services delivering essential healthcare — including maternal health, HIV/AIDS prevention, malaria treatment, and health education — to remote and vulnerable families across Ghana.",
    image: "/images/causes_2.jpg",
    color: "#f58ca6",
    stats: ["200+ outreach clinics", "50,000+ patients annually", "All 16 regions"],
  },
  {
    title: "Education & Child Development",
    slug: "education",
    desc: "Through pre-schools, literacy programmes, child development centres, and educational assistance, AGREDS helps vulnerable children stay in school, develop life skills, and build a foundation for a brighter future.",
    image: "/images/causes_3.jpg",
    color: "#49C2DF",
    stats: ["50,000+ children enrolled", "100+ centres supported", "Literacy & numeracy programmes"],
  },
  {
    title: "Women & Family Empowerment",
    slug: "women",
    desc: "AGREDS trains women in vocational skills, supports micro-enterprises, and runs family strengthening programmes that empower women as economic agents and community leaders.",
    image: "/images/causes_1.jpg",
    color: "#2ec774",
    stats: ["15,000+ women trained", "5,000+ enterprises", "Gender-based violence prevention"],
  },
  {
    title: "Community Development",
    slug: "community",
    desc: "From boreholes and water systems to agricultural extension and livelihood programmes, AGREDS builds the infrastructure and capacity that rural communities need to thrive.",
    image: "/images/projects_1.jpg",
    color: "#efc940",
    stats: ["150+ water systems", "10,000+ farmers reached", "200+ communities"],
  },
  {
    title: "Humanitarian Relief & Emergency Response",
    slug: "relief",
    desc: "When disasters strike, AGREDS mobilises rapid response teams to deliver food, shelter, medical care, and psychosocial support to affected communities across Ghana.",
    image: "/images/projects_3.jpg",
    color: "#f8ac3a",
    stats: ["Major disasters since 1990", "COVID-19 relief for 50,000+ households", "Conflict recovery"],
  },
  {
    title: "Peacebuilding & Advocacy",
    slug: "peace",
    desc: "AGREDS promotes peacebuilding, conflict resolution, civic education, and advocacy for the rights of vulnerable groups — contributing to safer, more cohesive communities.",
    image: "/images/projects_5.jpg",
    color: "#343877",
    stats: ["100+ conflict-affected communities", "Youth leader training", "Child protection advocacy"],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageBanner
        title="Our Programs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Causes", href: "/causes/programs" },
          { label: "Programs" },
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
              Programme Areas
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              AGREDS delivers life-changing programmes across six core areas,
              bringing hope and practical support to vulnerable families and
              communities across Ghana.
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
                      {prog.title.split(" ")[0]}
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
