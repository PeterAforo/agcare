import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const existing = await prisma.paymentGateway.findFirst();
  if (existing) {
    console.log("Gateway already exists:", existing.name, existing.provider, "active:", existing.isActive);
    return;
  }
  const g = await prisma.paymentGateway.create({
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
  console.log("Created placeholder gateway:", g.id);
}

main().finally(() => prisma.$disconnect());
