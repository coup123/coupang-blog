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

export default function PostCard({ post, variant = "light" }: Props) {
  const cat = CATEGORIES[post.category];
  const isDark = variant === "dark";

  return (
    <Link href={`/${post.category}/${post.slug}`} className="group block h-full">
      <motion.article
        style={{
          background: isDark ? "var(--white)" : "var(--white)",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        whileHover={{
          y: -6,
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.3)"
            : "0 20px 50px rgba(2,185,201,0.12)",
          transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        {/* 썸네일 */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "3/2",
            background: "linear-gradient(135deg, var(--yellow), var(--yellow-deep))",
          }}
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {cat?.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.iconUrl} alt={cat.name} width={72} height={72}
                  style={{ objectFit: "contain", opacity: 0.6 }} />
              ) : (
                <span style={{ fontSize: "3rem", opacity: 0.25 }}>{cat?.emoji}</span>
              )}
            </div>
          )}

          {/* 오버레이 */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(255,243,160,0.5) 0%, transparent 60%)",
          }} />

          {/* 카테고리 태그 */}
          <div style={{ position: "absolute", top: 16, left: 16 }}>
            <span
              style={{
                display: "inline-block",
                background: "var(--teal)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 700,
                padding: "4px 10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                backdropFilter: "blur(8px)",
              }}
            >
              {cat?.name}
            </span>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div style={{
          padding: "24px 26px 26px",
          display: "flex", flexDirection: "column", flex: 1,
        }}>
          <time style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--teal)",
            marginBottom: 10,
            display: "block",
          }}>
            {post.date}
          </time>

          <h2 style={{
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: "clamp(16px, 1.4vw, 20px)",
            fontWeight: 800,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            marginBottom: 12,
            transition: "color 0.2s",
          }}>
            {post.title}
          </h2>

          <p style={{
            fontSize: "var(--fs-sm)",
            lineHeight: 1.7,
            color: "var(--ink-light)",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}>
            {post.description}
          </p>

          {/* 하단 읽기 링크 */}
          <div style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}>
            <motion.span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--teal)",
                display: "flex", alignItems: "center", gap: 4,
              }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
            >
              읽기 →
            </motion.span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
