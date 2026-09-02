import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import DeletePostButton from "@/components/admin/DeletePostButton";
import { deletePost } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      featured: true,
      createdAt: true,
      category: { select: { name: true } },
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Content
          </p>
          <h1 className="mt-2 text-3xl font-black md:text-4xl">Posts</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Create, edit, publish and remove articles.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
        >
          <Plus size={18} /> New post
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="hidden grid-cols-[1fr_150px_120px_180px] gap-4 border-b border-zinc-200 px-6 py-4 text-xs font-black uppercase tracking-wider text-zinc-400 md:grid dark:border-zinc-800">
          <span>Article</span>
          <span>Category</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {posts.map((post) => (
            <div
              key={post.id}
              className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_150px_120px_180px] md:items-center md:px-6"
            >
              <div className="min-w-0">
                <p className="truncate font-bold">{post.title}</p>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  /blog/{post.slug} · {post.createdAt.toLocaleDateString("en-US")}
                </p>
              </div>

              <span className="text-sm text-zinc-500">{post.category.name}</span>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                  post.published
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {post.published ? "Published" : "Draft"}
                {post.featured ? " · Featured" : ""}
              </span>

              <div className="flex justify-start gap-1 md:justify-end">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Pencil size={16} /> Edit
                </Link>
                <DeletePostButton action={deletePost} id={post.id} />
              </div>
            </div>
          ))}

          {!posts.length && (
            <div className="p-12 text-center text-sm text-zinc-500">
              No posts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
