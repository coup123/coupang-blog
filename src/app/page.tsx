import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/MotionWrapper";

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 120,
        paddingBottom: 80,
      }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, textAlign: "center" }}>
          {/* 배지 */}
          <Reveal variant="fadeUp">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 20px", borderRadius: 999,
              background: "var(--teal-bg)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em" }}>
                생활 꿀팁 큐레이션
              </span>
            </div>
          </Reveal>

          {/* 헤드라인 */}
          <Reveal variant="fadeUp" delay={0.08}>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(44px, 6vw, var(--fs-hero))",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              maxWidth: 860,
            }}>
              매일 쓰는 살림,<br />
              이렇게 하면 달라집니다.
            </h1>
          </Reveal>

          {/* 서브 */}
          <Reveal variant="fadeUp" delay={0.14}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-md)",
              color: "var(--ink-light)",
              lineHeight: 1.8,
              maxWidth: 520,
              fontWeight: 400,
            }}>
              청소 노하우, 건강 루틴, 요리 레시피까지.<br />
              실생활에서 바로 써먹을 수 있는 검증된 꿀팁.
            </p>
          </Reveal>

          {/* 버튼 */}
          <Reveal variant="fadeUp" delay={0.2}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="/cleaning" className="btn-primary">
                {Object.values(CATEGORIES)[0].iconUrl
                  ? <img src={Object.values(CATEGORIES)[0].iconUrl!} alt="" width={20} height={20} style={{ objectFit: "contain" }} />
                  : null
                }
                청소방법 보기
              </Link>
              <Link href="/health" className="btn-outline">
                전체 꿀팁 보기
              </Link>
            </div>
          </Reveal>

          {/* 통계 */}
          <Reveal variant="fadeUp" delay={0.28}>
            <div style={{
              display: "flex", gap: 60, flexWrap: "wrap", justifyContent: "center",
              marginTop: 48, paddingTop: 40,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              width: "100%", maxWidth: 640,
            }}>
              {[
                { num: posts.length + "+", label: "검증된 꿀팁" },
                { num: "3", label: "생활 카테고리" },
                { num: "100%", label: "직접 써본 정보" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 800, color: "var(--ink)" }}>
                    {s.num}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 700, color: "var(--ink-light)", marginTop: 6, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <div className="stats-bar">
        <div className="container" style={{ display: "flex", alignItems: "center" }}>
          {[
            { num: "9+", label: "검증된 꿀팁" },
            { num: "3", label: "생활 카테고리" },
            { num: "100%", label: "직접 써본 정보" },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: 1, textAlign: "center", position: "relative" }}>
              {i > 0 && (
                <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 1, height: 40, background: "#333333" }} />
              )}
              <div className="stats-num">{s.num}</div>
              <div className="stats-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--white-pure)", paddingTop: 100, paddingBottom: 100 }}>
        <div className="container">
          <Reveal variant="fadeUp">
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              marginBottom: 64, flexWrap: "wrap", gap: 20,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p className="t-label">Categories</p>
                <h2 className="t-heading">카테고리</h2>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-base)", color: "var(--ink-light)", maxWidth: 280, lineHeight: 1.8, textAlign: "right" }}>
                청소·건강·요리 3가지 카테고리로<br />생활의 질을 높여드립니다
              </p>
            </div>
          </Reveal>

          <StaggerReveal style={{ display: "flex", gap: 3 }}>
            {Object.values(CATEGORIES).map((cat, idx) => {
              const count = posts.filter((p) => p.category === cat.slug).length;
              return (
                <StaggerItem key={cat.slug}>
                  <CategoryTile cat={cat} count={count} dark={idx === 1} />
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LATEST POSTS
      ══════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section style={{ background: "var(--cream)", paddingTop: 100, paddingBottom: 100 }}>
          <div className="container">
            <Reveal variant="fadeUp">
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                marginBottom: 64, flexWrap: "wrap", gap: 20,
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p className="t-label">Latest Posts</p>
                  <h2 className="t-heading">최신 꿀팁</h2>
                </div>
                <Link href="/cleaning" className="btn-ghost">전체보기 →</Link>
              </div>
            </Reveal>

            <StaggerReveal style={{ display: "flex", gap: 3 }}>
              {latestPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          PER-CATEGORY SECTIONS
      ══════════════════════════════════════ */}
      {Object.values(CATEGORIES).map((cat, idx) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 3);
        if (catPosts.length === 0) return null;
        const isLight = idx % 2 === 0;

        return (
          <section
            key={cat.slug}
            style={{
              background: isLight ? "var(--white-pure)" : "var(--cream)",
              paddingTop: 100,
              paddingBottom: 100,
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="container">
              <Reveal variant="fadeUp">
                <div style={{
                  display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                  marginBottom: 64, flexWrap: "wrap", gap: 20,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <p className="t-label">{cat.name}</p>
                    <h2 className="t-heading">{cat.description}</h2>
                  </div>
                  <Link href={`/${cat.slug}`} className="link-arrow">전체보기 →</Link>
                </div>
              </Reveal>

              <StaggerReveal style={{ display: "flex", gap: 3 }}>
                {catPosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <PostCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        );
      })}

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section style={{
        background: "var(--dark2)",
        paddingTop: 120,
        paddingBottom: 120,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* 배경 글로우 */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2,185,201,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal variant="fadeUp">
            <p className="t-label" style={{ color: "var(--teal)", marginBottom: 28 }}>
              생활 꿀팁 블로그
            </p>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: 24,
            }}>
              더 나은 일상을<br />
              지금 시작하세요.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-md)", color: "#666666", fontWeight: 300, marginBottom: 48 }}>
              매주 새로운 꿀팁을 만나보세요
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {Object.values(CATEGORIES).map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "16px 36px", borderRadius: 8,
                    background: i === 0 ? "var(--teal)" : "#242424",
                    color: i === 0 ? "#ffffff" : "#aaaaaa",
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--fs-base)",
                    fontWeight: i === 0 ? 700 : 600,
                    border: i === 0 ? "none" : "1px solid #444444",
                    transition: "opacity 0.2s",
                  }}
                >
                  {cat.iconUrl
                    ? <img src={cat.iconUrl} alt="" width={20} height={20} style={{ objectFit: "contain" }} />
                    : null
                  }
                  {cat.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {posts.length === 0 && (
        <section style={{ padding: "120px 24px", textAlign: "center", background: "var(--cream)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--fs-3xl)", fontWeight: 800, color: "var(--ink)", marginBottom: 12 }}>준비 중</p>
          <p style={{ color: "var(--ink-light)", fontSize: "var(--fs-sm)" }}>아직 등록된 포스팅이 없습니다.</p>
        </section>
      )}
    </>
  );
}
