import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      {/* 카테고리 탭 헤더 — 새미네부엌 스타일 */}
      <section className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: "#1a1a1a" }}>생활꿀팁</h1>
        <p className="text-sm mb-6" style={{ color: "#888" }}>청소 · 건강 · 요리, 매일의 살림을 더 스마트하게</p>

        {/* 카테고리 탭 */}
        <div className="flex gap-2 border-b border-gray-100 pb-0">
          {Object.values(CATEGORIES).map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="px-5 py-2.5 text-sm font-bold rounded-t-lg transition-colors hover:bg-orange-50"
              style={i === 0 ? {
                background: "#fff8f5",
                color: "#e8724a",
                border: "1px solid #f5ddd4",
                borderBottom: "1px solid #fff8f5",
              } : {
                color: "#666",
              }}
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 카테고리별 섹션 */}
      {Object.values(CATEGORIES).map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 4);
        if (catPosts.length === 0) return null;
        return (
          <section key={cat.slug} className="mb-14">
            {/* 섹션 헤더 */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold" style={{ color: "#1a1a1a" }}>
                  {cat.emoji} {cat.name}
                </span>
                <span className="text-sm" style={{ color: "#aaa" }}>· {cat.description}</span>
              </div>
              <Link
                href={`/${cat.slug}`}
                className="text-xs font-bold hover:underline"
                style={{ color: "#888" }}
              >
                전체보기 →
              </Link>
            </div>

            {/* 4열 이미지 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {catPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}

      {posts.length === 0 && (
        <div className="py-20 text-center rounded-xl border border-gray-100">
          <p className="text-3xl mb-3">🌱</p>
          <p style={{ color: "#aaa" }}>아직 등록된 포스팅이 없어요.</p>
        </div>
      )}
    </div>
  );
}
