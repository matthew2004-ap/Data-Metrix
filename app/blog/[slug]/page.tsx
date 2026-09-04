import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPostBySlug } from "@/lib/posts";

export const revalidate = 60;

function renderContent(content: string) {
  return content.split("\n\n").map((block, index) => {
    const text = block.trim();
    if (!text) return null;
    if (text.startsWith("## ")) {
      return <h2 key={index} className="mt-12 text-2xl font-black md:text-3xl">{text.slice(3)}</h2>;
    }
    return <p key={index} className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">{text}</p>;
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"><ArrowLeft size={16} /> Back to articles</Link>
        <div className="mt-10">
          <span className="font-bold text-blue-600">{post.category}</span>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500"><span>{post.date}</span><span>•</span><Clock size={14} /><span>{post.readTime}</span></div>
        </div>
        <div className="mt-10 overflow-hidden rounded-[2rem]"><img src={post.image} alt="" className="h-auto max-h-[520px] w-full object-cover" /></div>
        <article className="mt-12">{renderContent(post.content)}</article>
      </main>
      <Footer />
    </div>
  );
}
