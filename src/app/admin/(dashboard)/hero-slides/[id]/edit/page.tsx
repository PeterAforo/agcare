import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HeroSlideForm from "../../HeroSlideForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditHeroSlidePage({ params }: Props) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });

  if (!slide) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>
        Edit Hero Slide
      </h1>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <HeroSlideForm
          mode="edit"
          initialData={{
            id: slide.id,
            title: slide.title,
            subtitle: slide.subtitle || "",
            ctaText: slide.ctaText || "",
            ctaLink: slide.ctaLink || "",
            image: slide.image,
            mobileImage: slide.mobileImage || "",
            tabletImage: slide.tabletImage || "",
            order: slide.order,
            isActive: slide.isActive,
          }}
        />
      </div>
    </div>
  );
}
