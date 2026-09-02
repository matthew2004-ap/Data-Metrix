import { prisma } from "@/lib/prisma";

export type PublicPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: string;
};

function mapPost(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  featured: boolean;
  readTime: string | null;
  publishedAt: Date | null;
  category: { name: string };
}): PublicPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category.name,
    date: post.publishedAt
      ? post.publishedAt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unpublished",
    readTime: post.readTime ?? "5 min read",
    image: post.image ?? "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    featured: post.featured,
    content: post.content,
  };
}

const postSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  content: true,
  image: true,
  featured: true,
  readTime: true,
  publishedAt: true,
  category: { select: { name: true } },
} as const;

export async function getPublishedPosts(): Promise<PublicPost[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: postSelect,
  });

  return posts.map(mapPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<PublicPost | null> {
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
    select: postSelect,
  });

  return post ? mapPost(post) : null;
}
