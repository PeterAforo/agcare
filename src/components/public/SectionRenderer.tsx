import { prisma } from "@/lib/prisma";
import HeroSlider from "./HeroSlider";
import AboutSection from "./AboutSection";
import IconsSection from "./IconsSection";
import SubscribeSection from "./SubscribeSection";
import InstagramSlider from "./InstagramSlider";
import ContactForm from "./ContactForm";

interface SectionProps {
  section: {
    id: string;
    type: string;
    title: string | null;
    content: unknown;
  };
}

export default async function SectionRenderer({ section }: SectionProps) {
  const content = (section.content as Record<string, unknown>) || {};

  switch (section.type) {
    case "BANNER":
      return <BannerSection heading={(content.heading as string) || section.title || ""} backgroundImage={content.backgroundImage as string} />;
    case "RICH_TEXT":
      return <RichTextSection html={(content.html as string) || ""} />;
    case "IMAGE_TEXT":
      return <ImageTextSection image={(content.image as string) || ""} text={(content.text as string) || ""} layout={(content.layout as string) || "image-left"} />;
    case "CTA":
    case "VOLUNTEER":
      return <CTASection heading={(content.heading as string) || ""} text={(content.text as string) || ""} buttonText={(content.buttonText as string) || ""} buttonLink={(content.buttonLink as string) || "#"} backgroundImage={(content.backgroundImage as string) || ""} />;
    case "STATS":
      return <StatsSection stats={(content.stats as string) || "[]"} />;
    case "FAQ":
      return <FAQSection items={(content.items as string) || "[]"} />;
    case "SPACER":
      return <SpacerSection height={(content.height as string) || "md"} />;
    case "HERO": {
      const slides = await prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
      return <HeroSlider slides={JSON.parse(JSON.stringify(slides))} />;
    }
    case "ABOUT":
      return <AboutSection />;
    case "ICONS":
      return <IconsSection />;
    case "SUBSCRIBE":
      return <SubscribeSection />;
    case "INSTAGRAM":
      return <InstagramSlider />;
    case "CONTACT_FORM":
      return (
        <section className="py-16 px-6 max-w-2xl mx-auto">
          {section.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: "#343877" }}>{section.title}</h2>}
          <ContactForm />
        </section>
      );
    case "CUSTOM_HTML":
      return <RichTextSection html={(content.html as string) || ""} />;
    case "CAUSES": {
      const causes = await prisma.cause.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 });
      return <DataListSection title={section.title} items={causes.map((c) => ({ id: c.id, title: c.title, description: c.description, image: c.image }))} type="causes" />;
    }
    case "PROJECTS": {
      const projects = await prisma.project.findMany({ where: { isPublished: true }, orderBy: { order: "asc" }, take: 6 });
      return <DataListSection title={section.title} items={projects.map((p) => ({ id: p.id, title: p.title, description: p.description, image: p.image }))} type="projects" />;
    }
    case "BLOG": {
      const posts = await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 4 });
      return <DataListSection title={section.title} items={posts.map((p) => ({ id: p.id, title: p.title, description: p.excerpt || "", image: p.image || "" }))} type="blog" />;
    }
    case "EVENTS": {
      const events = await prisma.event.findMany({ where: { isPublished: true }, orderBy: { startDate: "asc" }, take: 4 });
      return <DataListSection title={section.title} items={events.map((e) => ({ id: e.id, title: e.title, description: e.description || "", image: e.image || "" }))} type="events" />;
    }
    case "TESTIMONIALS": {
      const testimonials = await prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 });
      return <TestimonialsSection title={section.title} testimonials={testimonials} />;
    }
    case "DONORS": {
      const donors = await prisma.donor.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
      return <DonorsSection title={section.title} donors={donors} />;
    }
    case "GALLERY": {
      const images = await prisma.galleryImage.findMany({ orderBy: { order: "asc" }, take: 12 });
      return <GallerySection title={section.title} images={images} />;
    }
    case "TEAM": {
      const members = await prisma.teamMember.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
      return <TeamSection title={section.title} members={members} />;
    }
    default:
      return (
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <p className="text-center text-gray-400 text-sm italic">Section type &ldquo;{section.type}&rdquo; — content coming soon.</p>
        </section>
      );
  }
}

/* ─── Sub-Components ─────────────────────────────────────── */

