"use client";

import Link from "next/link";
import Image from "next/image";

interface Cat {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  iconUrl?: string;
}

export default function CategoryTile({ cat, count }: { cat: Cat; count: number }) {
  return (
    <Link
      href={`/${cat.slug}`}
      className="group block"
      style={{
        background: "var(--bg-dark2)",
        padding: "44px 36px",
        minHeight: 260,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background 0.25s",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#2a2a2a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-dark2)";
      }}
    >
      {/* 배경 대형 이모지/숫자 장식 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -10,
          right: 20,
          fontFamily: "'Nanum Myeongjo', serif",
          fontSize: 120,
          fontWeight: 800,
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {String(count).padStart(2, "0")}
      </div>

      <div style={{ position: "relative" }}>
        {/* 아이콘 */}
        {cat.iconUrl ? (
          <Image
            src={cat.iconUrl}
            alt={cat.name}
            width={40}
            height={40}
            className="object-contain mb-5"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.7 }}
          />
        ) : (
          <span style={{ fontSize: "2rem", display: "block", marginBottom: 20, opacity: 0.7 }}>
            {cat.emoji}
          </span>
        )}

        {/* 레이블 */}
        <p
          style={{
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 10,
          }}
        >
          {cat.name}
        </p>

        {/* 설명 */}
        <h2
          style={{
            fontFamily: "'Nanum Myeongjo', serif",
            fontSize: "clamp(20px, 1.8vw, 26px)",
            fontWeight: 800,
            color: "var(--text-white)",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {cat.description}
        </h2>
      </div>

      <div className="flex items-center justify-between" style={{ position: "relative" }}>
        <span
          style={{
            fontSize: "var(--fs-xs)",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          {count}개의 꿀팁
        </span>
        <span className="link-white" style={{ fontSize: "var(--fs-xs)" }}>
          보러가기
        </span>
      </div>
    </Link>
  );
}
