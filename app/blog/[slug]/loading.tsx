export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="animate-pulse">

          <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />

          <div className="mt-10 h-12 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800 md:h-16" />

          <div className="mt-6 h-6 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />

          <div className="mt-8 h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />

          <div className="mt-10 h-[300px] w-full rounded-[2rem] bg-zinc-200 dark:bg-zinc-800 md:h-[520px]" />

          <div className="mt-12 space-y-4">
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

        </div>
      </main>
    </div>
  );
}