function BannerSection({ heading, backgroundImage }: { heading: string; backgroundImage?: string }) {
  return (
    <section
      className="relative py-24 md:py-32 flex items-center justify-center text-center"
      style={{
        backgroundColor: "#292943",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{heading}</h1>
      </div>
    </section>
  );
}

function RichTextSection({ html }: { html: string }) {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

function ImageTextSection({ image, text, layout }: { image: string; text: string; layout: string }) {
  const isLeft = layout === "image-left";
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className={`flex flex-col md:flex-row gap-8 items-center ${!isLeft ? "md:flex-row-reverse" : ""}`}>
        <div className="md:w-1/2">
          {image && <img src={image} alt="" className="rounded-xl w-full object-cover" />}
        </div>
        <div className="md:w-1/2 prose prose-lg" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </section>
  );
}

function CTASection({ heading, text, buttonText, buttonLink, backgroundImage }: { heading: string; text: string; buttonText: string; buttonLink: string; backgroundImage: string }) {
  return (
    <section
      className="relative py-20 text-center text-white"
      style={{
        backgroundColor: "#343877",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && <div className="absolute inset-0 bg-primary/80" />}
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        {text && <p className="text-lg mb-6 text-white/80">{text}</p>}
        {buttonText && (
          <a href={buttonLink} className="inline-block px-8 py-3 bg-accent-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

function StatsSection({ stats }: { stats: string }) {
  let items: { label: string; value: string }[] = [];
  try { items = JSON.parse(stats); } catch { /* ignore */ }

  return (
    <section className="py-16 px-6" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((item, i) => (
          <div key={i}>
            <p className="text-3xl md:text-4xl font-bold" style={{ color: "#343877" }}>{item.value}</p>
            <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ items }: { items: string }) {
  let faqs: { question: string; answer: string }[] = [];
  try { faqs = JSON.parse(items); } catch { /* ignore */ }

  return (
    <section className="py-16 px-6 max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="bg-white rounded-xl shadow-sm border p-4 group">
            <summary className="font-bold cursor-pointer list-none flex items-center justify-between" style={{ color: "#343877" }}>
              {faq.question}
              <span className="text-lg">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#666" }}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function SpacerSection({ height }: { height: string }) {
  const sizes: Record<string, string> = { sm: "32px", md: "64px", lg: "96px", xl: "128px" };
  return <div style={{ height: sizes[height] || "64px" }} />;
}

function DataListSection({ title, items, type }: { title: string | null; items: { id: string; title: string; description: string; image: string }[]; type: string }) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#343877" }}>{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />}
            <div className="p-5">
              <h3 className="font-bold mb-2" style={{ color: "#343877" }}>{item.title}</h3>
              <p className="text-sm line-clamp-3" style={{ color: "#666" }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ title, testimonials }: { title: string | null; testimonials: { id: string; quote: string; authorName: string; authorRole: string | null }[] }) {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#343877" }}>{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm italic mb-4" style={{ color: "#666" }}>&ldquo;{t.quote}&rdquo;</p>
              <p className="font-bold text-sm" style={{ color: "#343877" }}>{t.authorName}</p>
              {t.authorRole && <p className="text-xs" style={{ color: "#9e9e9e" }}>{t.authorRole}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonorsSection({ title, donors }: { title: string | null; donors: { id: string; name: string; logo: string; url: string | null }[] }) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#343877" }}>{title}</h2>}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {donors.map((d) => (
          <a key={d.id} href={d.url || "#"} target={d.url ? "_blank" : undefined} rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
            <img src={d.logo} alt={d.name} className="h-12 w-auto object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ title, images }: { title: string | null; images: { id: string; image: string; caption: string | null }[] }) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#343877" }}>{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group overflow-hidden rounded-lg">
            <img src={img.image} alt={img.caption || ""} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            {img.caption && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamSection({ title, members }: { title: string | null; members: { id: string; name: string; role: string; image: string | null; bio: string | null }[] }) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#343877" }}>{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((m) => (
          <div key={m.id} className="text-center">
            {m.image && <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-3" />}
            <h3 className="font-bold text-sm" style={{ color: "#343877" }}>{m.name}</h3>
            <p className="text-xs" style={{ color: "#9e9e9e" }}>{m.role}</p>
            {m.bio && <p className="text-xs mt-2" style={{ color: "#666" }}>{m.bio}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
