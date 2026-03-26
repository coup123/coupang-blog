"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <Link href={`/${post.category}/${post.slug}`} className="group block h-full">
      <motion.article
        style={{
          background: isDark
            ? "linear-gradient(145deg, #242424 0%, #1e2a1c 100%)"
            : "linear-gradient(145deg, #ffffff 0%, #fdf6e8 100%)",
          overflow: "hidden",
          border: isDark ? "none" : "1px solid rgba(180,140,60,0.15)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* 썸네일 */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "4/3",
            background: isDark
              ? "linear-gradient(135deg, #2a2a2a, #1a2a18)"
              : "linear-gradient(135deg, #f9edd3, #ecdfc8)",
          }}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontSize: "2.8rem", opacity: 0.2 }}>{cat?.emoji}</span>
            </div>
          )}

          {/* 카테고리 태그 + 그라데이션 오버레이 */}
          <div style={{
            position: "absolute", inset: 0,
            background: isDark
              ? "linear-gradient(to top, rgba(20,20,20,0.6) 0%, transparent 50%)"
              : "linear-gradient(to top, rgba(240,220,180,0.4) 0%, transparent 50%)",
          }} />

          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <span className={isDark ? "tag-dark" : "tag-cream"}>{cat?.name}</span>
          </div>
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col flex-1" style={{ padding: "20px 22px 22px" }}>
          <h2
            className="font-bold leading-snug mb-3"
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "var(--fs-lg)",
              letterSpacing: "-0.01em",
              color: isDark ? "var(--text-white)" : "var(--text-dark)",
              lineHeight: 1.4,
              transition: "color 0.2s",
            }}
          >
            {post.title}
          </h2>
          <p
            className="line-clamp-2 flex-1"
            style={{
              fontSize: "var(--fs-sm)",
              lineHeight: 1.65,
              color: isDark ? "rgba(255,255,255,0.45)" : "var(--text-med)",
            }}
          >
            {post.description}
          </p>

          {/* 하단 */}
          <div
            className="flex items-center justify-between mt-5 pt-4"
            style={{
              borderTop: isDark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(180,140,60,0.15)",
            }}
          >
            <time style={{
              fontSize: "var(--fs-xs)",
              color: isDark ? "rgba(255,255,255,0.3)" : "var(--text-light)",
              fontWeight: 700, letterSpacing: "0.06em",
            }}>
              {post.date}
            </time>
            <motion.span
              className={isDark ? "link-white" : "link-dark"}
              style={{ fontSize: "var(--fs-xs)" }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
            >
              읽기
            </motion.span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
