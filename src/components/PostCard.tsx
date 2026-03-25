"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import type { PostMeta } from "@/lib/posts";

interface Props {
  post: PostMeta;
  variant?: "dark" | "light";
}

export default function PostCard({ post, variant = "dark" }: Props) {
  const cat = CATEGORIES[post.category];
  const isDark = variant === "dark";

  return (
    <Link href={`/${post.category}/${post.slug}`} className="group block">
      <article
        style={{
          background: isDark ? "var(--bg-dark2)" : "var(--bg-white)",
          overflow: "hidden",
          border: isDark ? "none" : "1px solid var(--border-cream)",
          transition: "transform 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* 썸네일 */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "4/3",
            background: isDark ? "#2a2a2a" : "var(--bg-cream-dark)",
          }}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: isDark
                  ? "linear-gradient(145deg, #2a2a2a, #1a1a1a)"
                  : "linear-gradient(145deg, var(--bg-cream), var(--bg-cream-dark))",
              }}
            >
              {cat?.iconUrl ? (
                <Image
                  src={cat.iconUrl}
                  alt={cat.name ?? ""}
                  width={64}
                  height={64}
                  className="object-contain opacity-30"
                />
              ) : (
                <span style={{ fontSize: "2.5rem", opacity: 0.25 }}>{cat?.emoji}</span>
              )}
            </div>
          )}

          {/* 카테고리 오버레이 태그 */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
            }}
          >
            <span className={isDark ? "tag-dark" : "tag-cream"}>
              {cat?.name}
            </span>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div
          className="flex flex-col flex-1"
          style={{ padding: "20px 22px 22px" }}
        >
          {/* 제목 */}
          <h2
            className="font-bold leading-snug mb-3"
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "var(--fs-lg)",
              letterSpacing: "-0.01em",
              color: isDark ? "var(--text-white)" : "var(--text-dark)",
              lineHeight: 1.4,
            }}
          >
            {post.title}
          </h2>

          {/* 설명 */}
          <p
            className="line-clamp-2 flex-1"
            style={{
              fontSize: "var(--fs-sm)",
              lineHeight: 1.65,
              color: isDark ? "rgba(255,255,255,0.5)" : "var(--text-med)",
            }}
          >
            {post.description}
          </p>

          {/* 하단 메타 */}
          <div
            className="flex items-center justify-between mt-5 pt-4"
            style={{
              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid var(--border-cream)",
            }}
          >
            <time
              style={{
                fontSize: "var(--fs-xs)",
                color: isDark ? "rgba(255,255,255,0.35)" : "var(--text-light)",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              {post.date}
            </time>
            <span className={isDark ? "link-white" : "link-dark"} style={{ fontSize: "var(--fs-xs)" }}>
              읽기
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
