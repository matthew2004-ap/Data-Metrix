import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/data/posts";

export default function BlogCard({ post }: { post: BlogPost }) {
   return (
      <article className="site-surface group overflow-hidden rounded-3xl border border-zinc-200 transition hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800">
         <Link href={`/blog/${post.slug}`}>
            <div className="relative h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
               <img
                  src={post.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
               />
               <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-900">
                  {post.category}
               </span>
            </div>
            <div className="p-6">
               <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <Clock size={13} />
                  <span>{post.readTime}</span>
               </div>
               <h3 className="text-xl font-bold leading-tight">{post.title}</h3>
               <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
               </p>
               <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                  Read article <ArrowUpRight size={16} />
               </div>
            </div>
         </Link>
      </article>
   );
}

