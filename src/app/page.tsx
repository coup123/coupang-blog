import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">

      {/* 히어로 */}
      <section
        className="rounded-3xl px-8 py-10 mb-10 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fff8f0 0%, #ffdfc7 60%, #ffe9d5 100%)",
          border: "2px solid #ffbf94",
        }}
      >
        <div className="text-5xl mb-3">🏡</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: "#3d2c1e" }}>
          생활꿀팁
        </h1>
        <p className="text-sm sm:text-base mb-6" style={{ color: "#9e7c68" }}>
          청소 · 건강 · 요리, 매일의 살림을 더 스마트하게 💛
        </p>

        {/* 카테고리 3개 카드 */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="rounded-2xl p-4 text-center transition-all hover:scale-105 hover:shadow-md"
              style={{
                background: "#fff",
                border: `2px solid ${cat.color.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="text-2xl mb-1">{cat.emoji}</div>
              <div className="text-xs font-extrabold" style={{ color: cat.color.text }}>{cat.name}</div>
              <div className="text-xs mt-0.5" style={{ color: "#b89a80" }}>{cat.description}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 카테고리별 섹션 */}
      {Object.values(CATEGORIES).map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat.slug).slice(0, 4);
        if (catPosts.length === 0) return null;
        return (
          <section key={cat.slug} className="mb-12">
            {/* 섹션 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.emoji}</span>
                <h2 className="text-lg font-extrabold" style={{ color: "#3d2c1e" }}>{cat.name}</h2>
                <span className="text-sm" style={{ color: "#b89a80" }}>{cat.description}</span>
              </div>
              <Link
                href={`/${cat.slug}`}
                className="text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:scale-105"
                style={{
                  background: cat.color.bg,
                  color: cat.color.text,
                  border: `1.5px solid ${cat.color.border}`,
                }}
              >
                더 보기 →
              </Link>
            </div>

            {/* 4열 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {catPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        );
      })}

      {/* 포스트 없을 때 */}
      {posts.length === 0 && (
        <div
          className="rounded-2xl py-16 text-center"
          style={{ background: "#fff8f0", border: "2px dashed #ffd4b2" }}
        >
          <p className="text-4xl mb-3">🌱</p>
          <p style={{ color: "#b89a80" }}>아직 등록된 포스팅이 없어요.</p>
        </div>
      )}
    </div>
  );
}
