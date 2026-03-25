import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";
import PostCard from "@/components/PostCard";
import Image from "next/image";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) return {};
  return { title: `${cat.name} | 생활꿀팁`, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      {/* 카테고리 헤더 */}
      <section
        className="rounded-2xl px-8 py-9 mb-10 flex items-center gap-6"
        style={{
          background: "linear-gradient(135deg, #e8f7f1 0%, #f5fdf9 100%)",
          border: "1px solid #c8eedd",
        }}
      >
        <div
          className="flex items-center justify-center rounded-2xl"
          style={{ width: 64, height: 64, background: "rgba(255,255,255,0.8)", border: "1px solid #d4f0e4" }}
        >
          {cat.iconUrl ? (
            <Image src={cat.iconUrl} alt={cat.name} width={36} height={36} className="object-contain" />
          ) : (
            <span style={{ fontSize: "2rem" }}>{cat.emoji}</span>
          )}
        </div>
        <div>
          <h1 className="font-extrabold" style={{ fontSize: "1.5rem", color: "#111", letterSpacing: "-0.02em" }}>
            {cat.name}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>{cat.description}</p>
          <p className="mt-1 text-xs font-semibold" style={{ color: "#15A775" }}>
            총 {posts.length}개의 포스팅
          </p>
        </div>
      </section>

      {/* 4열 그리드 */}
      {posts.length === 0 ? (
        <div
          className="py-24 text-center rounded-2xl"
          style={{ background: "#f9f9f9", border: "1px dashed #ddd" }}
        >
          <p className="text-4xl mb-3">🌱</p>
          <p style={{ color: "#aaa", fontSize: "0.9rem" }}>아직 등록된 포스팅이 없어요.</p>
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
