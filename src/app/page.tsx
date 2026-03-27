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
      {/* ════════════════════════════════════════════════
          HERO — 풀스크린, 에디토리얼 타이포
      ════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          background: "var(--yellow)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        {/* 배경 장식 */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "55%", height: "100%",
          background: "linear-gradient(135deg, rgba(2,185,201,0.06) 0%, rgba(2,185,201,0.02) 100%)",
          clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }} />
        <div className="hero-blob animate-float" style={{
          width: 400, height: 400,
          background: "rgba(2,185,201,0.08)",
          top: "10%", right: "10%", opacity: 1,
        }} />
        <div className="hero-blob" style={{
          width: 250, height: 250,
          background: "rgba(2,185,201,0.05)",
          bottom: "15%", left: "5%", opacity: 1,
        }} />

        {/* 대형 장식 텍스트 */}
        <div className="deco-number" style={{ top: -20, right: -20 }}>生</div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 800 }}>
            <Reveal variant="fadeUp">
              <p className="t-label" style={{ marginBottom: 28 }}>
                ✦ {SITE_CONFIG.name} — 생활 꿀팁 큐레이션
              </p>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.08}>
              <h1 style={{ marginBottom: 32 }}>
                <span
                  className="t-display"
                  style={{ display: "block", marginBottom: 8 }}
                >
                  매일 쓰는 살림,
                </span>
                <span
                  className="t-display"
                  style={{
                    display: "block",
                    color: "var(--teal)",
                    WebkitTextStroke: "0px",
                  }}
                >
                  이렇게 하면 달라집니다.
                </span>
              </h1>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.16}>
              <p style={{
                fontSize: "var(--fs-md)",
                color: "var(--ink-mid)",
                lineHeight: 1.8,
                maxWidth: 480,
                marginBottom: 48,
                fontWeight: 300,
              }}>
                청소 노하우, 건강 루틴, 요리 레시피까지.<br />
                실생활에서 바로 써먹을 수 있는 검증된 꿀팁.
              </p>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.22}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                {Object.values(CATEGORIES).map((cat, i) => (
                  <Link key={cat.slug} href={`/${cat.slug}`}
                    className={i === 0 ? "btn-primary" : "btn-outline"}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    {cat.iconUrl
                      ? <img src={cat.iconUrl} alt="" width={20} height={20} style={{ objectFit: "contain" }} />
                      : cat.emoji
                    }
                    {cat.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* 통계 바 */}
          <Reveal variant="fadeUp" delay={0.3}>
            <div style={{
              marginTop: 80,
              paddingTop: 40,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              gap: 60,
              flexWrap: "wrap",
            }}>
              {[
                { num: "9+", label: "검증된 꿀팁" },
                { num: "3", label: "생활 카테고리" },
                { num: "100%", label: "직접 써본 정보" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat-number">{s.num}</div>
                  <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-light)", marginTop: 6, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 스크롤 힌트 */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0.4,
        }}>
          <span style={{ fontSize: "var(--fs-xs)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "var(--ink)", animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          카테고리 — 와이드 레이아웃
      ════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--white)",
        paddingTop: 100,
        paddingBottom: 100,
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div className="container">
          <Reveal variant="fadeUp">
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              marginBottom: 60, flexWrap: "wrap", gap: 20,
            }}>
              <div>
                <p className="t-label" style={{ marginBottom: 16 }}>Categories</p>
                <h2 className="t-heading">카테고리</h2>
              </div>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-light)", maxWidth: 260, lineHeight: 1.7 }}>
                청소·건강·요리 3가지 카테고리로<br />생활의 질을 높여드립니다
              </p>
            </div>
          </Reveal>

          <StaggerReveal style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}>
            {Object.values(CATEGORIES).map((cat) => {
              const count = posts.filter((p) => p.category === cat.slug).length;
              return (
                <StaggerItem key={cat.slug}>
                  <CategoryTile cat={cat} count={count} />
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          최신 꿀팁 — 옐로우 섹션
      ════════════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section style={{
          background: "var(--yellow)",
          paddingTop: 100,
          paddingBottom: 100,
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(0,0,0,0.06)",
        }}>
          {/* 배경 장식 */}
          <div className="deco-number" style={{
            color: "rgba(0,0,0,0.03)",
            bottom: -40, left: -20,
          }}>新</div>

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <Reveal variant="fadeUp">
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                marginBottom: 60, flexWrap: "wrap", gap: 20,
              }}>
                <div>
                  <div className="section-line" />
                  <p className="t-label" style={{ marginBottom: 16 }}>Latest Posts</p>
                  <h2 className="t-heading">최신 꿀팁</h2>
                </div>
              </div>
            </Reveal>

            <StaggerReveal style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
            }}>
              {latestPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <PostCard post={post} variant="light" />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════
          카테고리별 섹션 — 흰색/옐로우 교대 레이아웃
      ════════════════════════════════════════════════ */}
      {Object.values(CATEGORIES).map((cat, idx) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 3);
        if (catPosts.length === 0) return null;
        const isWhite = idx % 2 === 0;

        return (
          <section
            key={cat.slug}
            style={{
              background: isWhite ? "var(--white)" : "var(--yellow)",
              paddingTop: 100,
              paddingBottom: 100,
              borderTop: "1px solid rgba(0,0,0,0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="deco-number" style={{
              color: "rgba(0,0,0,0.03)",
              top: -20, right: -10,
            }}>{String(idx + 1).padStart(2, "0")}</div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
              <Reveal variant="fadeUp">
                <div style={{
                  display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                  marginBottom: 60, flexWrap: "wrap", gap: 20,
                }}>
                  <div>
                    <div className="section-line" />
                    <p className="t-label" style={{ marginBottom: 16 }}>{cat.name}</p>
                    <h2 className="t-heading">{cat.description}</h2>
                  </div>
                  <Link href={`/${cat.slug}`} className="link-arrow-teal">
                    전체보기 →
                  </Link>
                </div>
              </Reveal>

              <StaggerReveal style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 3,
              }}>
                {catPosts.map((post) => (
                  <StaggerItem key={post.slug}>
                    <PostCard post={post} variant="light" />
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </section>
        );
      })}

      {/* ════════════════════════════════════════════════
          CTA 섹션
      ════════════════════════════════════════════════ */}
      <section style={{
        background: "var(--white)",
        paddingTop: 120,
        paddingBottom: 120,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal variant="fadeUp">
            <p className="t-label" style={{ marginBottom: 24 }}>생활 꿀팁 블로그</p>
            <h2 style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 32,
            }}>
              더 나은 일상을<br />
              <span style={{ color: "var(--teal)" }}>지금 시작하세요.</span>
            </h2>
            <p style={{
              fontSize: "var(--fs-md)", color: "var(--ink-light)",
              fontWeight: 300, marginBottom: 48,
            }}>
              매주 새로운 꿀팁을 만나보세요
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {Object.values(CATEGORIES).map((cat) => (
                <Link key={cat.slug} href={`/${cat.slug}`} className="btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  {cat.iconUrl
                    ? <img src={cat.iconUrl} alt="" width={20} height={20} style={{ objectFit: "contain" }} />
                    : cat.emoji
                  }
                  {cat.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {posts.length === 0 && (
        <section style={{ padding: "120px 24px", textAlign: "center", background: "var(--yellow)" }}>
          <p style={{ fontFamily: "'Nanum Myeongjo', serif", fontSize: "var(--fs-3xl)", fontWeight: 800, color: "var(--ink)", marginBottom: 12 }}>준비 중</p>
          <p style={{ color: "var(--ink-light)", fontSize: "var(--fs-sm)" }}>아직 등록된 포스팅이 없습니다.</p>
        </section>
      )}
    </>
  );
}
