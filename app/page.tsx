import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPublishedPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const latest = featured ? posts.filter((post) => post.slug !== featured.slug).slice(0, 6) : posts.slice(0, 6);
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <main>
        <section className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:pt-32">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">Data • Web • AI</span>
              <h1 className="mt-7 text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">Building, learning and <span className="block text-blue-600">sharing along the way.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">A personal publication where I document what I learn, the products I build, and ideas about data analytics, web development and artificial intelligence.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/articles" className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 font-bold text-white hover:bg-blue-600 dark:bg-white dark:text-zinc-950">Explore articles <ArrowRight size={17} /></Link>
                <Link href="#about" className="rounded-full border border-zinc-300 px-6 py-3 font-bold hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700">About me</Link>
              </div>
            </div>
          </div>
        </section>

        {featured && (
          <section className="mx-auto max-w-7xl px-6 pb-20">
            <div className="mb-7"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Featured</p><h2 className="mt-2 text-3xl font-black">Start here</h2></div>
            <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 md:grid-cols-2">
              <div className="relative min-h-[340px]"><img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-8 md:p-12"><span className="font-bold text-blue-600">{featured.category}</span><h2 className="mt-4 text-3xl font-black leading-tight md:text-4xl">{featured.title}</h2><p className="mt-5 leading-7 text-zinc-600 dark:text-zinc-400">{featured.excerpt}</p><span className="mt-7 font-bold">Read the full story →</span></div>
            </Link>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Latest writing</p><h2 className="mt-2 text-3xl font-black md:text-4xl">Fresh from the notebook</h2></div><Link href="/articles" className="font-bold text-blue-600">View all →</Link></div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{latest.map((post) => <BlogCard key={post.id} post={post} />)}</div>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Topics</p><div className="mt-6 flex flex-wrap gap-3">{categories.map((category) => <Link key={category} href={`/articles?category=${encodeURIComponent(category)}`} className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900">{category}</Link>)}</div></div></section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20"><div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-center"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">About</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Curious about data, technology and building useful things.</h2><p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">I use this blog to document my growth in Computer Science, data analytics, web development and AI. The goal is simple: learn deeply, build useful projects and share the lessons.</p><div className="mt-7 flex gap-3"><a href="https://github.com/matthew2004-ap" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full border border-zinc-300 p-3 hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700"><Github size={19} /></a><a href="https://www.linkedin.com/in/matthew-adewale-002544409" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-zinc-300 p-3 hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700"><Linkedin size={19} /></a></div></div></div></section>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
