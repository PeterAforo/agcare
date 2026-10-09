import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const hits: string[] = [];
  const scan = async (name: string, rows: Record<string, unknown>[]) => {
    for (const r of rows) {
      if (/agreds/i.test(JSON.stringify(r)))
        hits.push(`${name}:${(r.id as string) || ""}`);
    }
  };
  await scan("settings", await prisma.siteSettings.findMany());
  await scan("hero", await prisma.heroSlide.findMany());
  await scan("cause", await prisma.cause.findMany());
  await scan("project", await prisma.project.findMany());
  await scan("testimonial", await prisma.testimonial.findMany());
  await scan("blog", await prisma.blogPost.findMany());
  await scan("page", await prisma.page.findMany());
  await scan("section", await prisma.section.findMany());
  await scan("menuItem", await prisma.menuItem.findMany());
  await scan("menu", await prisma.menu.findMany());
  await scan("event", await prisma.event.findMany());
  console.log(hits.length ? hits : "CLEAN - no AGREDS anywhere");

  const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  console.log("Admin login email:", admin?.email, "| name:", admin?.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
