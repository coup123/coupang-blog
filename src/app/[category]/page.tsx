import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import { CATEGORIES } from "@/lib/constants";
import PostCard from "@/components/PostCard";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/MotionWrapper";

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
      {/* 히어로 */}
      <section
        style={{
          background: "linear-gradient(160deg, #02b9c9 0%, #019aab 60%, #017585 100%)",
          paddingTop: 80,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 블롭 */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container">
          <Reveal variant="fadeUp">
            <div style={{ maxWidth: 600 }}>
              <div className="section-line-white" />
              <p className="text-section-label-white mb-4">Category</p>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: 24, opacity: 0.5 }}>
                {cat.emoji}
              </span>
              <h1
                style={{
                  fontFamily: "'Nanum Myeongjo', serif",
                  fontSize: "clamp(32px, 4.5vw, 52px)",
                  fontWeight: 800, color: "var(--text-white)",
                  letterSpacing: "-0.02em", lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                {cat.description}
              </h1>
              <p style={{
                fontSize: "var(--fs-sm)", fontWeight: 700,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
              }}>
                총 {posts.length}개의 꿀팁
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 그리드 */}
      <section style={{ background: "linear-gradient(180deg, #ffffff 0%, #fff9c9 100%)", paddingTop: 60, paddingBottom: 100 }}>
        <div className="container">
          {posts.length === 0 ? (
            <Reveal variant="fadeIn">
              <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(2,185,201,0.5)" }}>
                <p style={{ fontFamily: "'Nanum Myeongjo', serif", fontSize: "var(--fs-2xl)", fontWeight: 800, marginBottom: 12 }}>준비 중</p>
                <p style={{ fontSize: "var(--fs-sm)" }}>아직 등록된 포스팅이 없습니다.</p>
              </div>
            </Reveal>
          ) : (
            <StaggerReveal
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 2,
              }}
            >
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <PostCard post={post} variant="light" />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>
    </>
  );
}
