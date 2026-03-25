import { COUPANG_DISCLAIMER, SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-black)",
        color: "var(--text-white)",
        paddingTop: 64,
        paddingBottom: 48,
      }}
    >
      <div className="container">
        {/* 상단: 로고 + 카테고리 */}
        <div
          className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-10"
          style={{ borderBottom: "1px solid var(--border-dark)" }}
        >
          {/* 로고 */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "'Nanum Myeongjo', serif",
                fontSize: 24,
                fontWeight: 800,
                color: "var(--text-white)",
                letterSpacing: "-0.02em",
                display: "block",
                marginBottom: 12,
              }}
            >
              {SITE_CONFIG.name}
            </Link>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                maxWidth: 300,
              }}
            >
              청소부터 건강 루틴, 요리 레시피까지.<br />
              실생활에 바로 쓰이는 꿀팁을 모았습니다.
            </p>
          </div>

          {/* 카테고리 링크 */}
          <div>
            <p
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 16,
              }}
            >
              Categories
            </p>
            <div className="flex flex-col gap-3">
              {Object.values(CATEGORIES).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 하단: 저작권 + 공정위 */}
        <div className="pt-8 flex flex-col gap-3">
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.03em",
            }}
          >
            Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "rgba(255,255,255,0.2)",
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            {COUPANG_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
