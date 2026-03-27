"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Cat {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  iconUrl?: string;
}

export default function CategoryTile({ cat, count }: { cat: Cat; count: number }) {
  return (
    <Link href={`/${cat.slug}`} className="group block">
      <motion.div
        style={{
          background: "linear-gradient(145deg, #ffffff 0%, #fff9c9 100%)",
          padding: "44px 36px",
          minHeight: 260,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(2,185,201,0.15)",
          cursor: "pointer",
        }}
        whileHover={{
          background: "linear-gradient(145deg, #fff9c9 0%, #fff3a0 100%)",
          y: -4,
          transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* 배경 장식 숫자 */}
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: -10, right: 20,
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: 120, fontWeight: 800,
            color: "rgba(2,185,201,0.1)",
            lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}
        >
          {String(count).padStart(2, "0")}
        </div>

        {/* 배경 블롭 */}
        <div style={{
          position: "absolute", bottom: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(2,185,201,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          {/* 아이콘 */}
          {cat.iconUrl ? (
            <Image
              src={cat.iconUrl} alt={cat.name}
              width={40} height={40}
              className="object-contain mb-5"
              style={{ opacity: 0.7 }}
            />
          ) : (
            <motion.span
              style={{ fontSize: "2rem", display: "block", marginBottom: 20 }}
              whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
            >
              {cat.emoji}
            </motion.span>
          )}

          <p style={{
            fontSize: "var(--fs-xs)", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase" as const,
            color: "var(--teal)", marginBottom: 10,
          }}>
            {cat.name}
          </p>
          <h2 style={{
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: "clamp(20px, 1.8vw, 26px)",
            fontWeight: 800, color: "var(--text-dark)",
            letterSpacing: "-0.01em", lineHeight: 1.3,
          }}>
            {cat.description}
          </h2>
        </div>

        <div className="flex items-center justify-between" style={{ position: "relative" }}>
          <span style={{
            fontSize: "var(--fs-xs)", color: "var(--text-light)",
            fontWeight: 700, letterSpacing: "0.06em",
          }}>
            {count}개의 꿀팁
          </span>
          <motion.span
            className="link-dark"
            style={{ fontSize: "var(--fs-xs)" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.15 }}
          >
            보러가기
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
