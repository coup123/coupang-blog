import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";
import type { CategoryKey } from "@/lib/constants";
import PostCard from "@/components/PostCard";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.name} 관련 꿀팁과 추천 제품 정보`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900">
        {cat.emoji} {cat.name}
      </h1>
      <div className="mt-6 grid gap-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            아직 등록된 포스팅이 없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
