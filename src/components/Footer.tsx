import { COUPANG_DISCLAIMER, SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#fafafa", borderTop: "1px solid #eeeeee" }}>
      <div className="mx-auto max-w-5xl px-5 py-10">
        {/* 상단 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* 로고 + 설명 */}
          <div>
            <span
              className="text-lg font-extrabold"
              style={{ color: "#111", letterSpacing: "-0.01em" }}
            >
              {SITE_CONFIG.name}
            </span>
            <p className="mt-1 text-xs" style={{ color: "#999" }}>
              청소 · 건강 · 요리, 매일의 살림을 더 스마트하게
            </p>
          </div>

          {/* 카테고리 링크 */}
          <div className="flex gap-5">
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="text-sm font-semibold transition-colors hover:text-[#15A775]"
                style={{ color: "#666" }}
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px solid #eeeeee", marginBottom: "1.25rem" }} />

        {/* 하단 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#bbb" }}>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-center sm:text-right" style={{ color: "#bbb", maxWidth: 480 }}>
            {COUPANG_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
