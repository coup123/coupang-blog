import Link from "next/link";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "linear-gradient(135deg, #fff8f0 0%, #ffeedd 100%)",
        borderBottom: "2px solid #ffbf94",
        boxShadow: "0 3px 16px rgba(255,176,133,0.18)",
      }}
    >
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-3xl drop-shadow-sm">🏡</span>
          <div>
            <div
              className="text-xl font-extrabold leading-tight tracking-tight"
              style={{ color: "#d97a45", fontFamily: "'Nanum Gothic', sans-serif" }}
            >
              {SITE_CONFIG.name}
            </div>
            <div className="text-xs" style={{ color: "#b89a80" }}>
              살림의 즐거움을 함께해요 ✨
            </div>
          </div>
        </Link>

        {/* 카테고리 버튼 */}
        <div className="flex gap-2">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-md"
              style={{
                background: "#fff",
                border: "2px solid #ffbf94",
                color: "#d97a45",
                boxShadow: "0 2px 8px rgba(255,176,133,0.18)",
              }}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
