import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Success Stories | AG Care Ghana",
  description:
    "Real stories of transformation — how AG Care Ghana programmes are changing lives across Ghana.",
};

const stories = [
  {
    title: "From Dropout to Teacher: Ama's Story",
    excerpt:
      "Ama was forced to drop out of school at age 12. Through AG Care Ghana's education support programme, she completed school and is now a teacher in her community.",
    image: "/images/education/education-model-early-childhood-education-centre.jpg",
    category: "Education",
    color: "#49C2DF",
  },
  {
    title: "Clean Water Changes Everything in Tamale",
    excerpt:
      "A new borehole in Tamale serves over 500 families, reducing waterborne diseases and freeing women and children from long daily treks to fetch water.",
    image: "/images/community-infrastructure/volunteers-at-construction-site-3.jpg",
    category: "Water & Sanitation",
    color: "#2ec774",
  },
  {
    title: "Mobile Clinic Saves Lives in Upper East",
    excerpt:
      "AG Care Ghana mobile health clinics bring essential healthcare — including maternal care and immunizations — to remote communities in Upper East Region.",
    image: "/images/education/school-health-session-education.jpg",
    category: "Health",
    color: "#f58ca6",
  },
  {
    title: "Vocational Training Empowers Young Women",
    excerpt:
      "Over 200 young women have graduated from AG Care Ghana's skills training programme in dressmaking, hairdressing, and food processing, starting their own businesses.",
    image: "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg",
    category: "Empowerment",
    color: "#efc940",
  },
  {
    title: "Rebuilding After the Flood",
    excerpt:
      "When floods destroyed homes in the Volta Region, AG Care Ghana emergency teams delivered food, shelter, and psychosocial support to hundreds of affected families.",
    image: "/images/community-infrastructure/volunteers-at-construction-site-5.jpg",
    category: "Relief",
    color: "#f8ac3a",
  },
  {
    title: "Peace Through Dialogue in Bawku",
    excerpt:
      "AG Care Ghana facilitated community peace dialogues in Bawku, bringing together rival groups and reducing violent incidents through sustained engagement.",
    image: "/images/community-infrastructure/volunteer-11-vrs-kokosiase-11-football-match.jpg",
    category: "Peacebuilding",
    color: "#343877",
  },
];

export default function StoriesPage() {
  return (
    <>
      <PageBanner
        title="Success Stories"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media/news" },
          { label: "Success Stories" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Real Impact
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Stories of Transformation
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              Behind every AG Care Ghana programme are real people whose lives have been
              changed. Here are some of their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <article
                key={story.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
                style={{ boxShadow: "0 0 15px rgba(15,13,13,0.06)" }}
              >
                <div className="relative" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded"
                    style={{ backgroundColor: story.color }}
                  >
                    {story.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: 18, color: "#343877" }}
                  >
                    {story.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#555" }}
                  >
                    {story.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
