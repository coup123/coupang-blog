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
      className="group apple-card block"
      style={{
        padding: "40px 36px",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.01)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div>
        {cat.iconUrl ? (
          <Image
            src={cat.iconUrl}
            alt={cat.name}
            width={44}
            height={44}
            className="object-contain mb-4"
          />
        ) : (
          <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 16 }}>{cat.emoji}</span>
        )}
        <p className="text-eyebrow mb-2">{cat.name}</p>
        <h2
          className="font-semibold mb-2"
          style={{
            fontSize: "clamp(18px, 1.6vw, 28px)",
            color: "var(--apple-text)",
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
          }}
        >
          {cat.description}
        </h2>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--apple-text-ter)" }}>
          {count}개의 꿀팁
        </span>
        <span className="link-apple">보러가기</span>
      </div>
    </Link>
  );
}
