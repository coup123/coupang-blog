"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import type { PostMeta } from "@/lib/posts";
import type { CategoryKey } from "@/lib/constants";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  cleaning: { bg: "#e8f5e9", text: "#388e3c", border: "#a5d6a7" },
  cooking:  { bg: "#fff3e0", text: "#e65100", border: "#ffcc80" },
};

export default function PostCard({ post }: { post: PostMeta }) {
  const cat = CATEGORIES[post.category as CategoryKey];
  const color = CATEGORY_COLORS[post.category] ?? { bg: "#fafafa", text: "#555", border: "#ddd" };

  return (
    <Link href={`/${post.category}/${post.slug}`} className="group block">
      <article
        className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
        style={{
          background: "#fffdf8",
          border: "2px solid #ffe0c8",
          boxShadow: "0 3px 14px rgba(255,176,133,0.12)",
        }}
      >
        {/* 카테고리 뱃지 + 날짜 */}
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ background: color.bg, color: color.text, border: `1.5px solid ${color.border}` }}
          >
            {cat?.emoji} {cat?.name}
          </span>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#b89a80" }}>
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* 제목 */}
        <h2
          className="text-base font-extrabold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-orange-600"
          style={{ color: "#3d2c1e" }}
        >
          {post.title}
        </h2>

        {/* 설명 */}
        <p className="mt-1.5 text-sm line-clamp-2" style={{ color: "#9e7c68" }}>
          {post.description}
        </p>

        {/* 태그 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{ background: "#fff0e6", color: "#c9713a", border: "1px solid #ffd4b2" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 읽기 유도 */}
        <div className="mt-3 flex justify-end">
          <span className="text-xs font-bold" style={{ color: "#d97a45" }}>
            자세히 보기 →
          </span>
        </div>
      </article>
    </Link>
  );
}
