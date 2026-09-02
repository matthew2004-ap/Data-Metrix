import { prisma } from "@/lib/prisma";
import { approveComment, deleteComment } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function CommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, email: true } },
      post: { select: { title: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Community
        </p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Comments</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Review and moderate comments before they appear publicly.
        </p>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <p className="text-sm font-black">
                  {comment.author.name || comment.author.email}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  On: {comment.post.title} ·{" "}
                  {comment.createdAt.toLocaleDateString("en-US")}
                </p>
              </div>
              <span
                className={`h-fit rounded-full px-3 py-1 text-xs font-bold ${
                  comment.approved
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {comment.approved ? "Approved" : "Pending"}
              </span>
            </div>

            <p className="mt-5 leading-7 text-zinc-600 dark:text-zinc-300">
              {comment.content}
            </p>

            <div className="mt-5 flex gap-2">
              {!comment.approved && (
                <form action={approveComment}>
                  <input type="hidden" name="id" value={comment.id} />
                  <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
                    Approve
                  </button>
                </form>
              )}
              <form action={deleteComment}>
                <input type="hidden" name="id" value={comment.id} />
                <button className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {!comments.length && (
          <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700">
            No comments yet.
          </div>
        )}
      </div>
    </div>
  );
}
