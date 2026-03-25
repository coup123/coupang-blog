import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">

      {/* 히어로 섹션 — 새미네부엌 스타일 */}
      <section className="mb-12">
        <div
          className="rounded-2xl overflow-hidden flex items-center justify-between px-10 py-9"
          style={{
            background: "linear-gradient(135deg, #e8f7f1 0%, #f0faf5 50%, #ffffff 100%)",
            border: "1px solid #d4f0e4",
          }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "#15A775" }}
            >
              Daily Living Tips
            </p>
            <h1
              className="font-extrabold leading-tight mb-3"
              style={{ fontSize: "1.9rem", color: "#111", letterSpacing: "-0.02em" }}
            >
              매일의 살림을<br />더 스마트하게 ✨
            </h1>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              청소 · 건강 · 요리 꿀팁 모음
            </p>
          </div>
          <div className="hidden sm:flex gap-3">
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex flex-col items-center gap-2 px-5 py-4 rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid #d4f0e4",
                  boxShadow: "0 1px 6px rgba(21,167,117,0.08)",
                  minWidth: 80,
                }}
              >
                {cat.iconUrl ? (
                  <Image src={cat.iconUrl} alt={cat.name} width={32} height={32} className="object-contain" />
                ) : (
                  <span style={{ fontSize: "1.6rem" }}>{cat.emoji}</span>
                )}
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#333" }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리별 섹션 */}
      {Object.values(CATEGORIES).map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 4);
        if (catPosts.length === 0) return null;
        return (
          <section key={cat.slug} className="mb-14">
            {/* 섹션 헤더 — 새미네부엌 스타일 */}
            <div
              className="flex items-center justify-between mb-5 pb-3"
              style={{ borderBottom: "1.5px solid #eee" }}
            >
              <div className="flex items-center gap-2.5">
                {cat.iconUrl ? (
                  <Image src={cat.iconUrl} alt={cat.name} width={22} height={22} className="object-contain" />
                ) : (
                  <span style={{ fontSize: "1.1rem" }}>{cat.emoji}</span>
                )}
                <span
                  className="font-extrabold"
                  style={{ fontSize: "1.05rem", color: "#111", letterSpacing: "-0.01em" }}
                >
                  {cat.name}
                </span>
                <span style={{ color: "#bbb", fontSize: "0.8rem" }}>{cat.description}</span>
              </div>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-[#15A775]"
                style={{ color: "#999" }}
              >
                전체보기
                <span style={{ fontSize: "0.8rem" }}>›</span>
              </Link>
            </div>

            {/* 4열 이미지 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {catPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}

      {posts.length === 0 && (
        <div
          className="py-24 text-center rounded-2xl"
          style={{ background: "#f9f9f9", border: "1px dashed #ddd" }}
        >
          <p className="text-4xl mb-3">🌱</p>
          <p style={{ color: "#aaa", fontSize: "0.9rem" }}>아직 등록된 포스팅이 없어요.</p>
        </div>
      )}
    </div>
  );
}
