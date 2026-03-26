import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/MotionWrapper";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section
        className="grad-hero"
        style={{
          paddingTop: 120,
          paddingBottom: 120,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 블롭 */}
        <div className="hero-blob" style={{ width: 500, height: 500, background: "rgba(201,168,92,0.18)", top: -100, right: -100 }} />
        <div className="hero-blob" style={{ width: 350, height: 350, background: "rgba(61,107,53,0.08)", bottom: -60, left: "30%" }} />
        <div className="hero-blob animate-float" style={{ width: 200, height: 200, background: "rgba(249,200,100,0.12)", top: "40%", right: "20%", animationDelay: "1s" }} />

        <div className="container" style={{ position: "relative" }}>
          <Reveal variant="fadeUp">
            <div style={{ maxWidth: 680 }}>
              <div className="section-line" />
              <p className="text-section-label mb-4">{SITE_CONFIG.name}</p>
              <h1 style={{ marginBottom: 24 }}>
                <span className="text-hero" style={{ display: "block" }}>매일의 살림,</span>
                <span className="text-gold-gradient" style={{
                  fontFamily: "'Nanum Myeongjo', serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 800,
                  display: "block",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}>더 현명하게.</span>
              </h1>
              <p className="text-body mb-10" style={{ maxWidth: 460, fontSize: "var(--fs-md)" }}>
                청소부터 건강 루틴, 요리 레시피까지.<br />
                실생활에 바로 쓰이는 꿀팁을 모았습니다.
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.values(CATEGORIES).map((cat) => (
                  <Link key={cat.slug} href={`/${cat.slug}`} className="btn-outline-dark">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 통계 */}
          <Reveal variant="fadeUp" delay={0.2}>
            <div
              className="flex flex-wrap gap-12 mt-16 pt-10"
              style={{ borderTop: "1px solid rgba(180,140,60,0.2)" }}
            >
              {[
                { num: "9+", label: "큐레이션 꿀팁" },
                { num: "3", label: "생활 카테고리" },
                { num: "100%", label: "직접 검증한 정보" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-gold-gradient" style={{
                    fontFamily: "'Nanum Myeongjo', serif",
                    fontSize: 44, fontWeight: 800, lineHeight: 1,
                  }}>{s.num}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-light)", marginTop: 6, fontWeight: 700, letterSpacing: "0.06em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 카테고리 타일 ──────────────────────────────────── */}
      <section className="grad-dark" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container">
          <Reveal variant="fadeUp">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="section-line-white" />
                <p className="text-section-label-white mb-3">Categories</p>
                <h2 className="text-section-head-white">카테고리</h2>
              </div>
            </div>
          </Reveal>
          <StaggerReveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 2,
            }}
          >
            {Object.values(CATEGORIES).map((cat) => {
              const catPosts = posts.filter((p) => p.category === cat.slug);
              return (
                <StaggerItem key={cat.slug}>
                  <CategoryTile cat={cat} count={catPosts.length} />
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── 최신 꿀팁 ─────────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section
          style={{
            background: "linear-gradient(180deg, #1a1a1a 0%, #111111 100%)",
            paddingTop: 80,
            paddingBottom: 80,
          }}
        >
          <div className="container">
            <Reveal variant="fadeUp">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="section-line-white" />
                  <p className="text-section-label-white mb-3">Latest</p>
                  <h2 className="text-section-head-white">최신 꿀팁</h2>
                </div>
              </div>
            </Reveal>
            <StaggerReveal
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 2,
              }}
            >
              {latestPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <PostCard post={post} variant="dark" />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* ─── 카테고리별 섹션 ────────────────────────────────── */}
      {Object.values(CATEGORIES).map((cat, idx) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 3);
        if (catPosts.length === 0) return null;
        const isDark = idx % 2 === 0;
        return (
          <section
            key={cat.slug}
            style={{
              background: isDark
                ? "linear-gradient(160deg, #1e2e1a 0%, #111111 100%)"
                : "linear-gradient(160deg, #fdf6e8 0%, #f4e8cd 100%)",
              paddingTop: 80,
              paddingBottom: 80,
              borderTop: isDark ? "none" : "1px solid rgba(180,140,60,0.15)",
            }}
          >
            <div className="container">
              <Reveal variant="fadeUp">
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
                  <Link href={`/${cat.slug}`} className={isDark ? "link-white" : "link-dark"}>
                    전체보기
                  </Link>
                </div>
              </Reveal>
              <StaggerReveal
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 2,
                }}
              >
                {catPosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <PostCard post={post} variant={isDark ? "dark" : "light"} />
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        );
      })}

      {/* ─── 구분 그라데이션 ────────────────────────────────── */}
      <div style={{ height: 2 }}>
        <hr className="grad-divider" />
      </div>

      {posts.length === 0 && (
        <section className="grad-hero" style={{ padding: "120px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Nanum Myeongjo', serif", fontSize: "var(--fs-3xl)", fontWeight: 800, color: "var(--text-dark)", marginBottom: 12 }}>
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
