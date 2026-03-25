import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import CategoryTile from "@/components/CategoryTile";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-cream)",
          paddingTop: 80,
          paddingBottom: 100,
          borderBottom: "1px solid var(--border-cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 텍스트 */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: -60,
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: "clamp(120px, 18vw, 240px)",
            fontWeight: 800,
            color: "rgba(180,140,60,0.06)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.05em",
          }}
        >
          TIPS
        </div>

        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 680 }}>
            <div className="section-line" />
            <p className="text-section-label mb-4">{SITE_CONFIG.name}</p>
            <h1 className="text-hero mb-6">
              매일의 살림,<br />
              <span style={{ color: "var(--text-med)", fontWeight: 400 }}>더 현명하게.</span>
            </h1>
            <p
              className="text-body mb-10"
              style={{ maxWidth: 480, fontSize: "var(--fs-md)" }}
            >
              청소부터 건강 루틴, 요리 레시피까지.<br />
              실생활에 바로 쓰이는 꿀팁을 모았습니다.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              {Object.values(CATEGORIES).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="btn-outline-dark"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 카테고리 타일 ─────────────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-black)",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="section-line-white" />
              <p className="text-section-label-white mb-3">Categories</p>
              <h2 className="text-section-head-white">카테고리</h2>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 2,
            }}
          >
            {Object.values(CATEGORIES).map((cat) => {
              const catPosts = posts.filter((p) => p.category === cat.slug);
              return (
                <CategoryTile key={cat.slug} cat={cat} count={catPosts.length} />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 최신 꿀팁 (어두운 배경) ──────────────────────────── */}
      {latestPosts.length > 0 && (
        <section
          style={{
            background: "var(--bg-dark)",
            paddingTop: 80,
            paddingBottom: 80,
          }}
        >
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="section-line-white" />
                <p className="text-section-label-white mb-3">Latest</p>
                <h2 className="text-section-head-white">최신 꿀팁</h2>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 2,
              }}
            >
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} variant="dark" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 카테고리별 섹션 ────────────────────────────────────── */}
      {Object.values(CATEGORIES).map((cat, idx) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 3);
        if (catPosts.length === 0) return null;
        const isDark = idx % 2 === 0;
        return (
          <section
            key={cat.slug}
            style={{
              background: isDark ? "var(--bg-black)" : "var(--bg-cream)",
              paddingTop: 80,
              paddingBottom: 80,
              borderTop: isDark ? "none" : "1px solid var(--border-cream)",
            }}
          >
            <div className="container">
              <div className="flex items-end justify-between mb-12">
                <div>
                  {isDark ? (
                    <>
                      <div className="section-line-white" />
                      <p className="text-section-label-white mb-3">{cat.name}</p>
                      <h2 className="text-section-head-white">{cat.description}</h2>
                    </>
                  ) : (
                    <>
                      <div className="section-line" />
                      <p className="text-section-label mb-3">{cat.name}</p>
                      <h2 className="text-section-head">{cat.description}</h2>
                    </>
                  )}
                </div>
                <Link
                  href={`/${cat.slug}`}
                  className={isDark ? "link-white" : "link-dark"}
                >
                  전체보기
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 2,
                }}
              >
                {catPosts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    variant={isDark ? "dark" : "light"}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {posts.length === 0 && (
        <section
          style={{
            background: "var(--bg-cream)",
            padding: "120px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "var(--fs-3xl)",
              fontWeight: 800,
              color: "var(--text-dark)",
              marginBottom: 12,
            }}
          >
            준비 중
          </p>
          <p style={{ color: "var(--text-light)", fontSize: "var(--fs-sm)" }}>
            아직 등록된 포스팅이 없습니다.
          </p>
        </section>
      )}
    </>
  );
}
