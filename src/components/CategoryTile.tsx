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
          background: "linear-gradient(145deg, #242424 0%, #1e2e1a 100%)",
          padding: "44px 36px",
          minHeight: 260,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          cursor: "pointer",
        }}
        whileHover={{
          background: "linear-gradient(145deg, #2e2e2e 0%, #263424 100%)",
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
            color: "rgba(201,168,92,0.06)",
            lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}
        >
          {String(count).padStart(2, "0")}
        </div>

        {/* 배경 블롭 */}
        <div style={{
          position: "absolute", bottom: -40, right: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,92,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative" }}>
          {/* 아이콘 */}
          {cat.iconUrl ? (
            <Image
              src={cat.iconUrl} alt={cat.name}
              width={40} height={40}
              className="object-contain mb-5"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }}
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
            color: "var(--gold)", marginBottom: 10,
          }}>
            {cat.name}
          </p>
          <h2 style={{
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: "clamp(20px, 1.8vw, 26px)",
            fontWeight: 800, color: "var(--text-white)",
            letterSpacing: "-0.01em", lineHeight: 1.3,
          }}>
            {cat.description}
          </h2>
        </div>

        <div className="flex items-center justify-between" style={{ position: "relative" }}>
          <span style={{
            fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.3)",
            fontWeight: 700, letterSpacing: "0.06em",
          }}>
            {count}개의 꿀팁
          </span>
          <motion.span
            className="link-white"
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
