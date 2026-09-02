import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPost } from "@/app/admin/actions";
import PostForm from "@/components/admin/PostForm";
import { ArrowLeft } from "lucide-react";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} /> Back to posts
        </Link>
        <h1 className="mt-5 text-3xl font-black md:text-4xl">New article</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Create an article and publish it directly to the website.
        </p>
      </div>

      {categories.length ? (
        <PostForm action={createPost} categories={categories} />
      ) : (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          Create a category first before creating an article.
        </div>
      )}
    </div>
  );
}
