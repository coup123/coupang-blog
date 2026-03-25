"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "2px solid #15A775" }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-0" style={{ height: "64px" }}>
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* 로고 이미지가 있으면 사용, 없으면 텍스트 */}
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ color: "#111" }}
          >
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* 카테고리 탭 네비 — 새미네부엌 스타일 */}
        <div className="flex items-center h-full">
          {Object.values(CATEGORIES).map((cat) => {
            const isActive =
              pathname === `/${cat.slug}` ||
              pathname.startsWith(`/${cat.slug}/`);
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="relative flex items-center gap-1.5 px-4 h-full text-sm font-semibold transition-colors"
                style={{
                  color: isActive ? "#15A775" : "#555",
                }}
              >
                {/* 카테고리 아이콘 이미지 or 이모지 fallback */}
                <CategoryIcon cat={cat} />
                <span>{cat.name}</span>
                {/* 활성 탭 하단 초록 bar */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: "2px", background: "#15A775" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

function CategoryIcon({ cat }: { cat: { slug: string; emoji: string; iconUrl?: string } }) {
  if (cat.iconUrl) {
    return (
      <Image
        src={cat.iconUrl}
        alt={cat.slug}
        width={20}
        height={20}
        className="rounded-sm object-cover"
        style={{ width: 20, height: 20 }}
      />
    );
  }
  return <span className="text-base">{cat.emoji}</span>;
}
