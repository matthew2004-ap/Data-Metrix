export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-56 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-3xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
