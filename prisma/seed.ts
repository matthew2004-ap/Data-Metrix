import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { posts } from "../data/posts";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing. Copy .env.example to .env and add your PostgreSQL connection string.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminName = process.env.ADMIN_NAME || "Adewale Matthew";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: adminName, role: "ADMIN" },
    create: { email: adminEmail, name: adminName, role: "ADMIN" },
  });

  const categoryNames = [...new Set(posts.map((post) => post.category))];
  const categoryMap = new Map<string, string>();

  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: { name },
      create: { name, slug: slugify(name) },
    });
    categoryMap.set(name, category.id);
  }

  for (const post of posts) {
    const categoryId = categoryMap.get(post.category);
    if (!categoryId) throw new Error(`Category not found for ${post.slug}`);

    const content = Array.isArray(post.content)
      ? post.content.join("\n\n")
      : post.content;

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content,
        image: post.image,
        published: true,
        featured: Boolean(post.featured),
        readTime: post.readTime,
        publishedAt: new Date(post.date),
        authorId: admin.id,
        categoryId,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content,
        image: post.image,
        published: true,
        featured: Boolean(post.featured),
        readTime: post.readTime,
        publishedAt: new Date(post.date),
        authorId: admin.id,
        categoryId,
      },
    });
  }

  console.log(`Seed complete: ${posts.length} posts, ${categoryNames.length} categories, 1 admin user.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
