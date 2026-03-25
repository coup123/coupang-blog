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
          background: "var(--bg-black)",
          paddingTop: 80,
          paddingBottom: 80,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 600 }}>
            <div className="section-line-white" />
            <p className="text-section-label-white mb-4">Category</p>

            {cat.iconUrl ? (
              <Image
                src={cat.iconUrl}
                alt={cat.name}
                width={52}
                height={52}
                className="object-contain mb-6"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }}
              />
            ) : (
              <span style={{ fontSize: "3rem", display: "block", marginBottom: 24, opacity: 0.6 }}>
                {cat.emoji}
              </span>
            )}

            <h1 className="text-hero-white mb-4">{cat.description}</h1>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              총 {posts.length}개의 꿀팁
            </p>
          </div>
        </div>
      </section>

      {/* ─── 포스트 그리드 ────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-dark)",
          paddingTop: 60,
          paddingBottom: 100,
        }}
      >
        <div className="container">
          {posts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Nanum Myeongjo', serif",
                  fontSize: "var(--fs-2xl)",
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                준비 중
              </p>
              <p style={{ fontSize: "var(--fs-sm)" }}>아직 등록된 포스팅이 없습니다.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 2,
              }}
            >
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} variant="dark" />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
