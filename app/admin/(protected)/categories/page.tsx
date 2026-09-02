import { prisma } from "@/lib/prisma";
import { createCategory, deleteCategory } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Organization
        </p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Categories</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Organize your articles into clear topics.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <form action={createCategory} className="flex flex-col gap-3 sm:flex-row">
          <input
            name="name"
            required
            placeholder="e.g. Data Analytics"
            className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <button className="rounded-2xl bg-blue-600 px-5 py-3.5 font-bold text-white hover:bg-blue-700">
            Add category
          </button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-black">{category.name}</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  /{category.slug} · {category._count.posts} posts
                </p>
              </div>
              {category._count.posts === 0 && (
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={category.id} />
                  <button className="text-xs font-bold text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
