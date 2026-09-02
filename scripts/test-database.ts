import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing. Copy .env.example to .env and add your PostgreSQL connection string.");
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.$queryRaw`SELECT 1`;
    const [users, posts, categories] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.category.count(),
    ]);

    console.log("Database connection: OK");
    console.log(`Users: ${users}`);
    console.log(`Posts: ${posts}`);
    console.log(`Categories: ${categories}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Database test failed:");
  console.error(error);
  process.exit(1);
});
