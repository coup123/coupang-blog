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
      {/* ── 히어로 ── */}
      <section style={{
        background: "var(--yellow)",
        paddingTop: 100,
        paddingBottom: 100,
        position: "relative",
        overflow: "hidden",
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        {/* 배경 블롭 */}
        <div style={{
          position: "absolute", top: "50%", right: "5%",
          transform: "translateY(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2,185,201,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* 대형 아이콘 장식 */}
        <div style={{
          position: "absolute",
          right: "8%", top: "50%", transform: "translateY(-50%)",
          opacity: 0.12,
          pointerEvents: "none",
          userSelect: "none",
        }}>
          {cat.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cat.iconUrl} alt="" width={220} height={220}
              style={{ objectFit: "contain", display: "block" }} />
          ) : (
            <span style={{ fontSize: "clamp(120px, 18vw, 220px)", lineHeight: 1 }}>{cat.emoji}</span>
          )}
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal variant="fadeUp">
            <div style={{ maxWidth: 640 }}>
              <p style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: 24,
              }}>
                ✦ Category
              </p>
              <h1 style={{
                fontFamily: "'Nanum Myeongjo', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 800,
                color: "var(--ink)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 20,
              }}>
                {cat.description}
              </h1>
              <p style={{
                fontSize: "var(--fs-sm)",
                color: "var(--ink-light)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                총 {posts.length}개의 꿀팁
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 포스트 그리드 ── */}
      <section style={{
        background: "var(--yellow)",
        paddingTop: 80,
        paddingBottom: 120,
        borderTop: "none",
      }}>
        <div className="container">
          {posts.length === 0 ? (
            <Reveal variant="fadeIn">
              <div style={{
                textAlign: "center", padding: "100px 0",
                color: "rgba(2,185,201,0.4)",
              }}>
                <div style={{ fontSize: "4rem", marginBottom: 24, opacity: 0.3 }}>{cat.emoji}</div>
                <p style={{ fontFamily: "'Nanum Myeongjo', serif", fontSize: "var(--fs-2xl)", fontWeight: 800, marginBottom: 12, color: "var(--ink-light)" }}>준비 중</p>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-light)" }}>아직 등록된 포스팅이 없습니다.</p>
              </div>
            </Reveal>
          ) : (
            <StaggerReveal style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
            }}>
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
