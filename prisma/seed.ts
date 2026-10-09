import { PrismaClient, Role } from "./generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { hash } from "bcryptjs";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Create Super Admin ────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@agcareghana.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "Agcare@2025!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: "AG Care Ghana Admin",
        email: adminEmail,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
      },
    });
    console.log(`  ✅ Super admin created: ${adminEmail}`);
  } else {
    console.log(`  ⏭️  Super admin already exists: ${adminEmail}`);
  }

  // ─── Site Settings ─────────────────────────────────────
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        siteName: "AG Care Ghana",
        tagline: "Transforming Lives Together",
        contactEmail: "info@agcareghana.org",
        contactPhone: "+233 302 966 331",
        contactPhone2: "+233 302 966 333",
        address: "P.O. Box CT482, Cantonments, 15 Kobla Nelson Rd, Abofu-Achimota, Accra - Ghana",
        socialLinks: {
          facebook: "#",
          twitter: "#",
          instagram: "#",
        },
      },
    });
    console.log("  ✅ Site settings created");
  }

  // ─── Hero Slides ───────────────────────────────────────
  const heroCount = await prisma.heroSlide.count();
  if (heroCount === 0) {
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
    console.log("  ✅ Hero slides created");
  }

  // ─── Causes ────────────────────────────────────────────
  const causeCount = await prisma.cause.count();
  if (causeCount === 0) {
    await prisma.cause.createMany({
      data: [
        {
          title: "Inclusive Basic Education",
          description:
            "Building classroom blocks, teachers' quarters and WASH facilities, training teachers, and strengthening SMCs and PTAs across 36 supported communities in the Northern and Northeast Regions.",
          image: "/images/education/block.jpg",
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
          image: "/images/lifeline/soap-making-training-for-ag-women-in-tamale.jpg",
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
          image: "/images/lifeline/photo-4.jpg",
          badge: "Child Protection",
          badgeColor: "#F8AC3A",
          goalAmount: 25000,
          pledgedAmount: 20350,
          order: 3,
        },
      ],
    });
    console.log("  ✅ Causes created");
  }

  // ─── Projects ──────────────────────────────────────────
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Education Programme",
          description:
            "Improving access to quality kindergarten and primary education in under-served communities through school infrastructure, teacher capacity building, SMC/PTA strengthening, learning materials, WASH facilities and girl-child education advocacy — across 36 supported communities in the Northern and Northeast Regions with partners including Children Believe, ChorogUsan for Children and KOICA.",
          image: "/images/education/education-model-early-childhood-education-centre.jpg",
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
          image: "/images/community-infrastructure/volunteers-busy-at-kokosiase-construction-site-2.jpg",
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
          image: "/images/lifeline/skills-training.jpg",
          badge: "Child Protection",
          badgeColor: "#F8AC3A",
          goalAmount: 25000,
          layoutType: "HORIZONTAL",
          order: 4,
        },
      ],
    });
    console.log("  ✅ Projects created");
  }

  // ─── Gallery ───────────────────────────────────────────
  const galleryCount = await prisma.galleryImage.count();
  if (galleryCount === 0) {
    await prisma.galleryImage.createMany({
      data: [
        // Education
        { image: "/images/education/block.jpg", caption: "Classroom Block", category: "Education", order: 0 },
        { image: "/images/education/education-model-early-childhood-education-centre.jpg", caption: "Model Early Childhood Education Centre", category: "Education", order: 1 },
        { image: "/images/education/education-opening-of-early-childhood-educationn-centre-at-namenboku.jpg", caption: "Opening of Early Childhood Education Centre at Namenboku", category: "Education", order: 2 },
        { image: "/images/education/photo-0253.jpg", caption: "Education Programme Field Photo", category: "Education", order: 3 },
        { image: "/images/education/school-health-session-education.jpg", caption: "School Health Session", category: "Education", order: 4 },
        { image: "/images/education/photo-2026-03-26.jpg", caption: "Education Programme Activity", category: "Education", order: 5 },
        // Community Infrastructure
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
        // Lifeline Project
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
    console.log("  ✅ Gallery images created");
  }

  // ─── Events ────────────────────────────────────────────
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    await prisma.event.createMany({
      data: [
        {
          title: "Rural Medical & Health Screening Outreach",
          location: "Northern Region, Ghana",
          startDate: new Date("2025-10-10"),
          endDate: new Date("2025-10-14"),
          time: "9:00 AM - 4:00 PM Daily",
          image: "/images/event_1.jpg",
        },
        {
          title: "Women's Skill Training & Empowerment Workshop",
          location: "Yendi Girls Vocational Institute",
          startDate: new Date("2025-11-05"),
          endDate: new Date("2025-11-07"),
          time: "10:00 AM - 5:00 PM",
          image: "/images/event_2.jpg",
        },
        {
          title: "Child Development & Family Support Forum",
          location: "Accra - Assemblies of God HQ",
          startDate: new Date("2025-12-03"),
          time: "9:00 AM - 2:00 PM",
          image: "/images/event_3.jpg",
        },
      ],
    });
    console.log("  ✅ Events created");
  }

  // ─── Testimonials ──────────────────────────────────────
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
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
    console.log("  ✅ Testimonials created");
  }

  // ─── Donors ────────────────────────────────────────────
  const donorCount = await prisma.donor.count();
  if (donorCount === 0) {
    await prisma.donor.createMany({
      data: [
        { name: "Donor 1", logo: "/images/donor_1.png", order: 0 },
        { name: "Donor 2", logo: "/images/donor_2.png", order: 1 },
        { name: "Donor 3", logo: "/images/donor_3.png", order: 2 },
        { name: "Donor 4", logo: "/images/donor_4.png", order: 3 },
      ],
    });
    console.log("  ✅ Donors created");
  }

  // ─── Blog Posts ────────────────────────────────────────
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: "AG Care Ghana Commissions New Borehole to Support Rural Families",
          slug: "AG Care Ghana-commissions-new-borehole",
          excerpt:
            "A new clean water facility has been commissioned in the Northern Region, providing relief to households that previously walked long distances for water.",
          image: "/images/blog_1.jpg",
          badge: "Community Development",
          badgeColor: "#49C2DF",
          isPublished: true,
          publishedAt: new Date("2025-10-10"),
        },
        {
          title: "Literacy Support Programme Expands to 12 Additional Communities",
          slug: "literacy-support-programme-expands",
          excerpt:
            "AG Care Ghana has launched new literacy centres to support children and adults who lack access to basic education, empowering local communities through learning.",
          image: "/images/blog_2.png",
          badge: "Education",
          badgeColor: "#2EC774",
          isPublished: true,
          publishedAt: new Date("2025-10-02"),
        },
        {
          title: "AG Care Ghana Provides Emergency Relief to Flood-Affected Families",
          slug: "emergency-relief-flood-affected-families",
          excerpt:
            "In response to recent flooding, AG Care Ghana mobilized emergency food supplies, clothing, and temporary shelter to support displaced families.",
          image: "/images/blog_3.png",
          badge: "Relief Support",
          badgeColor: "#F8AC3A",
          isPublished: true,
          publishedAt: new Date("2025-09-18"),
        },
        {
          title: "Mobile Clinic Extends Healthcare to Hard-to-Reach Communities",
          slug: "mobile-clinic-extends-healthcare",
          excerpt:
            "AG Care Ghana's mobile medical outreach has delivered screenings, medicines, and maternal health support to rural areas lacking access to hospitals.",
          image: "/images/blog_4.png",
          badge: "Health",
          badgeColor: "#F36F8F",
          isPublished: true,
          publishedAt: new Date("2025-10-05"),
        },
      ],
    });
    console.log("  ✅ Blog posts created");
  }

  // ─── PAGES ──────────────────────────────────────────────
  const pageCount = await prisma.page.count();
  if (pageCount === 0) {
    const homePage = await prisma.page.create({
      data: {
        slug: "home",
        title: "Home",
        metaDescription: "AG Care Ghana — the humanitarian and development agency of the Assemblies of God Church, Ghana. Transforming Lives Together.",
        isPublished: true,
        template: "home",
        sections: {
          create: [
            { type: "HERO", title: "Hero Slider", order: 0 },
            { type: "ABOUT", title: "About AG Care Ghana", order: 1 },
            { type: "ICONS", title: "What We Do", order: 2 },
            { type: "CAUSES", title: "Our Causes", order: 3 },
            { type: "PROJECTS", title: "Our Projects", order: 4 },
            { type: "EVENTS", title: "Upcoming Events", order: 5 },
            { type: "CTA", title: "Become a Volunteer", order: 6 },
            { type: "TESTIMONIALS", title: "Testimonials", order: 7 },
            { type: "BLOG", title: "Latest News", order: 8 },
            { type: "DONORS", title: "Our Partners", order: 9 },
            { type: "SUBSCRIBE", title: "Newsletter", order: 10 },
          ],
        },
      },
    });

    const aboutProfile = await prisma.page.create({
      data: {
        slug: "about/profile",
        title: "Our Profile",
        metaDescription: "Learn about AG Care Ghana and our mission to empower communities in Ghana.",
        isPublished: true,
        sections: {
          create: [
            { type: "BANNER", title: "Page Banner", order: 0, content: { heading: "Our Profile", breadcrumb: true } },
            { type: "RICH_TEXT", title: "About Content", order: 1, content: { html: "<p>AG Care Ghana is the relief and development arm of the Assemblies of God Church, Ghana...</p>" } },
          ],
        },
      },
    });

    const aboutGovernance = await prisma.page.create({
      data: {
        slug: "about/governance",
        title: "Governance",
        metaDescription: "AG Care Ghana leadership and governance structure.",
        isPublished: true,
        sections: {
          create: [
            { type: "BANNER", title: "Page Banner", order: 0, content: { heading: "Governance", breadcrumb: true } },
            { type: "TEAM", title: "Leadership Team", order: 1 },
          ],
        },
      },
    });

    const aboutHistory = await prisma.page.create({ data: { slug: "about/history", title: "Our History", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Our History" } }, { type: "RICH_TEXT", title: "Timeline", order: 1 }] } } });
    const aboutMission = await prisma.page.create({ data: { slug: "about/mission", title: "Mission & Vision", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Mission & Vision" } }, { type: "RICH_TEXT", title: "Content", order: 1 }] } } });
    const aboutImpact = await prisma.page.create({ data: { slug: "about/impact", title: "Our Impact", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Our Impact" } }, { type: "STATS", title: "Impact Stats", order: 1 }, { type: "RICH_TEXT", title: "Content", order: 2 }] } } });

    const causesPrograms = await prisma.page.create({ data: { slug: "causes/programs", title: "Our Programs", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Programs" } }, { type: "CAUSES", title: "Programs List", order: 1 }] } } });
    const causesProjects = await prisma.page.create({ data: { slug: "causes/projects", title: "Our Projects", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Projects" } }, { type: "PROJECTS", title: "Projects Grid", order: 1 }] } } });

    const getInvolvedVolunteer = await prisma.page.create({ data: { slug: "get-involved/volunteer", title: "Volunteer", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Volunteer With Us" } }, { type: "RICH_TEXT", title: "Content", order: 1 }, { type: "CONTACT_FORM", title: "Volunteer Form", order: 2 }] } } });
    const getInvolvedDonate = await prisma.page.create({ data: { slug: "get-involved/donate", title: "Donate", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Make a Donation" } }, { type: "RICH_TEXT", title: "Content", order: 1 }] } } });
    const getInvolvedPartner = await prisma.page.create({ data: { slug: "get-involved/partner", title: "Partner With Us", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Partner With Us" } }, { type: "RICH_TEXT", title: "Content", order: 1 }, { type: "DONORS", title: "Current Partners", order: 2 }] } } });

    const mediaNews = await prisma.page.create({ data: { slug: "media/news", title: "News & Updates", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "News & Updates" } }, { type: "BLOG", title: "Blog Posts", order: 1 }] } } });
    const mediaReports = await prisma.page.create({ data: { slug: "media/reports", title: "Reports", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Reports" } }, { type: "RICH_TEXT", title: "Content", order: 1 }] } } });
    const mediaStories = await prisma.page.create({ data: { slug: "media/stories", title: "Success Stories", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Success Stories" } }, { type: "RICH_TEXT", title: "Content", order: 1 }] } } });
    const mediaPhotos = await prisma.page.create({ data: { slug: "media/photos", title: "Photo Gallery", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Photo Gallery" } }, { type: "GALLERY", title: "Gallery", order: 1 }] } } });
    const mediaVideos = await prisma.page.create({ data: { slug: "media/videos", title: "Videos", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Videos" } }, { type: "RICH_TEXT", title: "Content", order: 1 }] } } });

    const contactsPage = await prisma.page.create({ data: { slug: "contacts", title: "Contact Us", isPublished: true, sections: { create: [{ type: "BANNER", title: "Banner", order: 0, content: { heading: "Contact Us" } }, { type: "CONTACT_FORM", title: "Contact Form", order: 1 }, { type: "RICH_TEXT", title: "Map & Address", order: 2 }] } } });

    console.log("  ✅ Pages created");

    // ─── MENUS ──────────────────────────────────────────────
    const mainMenu = await prisma.menu.create({
      data: { name: "Main Navigation", location: "HEADER" },
    });
    const m = mainMenu.id;

    // Top-level items
    const miHome = await prisma.menuItem.create({ data: { menuId: m, label: "Home", pageId: homePage.id, order: 0 } });
    const miAbout = await prisma.menuItem.create({ data: { menuId: m, label: "About", href: "#", order: 1 } });
    const miCauses = await prisma.menuItem.create({ data: { menuId: m, label: "Causes", href: "#", order: 2 } });
    const miGetInvolved = await prisma.menuItem.create({ data: { menuId: m, label: "Get Involved", href: "#", order: 3 } });
    const miMedia = await prisma.menuItem.create({ data: { menuId: m, label: "Media", href: "#", order: 4 } });
    const miContacts = await prisma.menuItem.create({ data: { menuId: m, label: "Contacts", pageId: contactsPage.id, order: 5 } });

    // About children
    await prisma.menuItem.createMany({ data: [
      { menuId: m, parentId: miAbout.id, label: "Profile", pageId: aboutProfile.id, order: 0 },
      { menuId: m, parentId: miAbout.id, label: "Governance", pageId: aboutGovernance.id, order: 1 },
      { menuId: m, parentId: miAbout.id, label: "History", pageId: aboutHistory.id, order: 2 },
      { menuId: m, parentId: miAbout.id, label: "Mission & Vision", pageId: aboutMission.id, order: 3 },
      { menuId: m, parentId: miAbout.id, label: "Our Impact", pageId: aboutImpact.id, order: 4 },
    ]});
    // Causes children
    await prisma.menuItem.createMany({ data: [
      { menuId: m, parentId: miCauses.id, label: "Programs", pageId: causesPrograms.id, order: 0 },
      { menuId: m, parentId: miCauses.id, label: "Projects", pageId: causesProjects.id, order: 1 },
    ]});
    // Get Involved children
    await prisma.menuItem.createMany({ data: [
      { menuId: m, parentId: miGetInvolved.id, label: "Volunteer", pageId: getInvolvedVolunteer.id, order: 0 },
      { menuId: m, parentId: miGetInvolved.id, label: "Donate", pageId: getInvolvedDonate.id, order: 1 },
      { menuId: m, parentId: miGetInvolved.id, label: "Partner", pageId: getInvolvedPartner.id, order: 2 },
    ]});
    // Media children
    await prisma.menuItem.createMany({ data: [
      { menuId: m, parentId: miMedia.id, label: "News", pageId: mediaNews.id, order: 0 },
      { menuId: m, parentId: miMedia.id, label: "Reports", pageId: mediaReports.id, order: 1 },
      { menuId: m, parentId: miMedia.id, label: "Success Stories", pageId: mediaStories.id, order: 2 },
      { menuId: m, parentId: miMedia.id, label: "Photos", pageId: mediaPhotos.id, order: 3 },
      { menuId: m, parentId: miMedia.id, label: "Videos", pageId: mediaVideos.id, order: 4 },
    ]});

    // Footer menu
    const footerMenu = await prisma.menu.create({
      data: { name: "Footer Navigation", location: "FOOTER" },
    });
    await prisma.menuItem.createMany({ data: [
      { menuId: footerMenu.id, label: "About AG Care Ghana", pageId: aboutProfile.id, order: 0 },
      { menuId: footerMenu.id, label: "Our Programs", pageId: causesPrograms.id, order: 1 },
      { menuId: footerMenu.id, label: "Volunteer", pageId: getInvolvedVolunteer.id, order: 2 },
      { menuId: footerMenu.id, label: "Donate", pageId: getInvolvedDonate.id, order: 3 },
      { menuId: footerMenu.id, label: "News", pageId: mediaNews.id, order: 4 },
      { menuId: footerMenu.id, label: "Contact Us", pageId: contactsPage.id, order: 5 },
    ]});

    console.log("  ✅ Menus created");
  }

  // ── PAYMENT GATEWAY (placeholder — fill credentials in /admin/gateways) ──
  const existingGateway = await prisma.paymentGateway.findFirst();
  if (!existingGateway) {
    await prisma.paymentGateway.create({
      data: {
        name: "PaySwitch Teller",
        provider: "teller",
        isActive: false,
        isDefault: true,
        credentials: {
          merchantId: "",
          apiuser: "",
          apiKey: "",
          environment: "test",
        },
      },
    });
    console.log("  ✅ Payment gateway placeholder created");
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
