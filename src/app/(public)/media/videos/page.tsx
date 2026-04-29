import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Videos | AGREDS",
  description:
    "Watch videos from AGREDS — programme highlights, impact stories, and event coverage.",
};

const videos = [
  {
    title: "AGREDS Mission Overview",
    desc: "An introduction to AGREDS and our mission to transform lives across Ghana.",
    youtubeId: "78xjPMY9rrA",
  },
  {
    title: "Health Outreach in Northern Ghana",
    desc: "See how AGREDS mobile health clinics bring essential healthcare to remote communities.",
    youtubeId: "78xjPMY9rrA",
  },
  {
    title: "Education Changes Lives",
    desc: "Meet the children whose lives are being transformed through AGREDS education programmes.",
    youtubeId: "78xjPMY9rrA",
  },
  {
    title: "Women's Empowerment Programme",
    desc: "Watch young women gain new skills and start businesses through AGREDS vocational training.",
    youtubeId: "78xjPMY9rrA",
  },
  {
    title: "Emergency Relief Response",
    desc: "AGREDS rapid response teams in action during natural disasters and emergencies.",
    youtubeId: "78xjPMY9rrA",
  },
  {
    title: "Community Development Impact",
    desc: "How AGREDS builds resilient communities through water, sanitation, and agricultural programmes.",
    youtubeId: "78xjPMY9rrA",
  },
];

export default function VideosPage() {
  return (
    <>
      <PageBanner
        title="Videos"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media/news" },
          { label: "Videos" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Watch
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Video Gallery
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              Watch highlights from our programmes, impact stories, and event
              coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.title}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                style={{ boxShadow: "0 0 15px rgba(15,13,13,0.06)" }}
              >
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: 16, color: "#343877" }}
                  >
                    {video.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#555" }}>
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
