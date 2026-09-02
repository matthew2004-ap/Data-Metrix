"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import type { PublicPost } from "@/lib/posts";

export default function ArticlesClient({ posts }: { posts: PublicPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (value) setCategory(value);
  }, []);

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const searchable = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return matchesCategory && searchable.includes(normalized);
    });
  }, [posts, category, query]);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1">
          <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-4 pl-12 pr-4 outline-none focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                category === item
                  ? "bg-blue-600 text-white"
                  : "border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-10 text-sm text-zinc-500">
        Showing {filtered.length} article{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-5 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {!filtered.length && (
        <div className="mt-10 rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          No articles match your search.
        </div>
      )}
    </>
  );
}
