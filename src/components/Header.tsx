import Link from "next/link";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏡</span>
          <span className="text-lg font-extrabold tracking-tight" style={{ color: "#1a1a1a" }}>
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* 카테고리 텍스트 네비 — 새미네부엌 스타일 */}
        <div className="flex items-center gap-6">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm font-bold transition-colors hover:text-orange-500"
              style={{ color: "#444" }}
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
