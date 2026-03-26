import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { CATEGORIES, COUPANG_DISCLAIMER } from "@/lib/constants";
import type { CategoryKey } from "@/lib/constants";
import { MDXRemote } from "@/components/mdx/MDXRemote";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) notFound();

  const cat = CATEGORIES[post.meta.category as CategoryKey];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{cat?.emoji} {cat?.name}</span>
          <span className="text-gray-300">·</span>
          <time>{post.meta.date}</time>
          <span className="text-gray-300">·</span>
          <span>{post.meta.readingTime}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          {post.meta.title}
        </h1>
        <p className="mt-3 text-gray-500">{post.meta.description}</p>
      </header>

      <div className="prose prose-gray prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-orange-600">
        <MDXRemote source={post.content} />
      </div>

      <footer className="mt-12 border-t border-gray-100 pt-6">
        <p className="text-xs text-gray-400 text-center">
          {COUPANG_DISCLAIMER}
        </p>
      </footer>
    </article>
  );
}
