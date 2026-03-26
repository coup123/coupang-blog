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
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category as CategoryKey];
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* 카테고리 헤더 */}
      <section
        className="rounded-2xl px-8 py-8 mb-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${cat.color.bg}, #fff8f0)`,
          border: `2px solid ${cat.color.border}`,
        }}
      >
        <div className="text-4xl mb-2">{cat.emoji}</div>
        <h1 className="text-2xl font-extrabold" style={{ color: cat.color.text }}>{cat.name}</h1>
        <p className="text-sm mt-1" style={{ color: "#9e7c68" }}>{cat.description}</p>
      </section>

      {/* 4열 그리드 */}
      {posts.length === 0 ? (
        <div className="rounded-2xl py-16 text-center" style={{ background: "#fff8f0", border: "2px dashed #ffd4b2" }}>
          <p className="text-4xl mb-3">🌱</p>
          <p style={{ color: "#b89a80" }}>아직 등록된 포스팅이 없어요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
