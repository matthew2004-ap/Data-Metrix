import { prisma } from "@/lib/prisma";
import { deleteSubscriber } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Audience
        </p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">Subscribers</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Manage the people who subscribed to your publication.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="flex flex-col justify-between gap-3 px-6 py-5 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-bold">{subscriber.email}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Joined {subscriber.createdAt.toLocaleDateString("en-US")}
                </p>
              </div>
              <form action={deleteSubscriber}>
                <input type="hidden" name="id" value={subscriber.id} />
                <button className="text-sm font-bold text-red-600 hover:underline">
                  Remove
                </button>
              </form>
            </div>
          ))}

          {!subscribers.length && (
            <div className="p-12 text-center text-sm text-zinc-500">
              No subscribers yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
