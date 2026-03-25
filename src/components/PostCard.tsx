"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import type { PostMeta } from "@/lib/posts";
import type { CategoryKey } from "@/lib/constants";

export default function PostCard({ post }: { post: PostMeta }) {
  const cat = CATEGORIES[post.category as CategoryKey];
  const color = cat?.color ?? { bg: "#fafafa", text: "#555", border: "#ddd", accent: "#888" };

  return (
    <Link href={`/${post.category}/${post.slug}`} className="group block">
      <article className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl bg-white"
        style={{ border: "1.5px solid #f0e8e0", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
      >
        {/* 썸네일 */}
        <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: "4/3" }}>
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl"
              style={{ background: `linear-gradient(135deg, ${color.bg}, #fff8f0)` }}
            >
              {cat?.emoji}
            </div>
          )}
          {/* 카테고리 뱃지 */}
          <span
            className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-extrabold"
            style={{ background: color.bg, color: color.text, border: `1.5px solid ${color.border}` }}
          >
            {cat?.emoji} {cat?.name}
          </span>
        </div>

        {/* 텍스트 */}
        <div className="p-3.5">
          <h2
            className="text-sm font-extrabold leading-snug line-clamp-2 transition-colors group-hover:text-orange-500"
            style={{ color: "#3d2c1e" }}
          >
            {post.title}
          </h2>
          <p className="mt-1 text-xs line-clamp-2" style={{ color: "#9e7c68" }}>
            {post.description}
          </p>

          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#fff0e6", color: "#c9713a" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-2 text-xs" style={{ color: "#b89a80" }}>
            {post.readingTime}
          </div>
        </div>
      </article>
    </Link>
  );
}
