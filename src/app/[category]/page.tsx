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
        background: "var(--cream)",
        paddingTop: 140,
        paddingBottom: 80,
        position: "relative",
        overflow: "hidden",
        minHeight: "44vh",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        {/* 배경 블롭 */}
        <div style={{
          position: "absolute", top: "50%", right: "5%",
          transform: "translateY(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2,185,201,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* 대형 아이콘 장식 */}
        <div style={{
          position: "absolute",
          right: "8%", top: "50%", transform: "translateY(-50%)",
          opacity: 0.1,
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
              <p className="t-label" style={{ marginBottom: 20 }}>Category</p>
              <h1 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                color: "var(--ink)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: 20,
              }}>
                {cat.description}
              </h1>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--fs-base)",
                color: "var(--ink-light)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}>
                총 {posts.length}개의 꿀팁
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 포스트 그리드 ── */}
      <section style={{
        background: "var(--white-pure)",
        paddingTop: 80,
        paddingBottom: 120,
      }}>
        <div className="container">
          {posts.length === 0 ? (
            <Reveal variant="fadeIn">
              <div style={{
                textAlign: "center", padding: "100px 0",
              }}>
                <div style={{ marginBottom: 24, opacity: 0.25 }}>
                  {cat.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cat.iconUrl} alt="" width={80} height={80}
                      style={{ objectFit: "contain", display: "inline-block" }} />
                  ) : (
                    <span style={{ fontSize: "4rem" }}>{cat.emoji}</span>
                  )}
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-2xl)", fontWeight: 800, marginBottom: 12, color: "var(--ink-light)" }}>준비 중</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-sm)", color: "var(--ink-light)" }}>아직 등록된 포스팅이 없습니다.</p>
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
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>
    </>
  );
}
