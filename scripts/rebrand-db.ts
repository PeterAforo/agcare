// One-off script: apply the AGREDS → AG Care Ghana rebrand + new programme
// content to an already-seeded database. Run: npx tsx --env-file=.env scripts/rebrand-db.ts
import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const fix = (s: string) =>
  s
    .replace(/AGREDS'/g, "AG Care Ghana's")
    .replace(/AGREDS/g, "AG Care Ghana")
    .replace(/agredsghana\.org/g, "agcareghana.org")
    .replace(/agreds/g, "agcare");

async function main() {
  console.log("Rebranding database...");

  // ─── Site settings ──────────────────────────────────────
  const settings = await prisma.siteSettings.findFirst();
  const newSettings = {
    siteName: "AG Care Ghana",
    tagline: "Transforming Lives Together",
    contactEmail: "info@agcareghana.org",
    contactPhone: "+233 302 966 331",
    contactPhone2: "+233 302 966 333",
    address:
      "P.O. Box CT482, Cantonments, 15 Kobla Nelson Rd, Abofu-Achimota, Accra - Ghana",
  };
  if (settings) {
    await prisma.siteSettings.update({ where: { id: settings.id }, data: newSettings });
    console.log("  ✅ Site settings updated");
  } else {
    await prisma.siteSettings.create({
      data: { ...newSettings, socialLinks: { facebook: "#", twitter: "#", instagram: "#" } },
    });
    console.log("  ✅ Site settings created");
  }

  // ─── Admin user name ────────────────────────────────────
  const admins = await prisma.user.findMany({ where: { name: { contains: "AGREDS" } } });
  for (const u of admins) {
    await prisma.user.update({ where: { id: u.id }, data: { name: fix(u.name ?? "") } });
  }
  if (admins.length) console.log(`  ✅ ${admins.length} user name(s) updated`);

  // ─── Hero slides ────────────────────────────────────────
  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.createMany({
    data: [
      {
        title: "Transforming Lives.\nBuilding Hope Across Ghana.",
        subtitle:
          "AG Care Ghana works with partners in the love of God to eliminate poverty — empowering vulnerable communities through education, health care and economic livelihood empowerment across Ghana.",
        ctaText: "Learn More",
        ctaLink: "#about",
        image: "/images/promo_1.jpg",
        tabletImage: "/images/834promo_1.jpg",
        mobileImage: "/images/375promo_1.jpg",
        order: 0,
      },
      {
        title: "Empowering Communities,\nChanging Futures.",
        subtitle:
          "From inclusive basic education and quality health care to vocational skills and community infrastructure, AG Care Ghana supports vulnerable and under-served communities — restoring dignity and building resilience through sustainable, community-led development.",
        ctaText: "Explore",
        ctaLink: "#causes",
        image: "/images/promo_2.jpg",
        tabletImage: "/images/834promo_2.jpg",
        mobileImage: "/images/375promo_2.jpg",
        order: 1,
      },
      {
        title: "Volunteers Bringing\nHope to Communities.",
        subtitle:
          "With 595 staff and dedicated volunteers working alongside the Church, the Government of Ghana and partners at home and abroad, AG Care Ghana has directly impacted over 200,000 lives in more than 60 communities.",
        ctaText: "Join Us",
        ctaLink: "#volunteer",
        image: "/images/promo_3.jpg",
        tabletImage: "/images/834promo_3.jpg",
        mobileImage: "/images/375promo_3.jpg",
        order: 2,
      },
    ],
  });
  console.log("  ✅ Hero slides replaced");

  // ─── Causes ─────────────────────────────────────────────
  await prisma.cause.deleteMany();
  await prisma.cause.createMany({
    data: [
      {
        title: "Inclusive Basic Education",
        description:
          "Building classroom blocks, teachers' quarters and WASH facilities, training teachers, and strengthening SMCs and PTAs across 36 supported communities in the Northern and Northeast Regions.",
        image: "/images/causes_3.jpg",
        badge: "Education",
        badgeColor: "#49C2DF",
        goalAmount: 150000,
        pledgedAmount: 76500,
        order: 0,
      },
      {
        title: "Quality Health Care (AGHS)",
        description:
          "Delivering preventive and curative care through our four health facilities in Saboba, Nakpanduri, Bontanga and Akim-Ofoase — staffed by about 600 health professionals.",
        image: "/images/causes_2.jpg",
        badge: "Health Services",
        badgeColor: "#F36F8F",
        goalAmount: 14000,
        pledgedAmount: 6098,
        order: 1,
      },
      {
        title: "Economic Livelihood Empowerment",
        description:
          "Equipping vulnerable young women, refugees and returned migrants with vocational and entrepreneurial skills to escape the cycle of poverty.",
        image: "/images/causes_1.jpg",
        badge: "Livelihoods",
        badgeColor: "#2EC774",
        goalAmount: 50000,
        pledgedAmount: 25000,
        order: 2,
      },
      {
        title: "The Lifeline Project",
        description:
          "Protecting vulnerable children and young people from trafficking and exploitative labour through protection, rehabilitation, reintegration and prevention — running since 1999.",
        image: "/images/causes_4.jpg",
        badge: "Child Protection",
        badgeColor: "#F8AC3A",
        goalAmount: 25000,
        pledgedAmount: 20350,
        order: 3,
      },
    ],
  });
  console.log("  ✅ Causes replaced");

  // ─── Projects ───────────────────────────────────────────
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Education Programme",
        description:
          "Improving access to quality kindergarten and primary education in under-served communities through school infrastructure, teacher capacity building, SMC/PTA strengthening, learning materials, WASH facilities and girl-child education advocacy — across 36 supported communities in the Northern and Northeast Regions with partners including Children Believe, ChorogUsan for Children and KOICA.",
        image: "/images/projects_3.jpg",
        badge: "Education",
        badgeColor: "#49C2DF",
        goalAmount: 25000,
        layoutType: "VERTICAL",
        order: 0,
      },
      {
        title: "Health Services (AGHS)",
        description:
          "Through Assemblies of God Health Services — AG Hospital Saboba, AG Health Centre Nakpanduri, AG Kings Medical Centre Bontanga and AG Eye Medical Centre Akim-Ofoase — we deliver compassionate, affordable, quality healthcare, community outreach and preventive health initiatives.",
        image: "/images/projects_2.jpg",
        badge: "Health Services",
        badgeColor: "#F36F8F",
        goalAmount: 25000,
        layoutType: "HORIZONTAL",
        order: 1,
      },
      {
        title: "Community Infrastructure Programme",
        description:
          "In partnership with World Servants Netherlands, we facilitate community-led construction and rehabilitation of essential facilities — school blocks and teachers', doctors' and nurses' accommodation — strengthening rural communities' capacity to deliver education and healthcare.",
        image: "/images/projects_1.jpg",
        badge: "Community Development",
        badgeColor: "#2EC774",
        goalAmount: 25000,
        layoutType: "PRIMARY",
        order: 2,
      },
      {
        title: "EU Migration, Return & Reintegration",
        description:
          "Supporting vulnerable migrants, returnees and their families returning from EU member countries through pre-departure counselling, airport pickup, vocational training, business start-up support, employment guidance, psycho-social support and family mediation.",
        image: "/images/projects_4.jpg",
        badge: "Reintegration",
        badgeColor: "#343877",
        goalAmount: 25000,
        layoutType: "PRIMARY",
        order: 3,
      },
      {
        title: "The Lifeline Project",
        description:
          "Since 1999, protecting vulnerable children and young people — especially girls aged 15–20 — from trafficking and exploitative labour through supervised care, counselling, literacy, vocational skills and business start-up kits. Active in La Nkwantanang Madina Municipal and Mion District with partners including Kerk in Actie.",
        image: "/images/projects_5.jpg",
        badge: "Child Protection",
        badgeColor: "#F8AC3A",
        goalAmount: 25000,
        layoutType: "HORIZONTAL",
        order: 4,
      },
    ],
  });
  console.log("  ✅ Projects replaced");

  // ─── Testimonials ───────────────────────────────────────
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        quote:
          "Through AG Care Ghana's support, my children are now in school and receiving regular meals. The community programmes have restored hope to families like mine who were struggling. We are truly grateful for the love and dignity they bring to our lives.",
        authorName: "Amina Yakubu",
        authorRole: "Community Beneficiary",
        order: 0,
      },
      {
        quote:
          "Volunteering with AG Care Ghana has been one of the most fulfilling experiences of my life. Whether we are supporting children, assisting in rural clinics, or engaging communities, the impact is real and immediate. You see lives changing every day.",
        authorName: "Samuel Owusu",
        authorRole: "Volunteer",
        order: 1,
      },
      {
        quote:
          "AG Care Ghana is a true extension of the church's mission. Their interventions in health, education, and family support have transformed entire communities. Partnering with them allows us to reach people with both the Gospel and practical compassion.",
        authorName: "Rev. Daniel Mensah",
        authorRole: "Partner Pastor",
        order: 2,
      },
    ],
  });
  console.log("  ✅ Testimonials replaced");

  // ─── Blog posts (in-place text fix, preserves IDs) ─────
  const posts = await prisma.blogPost.findMany();
  let postFixed = 0;
  for (const p of posts) {
    const data = {
      title: fix(p.title),
      slug: fix(p.slug),
      excerpt: p.excerpt ? fix(p.excerpt) : p.excerpt,
      content: p.content ? fix(p.content) : p.content,
      badge: p.badge ? fix(p.badge) : p.badge,
    };
    if (
      data.title !== p.title ||
      data.slug !== p.slug ||
      data.excerpt !== p.excerpt ||
      data.content !== p.content ||
      data.badge !== p.badge
    ) {
      await prisma.blogPost.update({ where: { id: p.id }, data });
      postFixed++;
    }
  }
  if (postFixed) console.log(`  ✅ ${postFixed} blog post(s) updated`);

  // ─── Pages + sections (in-place text fix) ───────────────
  const pages = await prisma.page.findMany({ include: { sections: true } });
  let sectionsFixed = 0;
  for (const page of pages) {
    const pageData = {
      title: fix(page.title),
      metaDescription: page.metaDescription ? fix(page.metaDescription) : page.metaDescription,
      metaKeywords: page.metaKeywords ? fix(page.metaKeywords) : page.metaKeywords,
    };
    if (
      pageData.title !== page.title ||
      pageData.metaDescription !== page.metaDescription ||
      pageData.metaKeywords !== page.metaKeywords
    ) {
      await prisma.page.update({ where: { id: page.id }, data: pageData });
    }
    for (const s of page.sections) {
      const newTitle = s.title != null ? fix(s.title) : s.title;
      const contentStr = s.content ? JSON.stringify(s.content) : null;
      const newContentStr = contentStr ? fix(contentStr) : null;
      if (newTitle !== s.title || newContentStr !== contentStr) {
        await prisma.section.update({
          where: { id: s.id },
          data: {
            title: newTitle,
            ...(newContentStr ? { content: JSON.parse(newContentStr) } : {}),
          },
        });
        sectionsFixed++;
      }
    }
  }
  if (sectionsFixed) console.log(`  ✅ ${sectionsFixed} page section(s) updated`);

  // ─── Menu items ─────────────────────────────────────────
  const items = await prisma.menuItem.findMany();
  let itemsFixed = 0;
  for (const it of items) {
    const newLabel = fix(it.label);
    if (newLabel !== it.label) {
      await prisma.menuItem.update({ where: { id: it.id }, data: { label: newLabel } });
      itemsFixed++;
    }
  }
  if (itemsFixed) console.log(`  ✅ ${itemsFixed} menu item(s) updated`);

  console.log("Done — database rebranded to AG Care Ghana.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
