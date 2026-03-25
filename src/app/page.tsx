import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">

      {/* 히어로 섹션 */}
      <section
        className="rounded-3xl px-8 py-10 mb-10 text-center"
        style={{
          background: "linear-gradient(135deg, #fff8f0 0%, #ffdfc7 100%)",
          border: "2px solid #ffbf94",
          boxShadow: "0 4px 24px rgba(255,176,133,0.18)",
        }}
      >
        <div className="text-5xl mb-3">🏡</div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-2"
          style={{ color: "#3d2c1e", fontFamily: "'Nanum Gothic', sans-serif" }}
        >
          생활꿀팁
        </h1>
        <p className="text-sm sm:text-base" style={{ color: "#9e7c68" }}>
          청소, 요리… 매일의 살림을 조금 더 즐겁게 💛
        </p>

        {/* 카테고리 바로가기 */}
        <div className="flex justify-center gap-3 mt-6">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-extrabold transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "2px solid #ffbf94",
                color: "#d97a45",
                boxShadow: "0 2px 8px rgba(255,176,133,0.2)",
              }}
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 포스트 목록 */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">📋</span>
          <h2 className="text-lg font-extrabold" style={{ color: "#3d2c1e" }}>
            최신 꿀팁 모아보기
          </h2>
        </div>

        {posts.length === 0 ? (
          <div
            className="rounded-2xl py-16 text-center"
            style={{ background: "#fff8f0", border: "2px dashed #ffd4b2" }}
          >
            <p className="text-4xl mb-3">🌱</p>
            <p style={{ color: "#b89a80" }}>아직 등록된 포스팅이 없어요.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={`${post.category}-${post.slug}`} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
