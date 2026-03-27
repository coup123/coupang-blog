import { COUPANG_DISCLAIMER, SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ paddingTop: 64, paddingBottom: 48 }}>
        {/* 상단 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 40 }}>
          {/* 브랜드 */}
          <div style={{ maxWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 800, color: "#ffffff" }}>
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#666666", lineHeight: 1.8 }}>
              청소, 건강, 요리 — 더 나은 일상을 위한 검증된 꿀팁
            </p>
          </div>

          {/* 카테고리 링크 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#555555", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
              카테고리
            </p>
            {Object.values(CATEGORIES).map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className="footer-link"
                style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {cat.iconUrl
                  ? <img src={cat.iconUrl} alt="" width={18} height={18} style={{ objectFit: "contain", opacity: 0.7 }} />
                  : <span style={{ opacity: 0.6 }}>{cat.emoji}</span>
                }
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: 1, background: "#222222", marginBottom: 28 }} />

        {/* 하단 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#444444", fontFamily: "var(--font-sans)" }}>
            © 2026 {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: "#333333", fontFamily: "var(--font-sans)", maxWidth: 580, textAlign: "right", lineHeight: 1.7 }}>
            {COUPANG_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
