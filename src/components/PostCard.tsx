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
        {/* 썸네일 — 이미지가 전부 */}
        <div
          className="relative w-full overflow-hidden rounded-xl bg-gray-100"
          style={{ aspectRatio: "4/3" }}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-5xl"
              style={{ background: `linear-gradient(135deg, ${cat?.color.bg ?? "#f5f5f5"}, #fff)` }}
            >
              {cat?.emoji}
            </div>
          )}
        </div>

        {/* 텍스트 — 미니멀 */}
        <div className="mt-3">
          <h2 className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-orange-500" style={{ color: "#1a1a1a" }}>
            {post.title}
          </h2>
          <p className="mt-1 text-xs line-clamp-1" style={{ color: "#888" }}>
            {post.description}
          </p>
          {/* 준비시간 스타일 메타 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border"
                  style={{ color: "#888", borderColor: "#e8e8e8", background: "#fafafa" }}
                >
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
