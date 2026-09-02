import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  FileText,
  FolderOpen,
  MessageSquare,
  Mail,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [posts, categories, comments, subscribers, recentPosts] =
    await Promise.all([
      prisma.post.count(),
      prisma.category.count(),
      prisma.comment.count(),
      prisma.subscriber.count(),
      prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
    ]);

  const stats = [
    { label: "Total posts", value: posts, icon: FileText },
    { label: "Categories", value: categories, icon: FolderOpen },
    { label: "Comments", value: comments, icon: MessageSquare },
    { label: "Subscribers", value: subscribers, icon: Mail },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">
            Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-500">
            Manage your publication and keep your content moving.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New article
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <Icon size={20} />
                </div>
                <span className="text-3xl font-black">{stat.value}</span>
              </div>
              <p className="mt-5 text-sm font-bold text-zinc-500">{stat.label}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <div>
              <h2 className="font-black">Recent articles</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Your latest content activity.
              </p>
            </div>
            <Link
              href="/admin/posts"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}/edit`}
                className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold">{post.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {post.category.name} ·{" "}
                    {post.createdAt.toLocaleDateString("en-US")}
                  </p>
                </div>
                <span
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    post.published
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {post.published ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <Clock3 size={13} />
                  )}
                  {post.published ? "Published" : "Draft"}
                </span>
              </Link>
            ))}
            {!recentPosts.length && (
              <div className="p-10 text-center text-sm text-zinc-500">
                No articles yet.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-zinc-950 p-6 text-white">
          <p className="text-sm font-bold text-blue-400">Quick actions</p>
          <h2 className="mt-2 text-2xl font-black">Keep publishing.</h2>
          <div className="mt-8 space-y-2">
            <Link
              href="/admin/posts/new"
              className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15"
            >
              Write an article <ArrowRight size={16} />
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15"
            >
              Manage categories <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/15"
            >
              View public site <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
