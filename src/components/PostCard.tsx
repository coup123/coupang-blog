"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import type { PostMeta } from "@/lib/posts";
import type { CategoryKey } from "@/lib/constants";

export default function PostCard({ post }: { post: PostMeta }) {
  const cat = CATEGORIES[post.category as CategoryKey];

  return (
    <Link href={`/${post.category}/${post.slug}`} className="group block">
      <article>
        {/* 썸네일 — 1:1 정사각형 (새미네부엌 스타일) */}
        <div
          className="relative w-full overflow-hidden bg-gray-100"
          style={{ aspectRatio: "1/1" }}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #f0f9f4 0%, #e8f7f1 100%)",
              }}
            >
              {cat?.iconUrl ? (
                <Image
                  src={cat.iconUrl}
                  alt={cat.name}
                  width={60}
                  height={60}
                  className="object-contain opacity-70"
                />
              ) : (
                <span style={{ fontSize: "3rem" }}>{cat?.emoji}</span>
              )}
            </div>
          )}

          {/* 카테고리 뱃지 */}
          <span
            className="absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded"
            style={{
              background: "rgba(21,167,117,0.9)",
              color: "#fff",
              fontSize: "0.68rem",
              letterSpacing: "0.01em",
            }}
          >
            {cat?.name}
          </span>
        </div>

        {/* 텍스트 */}
        <div className="mt-2.5">
          <h2
            className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[#15A775]"
            style={{ color: "#111", fontSize: "0.85rem" }}
          >
            {post.title}
          </h2>
          <p
            className="mt-1 line-clamp-1"
            style={{ color: "#888", fontSize: "0.75rem" }}
          >
            {post.description}
          </p>

          {/* 태그 필 — 새미네부엌 스타일 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
