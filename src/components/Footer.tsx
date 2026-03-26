import { COUPANG_DISCLAIMER, SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #fff8f0 0%, #ffeedd 100%)",
        borderTop: "2px solid #ffbf94",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* 상단: 로고 + 카테고리 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏡</span>
            <span className="text-lg font-extrabold" style={{ color: "#d97a45" }}>
              {SITE_CONFIG.name}
            </span>
          </div>
          <div className="flex gap-3">
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="text-sm font-bold transition-colors hover:underline"
                style={{ color: "#b89a80" }}
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px dashed #ffd4b2", marginBottom: "1rem" }} />

        {/* 하단: 저작권 + 공정위 */}
        <div className="text-center">
          <p className="text-xs" style={{ color: "#c4a090" }}>
            © {new Date().getFullYear()} {SITE_CONFIG.name} · 따뜻한 살림 이야기 🌿
          </p>
          <p className="mt-1.5 text-xs" style={{ color: "#c4a090" }}>
            {COUPANG_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
