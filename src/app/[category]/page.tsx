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
  return {
    title: `${cat.name} | ${process.env.NEXT_PUBLIC_SITE_NAME || "생활꿀팁"}`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      {/* ─── 카테고리 히어로 ──────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg, #fbfbfd 0%, #f5f5f7 100%)",
          paddingTop: 80,
          paddingBottom: 80,
          textAlign: "center",
          borderBottom: "1px solid rgba(210,210,215,0.4)",
        }}
      >
        <div className="container">
          {cat.iconUrl ? (
            <Image
              src={cat.iconUrl}
              alt={cat.name}
              width={64}
              height={64}
              className="object-contain mx-auto mb-6"
            />
          ) : (
            <span style={{ fontSize: "3.5rem", display: "block", marginBottom: 24 }}>
              {cat.emoji}
            </span>
          )}
          <p className="text-eyebrow mb-3">{cat.name}</p>
          <h1
            className="text-section-head mx-auto mb-4"
            style={{ maxWidth: 640 }}
          >
            {cat.description}
          </h1>
          <p style={{ color: "var(--apple-text-ter)", fontSize: "var(--fs-sm)" }}>
            총 {posts.length}개의 꿀팁
          </p>
        </div>
      </section>

      {/* ─── 포스트 그리드 ────────────────────────────── */}
      <section style={{ paddingTop: 60, paddingBottom: 100 }}>
        <div className="container">
          {posts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--apple-text-ter)",
              }}
            >
              <p style={{ fontSize: "3rem", marginBottom: 16 }}>🌱</p>
              <p style={{ fontSize: "var(--fs-label)" }}>
                아직 등록된 포스팅이 없습니다.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
