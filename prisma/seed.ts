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
  const adminEmail = process.env.ADMIN_EMAIL || "admin@agredsghana.org";
  const adminPassword = process.env.ADMIN_PASSWORD || "Agreds@2025!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: "AGREDS Admin",
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
        siteName: "AGREDS",
        tagline: "The Assemblies of God Relief and Development Services",
        contactEmail: "info@agredsghana.org",
        contactPhone: "+233 30 229 062",
        contactPhone2: "+233 30 224 507",
        address: "P.O. Box AN 7593, Accra - Ghana",
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
            "AGREDS fights hunger, poverty, disease, illiteracy, and social injustice—empowering vulnerable children, women, families, and entire communities through education, health services, relief support, and sustainable development rooted in Christian compassion.",
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
            "From health outreach and child development to vocational training and disaster relief, AGREDS supports vulnerable communities across Ghana—restoring dignity and helping families rebuild their lives through sustainable, Christ-centered development programmes.",
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
            "Through dedicated volunteers, church networks, and community partners, AGREDS delivers essential support to vulnerable families—touching lives through outreach clinics, child development programs, peacebuilding, and emergency relief efforts across Ghana.",
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
          title: "Clean Water & Sanitation Support",
          description:
            "Providing safe drinking water, sanitation facilities, and hygiene education to underserved rural communities across Ghana.",
          image: "/images/causes_1.jpg",
          badge: "Water & Sanitation",
          badgeColor: "#49C2DF",
          goalAmount: 25000,
          pledgedAmount: 20350,
          order: 0,
        },
        {
          title: "Rural Health & Medical Outreach",
          description:
            "Supporting clinics, hospitals, and mobile outreach services to deliver essential healthcare to remote and vulnerable families.",
          image: "/images/causes_2.jpg",
          badge: "Health Services",
          badgeColor: "#F36F8F",
          goalAmount: 14000,
          pledgedAmount: 6098,
          order: 1,
        },
        {
          title: "Education & Child Development",
          description:
            "Supporting pre-schools, literacy programmes, child development centres, and educational assistance for vulnerable children.",
          image: "/images/causes_3.jpg",
          badge: "Education",
          badgeColor: "#2EC774",
          goalAmount: 150000,
          pledgedAmount: 76500,
          order: 2,
        },
        {
          title: "Food & Family Assistance",
          description:
            "Providing nutritional support, family strengthening interventions, and emergency food relief to vulnerable households.",
          image: "/images/causes_4.jpg",
          badge: "Food Support",
          badgeColor: "#F8AC3A",
          goalAmount: 50000,
          pledgedAmount: 25000,
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
          title: "Clean Water for Rural Communities",
          description:
            "AGREDS works with local communities to provide access to safe drinking water, improved sanitation, and hygiene education to reduce disease and improve quality of life.",
          image: "/images/projects_1.jpg",
          badge: "Water & Sanitation",
          badgeColor: "#49C2DF",
          goalAmount: 25000,
          layoutType: "VERTICAL",
          order: 0,
        },
        {
          title: "Strengthening Rural Health Facilities",
          description:
            "Through Saboba Hospital, Nakpanduri Health Centre, and medical outreaches, AGREDS improves access to healthcare for marginalized and underserved populations.",
          image: "/images/projects_2.jpg",
          badge: "Health Services",
          badgeColor: "#F36F8F",
          goalAmount: 25000,
          layoutType: "HORIZONTAL",
          order: 1,
        },
        {
          title: "Child Development & Educational Support",
          description:
            "AGREDS supports pre-schools, literacy programmes, and child development initiatives to give vulnerable children the opportunity to learn, grow, and thrive.",
          image: "/images/projects_3.jpg",
          badge: "Child Support",
          badgeColor: "#F8AC3A",
          goalAmount: 25000,
          layoutType: "PRIMARY",
          order: 2,
        },
        {
          title: "Girls' Vocational Training Support",
          description:
            "Through the Yendi Girls Vocational Institute, AGREDS equips young women with employable skills and economic empowerment opportunities.",
          image: "/images/projects_4.jpg",
          badge: "Education",
          badgeColor: "#2EC774",
          goalAmount: 25000,
          layoutType: "PRIMARY",
          order: 3,
        },
        {
          title: "Empowering Families & Local Communities",
          description:
            "AGREDS strengthens rural families through economic empowerment, peacebuilding, family assistance programmes, and long-term development interventions.",
          image: "/images/projects_5.jpg",
          badge: "Community Development",
          badgeColor: "#2EC774",
          goalAmount: 25000,
          layoutType: "HORIZONTAL",
          order: 4,
        },
        {
          title: "Emergency Aid & Disaster Support",
          description:
            "AGREDS provides food, shelter, and emergency assistance to communities affected by disasters, conflict, and displacement—including refugee and crisis areas.",
          image: "/images/projects_6.jpg",
          badge: "Relief",
          badgeColor: "#F36F8F",
          goalAmount: 25000,
          layoutType: "PRIMARY",
          order: 5,
        },
      ],
    });
    console.log("  ✅ Projects created");
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
            "Through AGREDS' support, my children are now in school and receiving regular meals. The community programmes have restored hope to families like mine who were struggling. We are truly grateful for the love and dignity they bring to our lives.",
          authorName: "Amina Yakubu",
          authorRole: "Community Beneficiary",
          order: 0,
        },
        {
          quote:
            "Volunteering with AGREDS has been one of the most fulfilling experiences of my life. Whether we are supporting children, assisting in rural clinics, or engaging communities, the impact is real and immediate. You see lives changing every day.",
          authorName: "Samuel Owusu",
          authorRole: "Volunteer",
          order: 1,
        },
        {
          quote:
            "AGREDS is a true extension of the church's mission. Their interventions in health, education, and family support have transformed entire communities. Partnering with them allows us to reach people with both the Gospel and practical compassion.",
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
          title: "AGREDS Commissions New Borehole to Support Rural Families",
          slug: "agreds-commissions-new-borehole",
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
            "AGREDS has launched new literacy centres to support children and adults who lack access to basic education, empowering local communities through learning.",
          image: "/images/blog_2.png",
          badge: "Education",
          badgeColor: "#2EC774",
          isPublished: true,
          publishedAt: new Date("2025-10-02"),
        },
        {
          title: "AGREDS Provides Emergency Relief to Flood-Affected Families",
          slug: "emergency-relief-flood-affected-families",
          excerpt:
            "In response to recent flooding, AGREDS mobilized emergency food supplies, clothing, and temporary shelter to support displaced families.",
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
            "AGREDS' mobile medical outreach has delivered screenings, medicines, and maternal health support to rural areas lacking access to hospitals.",
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
        metaDescription: "AGREDS — Assemblies of God Relief and Development Services, Ghana",
        isPublished: true,
        template: "home",
        sections: {
          create: [
            { type: "HERO", title: "Hero Slider", order: 0 },
            { type: "ABOUT", title: "About AGREDS", order: 1 },
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
        metaDescription: "Learn about AGREDS and our mission to empower communities in Ghana.",
        isPublished: true,
        sections: {
          create: [
            { type: "BANNER", title: "Page Banner", order: 0, content: { heading: "Our Profile", breadcrumb: true } },
            { type: "RICH_TEXT", title: "About Content", order: 1, content: { html: "<p>AGREDS is the relief and development arm of the Assemblies of God Church, Ghana...</p>" } },
          ],
        },
      },
    });

    const aboutGovernance = await prisma.page.create({
      data: {
        slug: "about/governance",
        title: "Governance",
        metaDescription: "AGREDS leadership and governance structure.",
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
      { menuId: footerMenu.id, label: "About AGREDS", pageId: aboutProfile.id, order: 0 },
      { menuId: footerMenu.id, label: "Our Programs", pageId: causesPrograms.id, order: 1 },
      { menuId: footerMenu.id, label: "Volunteer", pageId: getInvolvedVolunteer.id, order: 2 },
      { menuId: footerMenu.id, label: "Donate", pageId: getInvolvedDonate.id, order: 3 },
      { menuId: footerMenu.id, label: "News", pageId: mediaNews.id, order: 4 },
      { menuId: footerMenu.id, label: "Contact Us", pageId: contactsPage.id, order: 5 },
    ]});

    console.log("  ✅ Menus created");
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
