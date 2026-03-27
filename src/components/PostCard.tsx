"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";

interface Post {
  slug: string;
  title: string;
  description?: string;
  date: string;
  category: string;
  tags?: string[];
  thumbnail?: string;
}

// 카테고리별 썸네일 플레이스홀더 색상
const THUMB_COLORS: Record<string, string> = {
  cleaning: "#FFF0CC",
  health:   "#E8F8EC",
  cooking:  "#FFF0E8",
};

export default function PostCard({ post }: { post: Post }) {
  const cat = Object.values(CATEGORIES).find((c) => c.slug === post.category);
  const thumbBg = THUMB_COLORS[post.category] ?? "#f5f5f0";

  return (
    <Link href={`/${post.category}/${post.slug}`} style={{ display: "block", flex: 1 }}>
      <motion.article
        className="post-card"
        whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "100%" }}
      >
        {/* 썸네일 */}
        <div className="post-card-thumb-placeholder" style={{ background: thumbBg, position: "relative", overflow: "hidden" }}>
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="post-card-thumb"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              {cat?.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.iconUrl} alt={cat.name} width={72} height={72} style={{ objectFit: "contain", opacity: 0.55 }} />
              ) : (
                <span style={{ fontSize: "3rem", opacity: 0.3 }}>{cat?.emoji}</span>
              )}
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="post-card-body">
          {/* 태그 */}
          <span className="tag">{cat?.name ?? post.category}</span>

          {/* 제목 */}
          <h3 className="post-card-title">{post.title}</h3>

          {/* 요약 */}
          {post.description && (
            <p className="post-card-desc" style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.description}
            </p>
          )}

          {/* 날짜 */}
          <span className="post-card-date">{post.date}</span>
        </div>
      </motion.article>
    </Link>
  );
}
