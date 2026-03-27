"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Cat {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  iconUrl?: string;
}

interface Props {
  cat: Cat;
  count: number;
  dark?: boolean;
}

export default function CategoryTile({ cat, count, dark = false }: Props) {
  return (
    <Link href={`/${cat.slug}`} style={{ flex: 1, display: "block" }}>
      <motion.div
        className={`cat-tile${dark ? " cat-tile-dark" : ""}`}
        style={{ background: dark ? "var(--ink)" : "var(--cream)" }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 배경 숫자 */}
        <span className="cat-tile-count-bg" aria-hidden>
          {String(count).padStart(2, "0")}
        </span>

        {/* 아이콘 */}
        <motion.div
          className="cat-tile-icon"
          style={{ background: dark ? "#2a2a2a" : "#FFF9C4" }}
          whileHover={{ scale: 1.12, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {cat.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cat.iconUrl} alt={cat.name} width={36} height={36} style={{ objectFit: "contain" }} />
          ) : (
            <span>{cat.emoji}</span>
          )}
        </motion.div>

        {/* 텍스트 */}
        <div style={{ position: "relative" }}>
          <p className="cat-tile-tag">{cat.name}</p>
          <h2 className="cat-tile-title">{cat.description}</h2>
        </div>

        {/* 하단 */}
        <div className="cat-tile-footer">
          <span className="cat-tile-cnt">{count}개의 꿀팁</span>
          <span className="cat-tile-arrow">보러가기 →</span>
        </div>
      </motion.div>
    </Link>
  );
}
