import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePost } from "@/app/admin/actions";
import PostForm from "@/components/admin/PostForm";
import { ArrowLeft } from "lucide-react";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        image: true,
        readTime: true,
        categoryId: true,
        published: true,
        featured: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back to posts
        </Link>
        <h1 className="mt-5 text-3xl font-black md:text-4xl">Edit article</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Update the article and its publication settings.
        </p>
      </div>

      <PostForm action={updatePost} categories={categories} post={post} />
    </div>
  );
}
