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
      {/* ─── HERO ────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg, #fbfbfd 0%, #ffffff 100%)",
          paddingTop: 80,
          paddingBottom: 80,
          textAlign: "center",
          borderBottom: "1px solid rgba(210,210,215,0.4)",
        }}
      >
        <div className="container">
          <p className="text-eyebrow mb-4">Daily Living Tips</p>
          <h1 className="text-hero mb-5">
            매일의 살림,<br />
            <span style={{ color: "#0066cc" }}>더 스마트하게.</span>
          </h1>
          <p className="text-body mx-auto mb-8" style={{ maxWidth: 520, fontSize: "var(--fs-label)" }}>
            청소부터 건강 루틴, 요리 레시피까지.<br />
            실생활에 바로 쓰이는 꿀팁을 모았습니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {Object.values(CATEGORIES).map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className="btn-apple-filled">
                {cat.iconUrl ? (
                  <Image src={cat.iconUrl} alt="" width={16} height={16} className="object-contain" />
                ) : (
                  <span>{cat.emoji}</span>
                )}
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 카테고리 타일 ─────────────────────────────────── */}
      <section style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {Object.values(CATEGORIES).map((cat) => {
              const catPosts = posts.filter((p) => p.category === cat.slug);
              return (
                <CategoryTile
                  key={cat.slug}
                  cat={cat}
                  count={catPosts.length}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 최신 글 그리드 ────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section style={{ paddingTop: 60, paddingBottom: 100 }}>
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-eyebrow mb-2">Latest</p>
                <h2
                  className="text-section-head"
                  style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                >
                  최신 꿀팁
                </h2>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 카테고리별 섹션 ───────────────────────────────── */}
      {Object.values(CATEGORIES).map((cat, idx) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 3);
        if (catPosts.length === 0) return null;
        const isDark = idx % 2 === 1;
        return (
          <section
            key={cat.slug}
            style={{
              background: isDark ? "#f5f5f7" : "#ffffff",
              paddingTop: 80,
              paddingBottom: 80,
              borderTop: "1px solid rgba(210,210,215,0.4)",
            }}
          >
            <div className="container">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-eyebrow mb-2">{cat.name}</p>
                  <h2
                    className="text-section-head"
                    style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                  >
                    {cat.description}
                  </h2>
                </div>
                <Link href={`/${cat.slug}`} className="link-apple">
                  전체보기
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 20,
                }}
              >
                {catPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {posts.length === 0 && (
        <section style={{ padding: "120px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: 16 }}>🌱</p>
          <p style={{ color: "var(--apple-text-ter)", fontSize: "var(--fs-label)" }}>
            아직 등록된 포스팅이 없습니다.
          </p>
        </section>
      )}
    </>
  );
}
