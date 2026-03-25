"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  const cat = CATEGORIES[post.category];

  return (
    <Link href={`/${post.category}/${post.slug}`} className="group block">
      <article
        className="apple-card h-full flex flex-col transition-all duration-300"
        style={{
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          transform: "translateY(0)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        }}
      >
        {/* 썸네일 — 16:9 */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/10", background: "#e8e8ed" }}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(145deg, #f0f0f5 0%, #e8e8ed 100%)" }}
            >
              {cat?.iconUrl ? (
                <Image
                  src={cat.iconUrl}
                  alt={cat.name ?? ""}
                  width={64}
                  height={64}
                  className="object-contain opacity-50"
                />
              ) : (
                <span style={{ fontSize: "2.8rem", opacity: 0.4 }}>{cat?.emoji}</span>
              )}
            </div>
          )}
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col flex-1 p-5">
          {/* eyebrow — 카테고리 */}
          <p className="text-eyebrow mb-1.5" style={{ fontSize: "var(--fs-xs)" }}>
            {cat?.name}
          </p>

          {/* 제목 */}
          <h2
            className="font-semibold leading-snug mb-2 transition-colors group-hover:text-[#0066cc]"
            style={{ fontSize: "var(--fs-h4)", color: "var(--apple-text)", letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h2>

          {/* 설명 */}
          <p
            className="text-body line-clamp-2 flex-1"
            style={{ fontSize: "var(--fs-sm)", lineHeight: 1.55 }}
          >
            {post.description}
          </p>

          {/* 태그 + 더보기 링크 */}
          <div className="flex items-center justify-between mt-4 pt-4"
               style={{ borderTop: "1px solid rgba(210,210,215,0.5)" }}>
            <div className="flex flex-wrap gap-1.5">
              {post.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="apple-tag">{tag}</span>
              ))}
            </div>
            <span className="link-apple shrink-0" style={{ fontSize: "var(--fs-xs)" }}>
              더보기
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
