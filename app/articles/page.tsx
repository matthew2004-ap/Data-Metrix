import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticlesClient from "@/components/ArticlesClient";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Articles() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Library</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">All articles</h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">Explore essays, tutorials and reflections across data, web development, AI and Computer Science.</p>
        </div>
        <ArticlesClient posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
