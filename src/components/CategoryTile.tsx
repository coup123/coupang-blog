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
          background: "var(--yellow)",
          padding: "52px 40px 44px",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          cursor: "pointer",
        }}
        whileHover={{
          background: "var(--ink)",
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* 대형 배경 숫자 */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -20, right: 16,
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: 140, fontWeight: 800,
            color: "rgba(0,0,0,0.04)",
            lineHeight: 1, pointerEvents: "none", userSelect: "none",
            transition: "color 0.3s",
          }}
          className="group-hover:text-white/[0.05]"
        >
          {String(count).padStart(2, "0")}
        </div>

        <div style={{ position: "relative" }}>
          {/* 아이콘/이모지 */}
          {cat.iconUrl ? (
            <motion.div
              style={{ marginBottom: 24, lineHeight: 1 }}
              whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0], transition: { duration: 0.4 } }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.iconUrl} alt={cat.name} width={56} height={56}
                style={{ objectFit: "contain", display: "block" }} />
            </motion.div>
          ) : (
            <motion.span
              style={{ fontSize: "2.2rem", display: "block", marginBottom: 24, lineHeight: 1 }}
              whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0], transition: { duration: 0.4 } }}
            >
              {cat.emoji}
            </motion.span>
          )}

          <motion.p
            style={{
              fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase" as const,
              color: "var(--teal)", marginBottom: 12,
              transition: "color 0.3s",
            }}
            whileHover={{ color: "rgba(255,255,255,0.7)" }}
          >
            {cat.name}
          </motion.p>

          <motion.h2
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "clamp(20px, 1.8vw, 26px)",
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              transition: "color 0.3s",
            }}
            whileHover={{ color: "#fff" }}
          >
            {cat.description}
          </motion.h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", marginTop: 32 }}>
          <motion.span
            style={{
              fontSize: "10px",
              color: "var(--ink-light)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              transition: "color 0.3s",
            }}
            whileHover={{ color: "rgba(255,255,255,0.6)" }}
          >
            {count}개의 꿀팁
          </motion.span>
          <motion.span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "var(--teal)",
              display: "flex", alignItems: "center", gap: 4,
              transition: "color 0.3s",
            }}
            whileHover={{ color: "#fff", x: 4 }}
            transition={{ duration: 0.15 }}
          >
            보러가기 →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
