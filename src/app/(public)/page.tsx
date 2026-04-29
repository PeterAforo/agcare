import { prisma } from "@/lib/prisma";
import HeroSlider from "@/components/public/HeroSlider";
import AboutSection from "@/components/public/AboutSection";
import IconsSection from "@/components/public/IconsSection";
import CausesSlider from "@/components/public/CausesSlider";
import ProjectsMasonry from "@/components/public/ProjectsMasonry";
import EventsSection from "@/components/public/EventsSection";
import VolunteerCTA from "@/components/public/VolunteerCTA";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import BlogSection from "@/components/public/BlogSection";
import DonorsSlider from "@/components/public/DonorsSlider";
import InstagramSlider from "@/components/public/InstagramSlider";
import SubscribeSection from "@/components/public/SubscribeSection";

export default async function Home() {
  const [heroSlides, causes, projects, events, testimonials, blogPosts, donors] =
    await Promise.all([
      prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.cause.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.project.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } }),
      prisma.event.findMany({ where: { isPublished: true }, orderBy: { startDate: "asc" }, take: 3 }),
      prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 4 }),
      prisma.donor.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    ]);

  return (
    <>
      <HeroSlider slides={JSON.parse(JSON.stringify(heroSlides))} />
      <AboutSection />
      <IconsSection />
      <CausesSlider causes={JSON.parse(JSON.stringify(causes))} />
      <ProjectsMasonry projects={JSON.parse(JSON.stringify(projects))} />
      <EventsSection events={JSON.parse(JSON.stringify(events))} />
      <VolunteerCTA />
      <TestimonialsSection testimonials={JSON.parse(JSON.stringify(testimonials))} />
      <BlogSection posts={JSON.parse(JSON.stringify(blogPosts))} />
      <DonorsSlider donors={JSON.parse(JSON.stringify(donors))} />
      <InstagramSlider />
      <SubscribeSection />
    </>
  );
}
