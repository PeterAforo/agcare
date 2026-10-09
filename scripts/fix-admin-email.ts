import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const u = await prisma.user.updateMany({
    where: { email: "admin@agredsghana.org" },
    data: { email: "admin@agcareghana.org" },
  });
  console.log(`Updated ${u.count} admin user email(s) -> admin@agcareghana.org`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
