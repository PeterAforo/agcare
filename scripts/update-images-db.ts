// Update cause/project images to real photos and populate the gallery.
// Run: npx tsx --env-file=.env scripts/update-images-db.ts
import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  // ─── Hero slide images ──────────────────────────────────
  const heroImages: Record<number, string> = {
    0: "/images/community-infrastructure/symbolic-handing-over-at-kokosiase.jpg",
    1: "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg",
    2: "/images/community-infrastructure/volunteers-busy-at-kokosiase-construction-site-2.jpg",
  };
  for (const [order, image] of Object.entries(heroImages)) {
    const r = await prisma.heroSlide.updateMany({
      where: { order: Number(order) },
      data: { image, tabletImage: image, mobileImage: image },
    });
    console.log(`  heroSlide order ${order}: ${r.count} updated`);
  }

  // ─── Cause images ───────────────────────────────────────
  const causeImages: Record<string, string> = {
    "Inclusive Basic Education": "/images/education/block.jpg",
    "Quality Health Care (AGHS)": "/images/education/school-health-session-education.jpg",
    "Economic Livelihood Empowerment":
      "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg",
    "The Lifeline Project": "/images/lifeline/photo-4.jpg",
  };
  for (const [title, image] of Object.entries(causeImages)) {
    const r = await prisma.cause.updateMany({ where: { title }, data: { image } });
    console.log(`  cause "${title}": ${r.count} updated`);
  }

  // ─── Project images ─────────────────────────────────────
  const projectImages: Record<string, string> = {
    "Education Programme":
      "/images/education/education-model-early-childhood-education-centre.jpg",
    "Health Services (AGHS)": "/images/education/school-health-session-education.jpg",
    "Community Infrastructure Programme":
      "/images/community-infrastructure/volunteers-busy-at-kokosiase-construction-site-2.jpg",
    "EU Migration, Return & Reintegration": "/images/lifeline/photo-20241023-105706.jpg",
    "The Lifeline Project": "/images/lifeline/skills-training.jpg",
  };
  for (const [title, image] of Object.entries(projectImages)) {
    const r = await prisma.project.updateMany({ where: { title }, data: { image } });
    console.log(`  project "${title}": ${r.count} updated`);
  }

  // ─── Event images ───────────────────────────────────────
  const eventImages: Record<string, string> = {
    "Rural Medical & Health Screening Outreach":
      "/images/education/school-health-session-education.jpg",
    "Women's Skill Training & Empowerment Workshop": "/images/lifeline/photo-2.jpg",
    "Child Development & Family Support Forum": "/images/education/photo-2026-03-26.jpg",
  };
  for (const [title, image] of Object.entries(eventImages)) {
    const r = await prisma.event.updateMany({ where: { title }, data: { image } });
    console.log(`  event "${title}": ${r.count} updated`);
  }

  // ─── Blog post images ───────────────────────────────────
  const blogImages: Record<string, string> = {
    "agcare-commissions-new-borehole":
      "/images/community-infrastructure/symbolic-handing-over-at-kokosiase.jpg",
    "literacy-support-programme-expands": "/images/education/photo-0253.jpg",
    "emergency-relief-flood-affected-families":
      "/images/community-infrastructure/volunteers-at-construction-site-6.jpg",
    "mobile-clinic-extends-healthcare": "/images/education/school-health-session-education.jpg",
  };
  for (const [slug, image] of Object.entries(blogImages)) {
    const r = await prisma.blogPost.updateMany({ where: { slug }, data: { image } });
    console.log(`  blogPost "${slug}": ${r.count} updated`);
  }

  // ─── Gallery ────────────────────────────────────────────
  await prisma.galleryImage.deleteMany();
  await prisma.galleryImage.createMany({
    data: [
      { image: "/images/education/block.jpg", caption: "Classroom Block", category: "Education", order: 0 },
      { image: "/images/education/education-model-early-childhood-education-centre.jpg", caption: "Model Early Childhood Education Centre", category: "Education", order: 1 },
      { image: "/images/education/education-opening-of-early-childhood-educationn-centre-at-namenboku.jpg", caption: "Opening of Early Childhood Education Centre at Namenboku", category: "Education", order: 2 },
      { image: "/images/education/photo-0253.jpg", caption: "Education Programme Field Photo", category: "Education", order: 3 },
      { image: "/images/education/school-health-session-education.jpg", caption: "School Health Session", category: "Education", order: 4 },
      { image: "/images/education/photo-2026-03-26.jpg", caption: "Education Programme Activity", category: "Education", order: 5 },
      { image: "/images/community-infrastructure/classroom-block-at-kokosiase.jpg", caption: "Classroom Block at Kokosiase", category: "Community Infrastructure", order: 6 },
      { image: "/images/community-infrastructure/cultural-interactions-between-volunteers-and-community.jpg", caption: "Cultural Interactions Between Volunteers and Community", category: "Community Infrastructure", order: 7 },
      { image: "/images/community-infrastructure/symbolic-handing-over-at-kokosiase.jpg", caption: "Symbolic Handing Over at Kokosiase", category: "Community Infrastructure", order: 8 },
      { image: "/images/community-infrastructure/teachers-block-at-namiyela.jpg", caption: "Teachers' Block at Namiyela", category: "Community Infrastructure", order: 9 },
      { image: "/images/community-infrastructure/volunteer-11-vrs-kokosiase-11-football-match.jpg", caption: "Volunteer 11 vs Kokosiase 11 Football Match", category: "Community Infrastructure", order: 10 },
      { image: "/images/community-infrastructure/volunteers-at-construction-site-2.jpg", caption: "Volunteers at Construction Site", category: "Community Infrastructure", order: 11 },
      { image: "/images/community-infrastructure/volunteers-at-construction-site-3.jpg", caption: "Volunteers at Construction Site", category: "Community Infrastructure", order: 12 },
      { image: "/images/community-infrastructure/volunteers-at-construction-site-4.jpg", caption: "Volunteers at Construction Site", category: "Community Infrastructure", order: 13 },
      { image: "/images/community-infrastructure/volunteers-at-construction-site-5.jpg", caption: "Volunteers at Construction Site", category: "Community Infrastructure", order: 14 },
      { image: "/images/community-infrastructure/volunteers-at-construction-site-6.jpg", caption: "Volunteers at Construction Site", category: "Community Infrastructure", order: 15 },
      { image: "/images/community-infrastructure/volunteers-busy-at-kokosiase-construction-site-2.jpg", caption: "Volunteers Busy at Kokosiase Construction Site", category: "Community Infrastructure", order: 16 },
      { image: "/images/community-infrastructure/volunteerss-honoured-at-kokosiase.jpg", caption: "Volunteers Honoured at Kokosiase", category: "Community Infrastructure", order: 17 },
      { image: "/images/lifeline/photo-20210323-124217.jpg", caption: "Lifeline Project — Livelihoods Training", category: "Lifeline", order: 18 },
      { image: "/images/lifeline/photo-20210324-150403.jpg", caption: "Lifeline Project — Livelihoods Training", category: "Lifeline", order: 19 },
      { image: "/images/lifeline/photo-20210326-124930.jpg", caption: "Lifeline Project — Livelihoods Training", category: "Lifeline", order: 20 },
      { image: "/images/lifeline/photo-20241023-105706.jpg", caption: "Lifeline Project — Livelihoods Training", category: "Lifeline", order: 21 },
      { image: "/images/lifeline/photo-2.jpg", caption: "Lifeline Project Activity", category: "Lifeline", order: 22 },
      { image: "/images/lifeline/photo-3.jpg", caption: "Lifeline Project Activity", category: "Lifeline", order: 23 },
      { image: "/images/lifeline/photo-4.jpg", caption: "Lifeline Project Activity", category: "Lifeline", order: 24 },
      { image: "/images/lifeline/photo-6.jpg", caption: "Lifeline Project Activity", category: "Lifeline", order: 25 },
      { image: "/images/lifeline/skills-training.jpg", caption: "Skills Training — Lifeline Project", category: "Lifeline", order: 26 },
      { image: "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg", caption: "Soap Making Training for AG Women in Tamale", category: "Lifeline", order: 27 },
    ],
  });
  console.log("  ✅ Gallery populated (28 images)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
