import { COUPANG_DISCLAIMER, SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--yellow)",
      color: "var(--ink)",
      paddingTop: 72,
      paddingBottom: 48,
      borderTop: "1px solid rgba(0,0,0,0.08)",
    }}>
      <div className="container">
        {/* 상단 */}
        <div
          className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          {/* 로고 + 설명 */}
          <div style={{ maxWidth: 320 }}>
            <Link href="/" style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: 22,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
            }}>
              <span style={{
                display: "inline-block", width: 7, height: 7,
                background: "var(--teal)", borderRadius: "50%",
              }} />
              {SITE_CONFIG.name}
            </Link>
            <p style={{
              fontSize: "var(--fs-sm)",
              color: "var(--ink-light)",
              lineHeight: 1.8,
              fontWeight: 300,
            }}>
              청소부터 건강 루틴, 요리 레시피까지.<br />
              실생활에 바로 쓰이는 검증된 꿀팁.
            </p>
          </div>

          {/* 카테고리 링크 */}
          <div>
            <p style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
              marginBottom: 20,
            }}>
              Categories
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.values(CATEGORIES).map((cat) => (
                <Link key={cat.slug} href={`/${cat.slug}`}
                  className="footer-cat-link"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  {cat.iconUrl
                    ? <img src={cat.iconUrl} alt="" width={20} height={20} style={{ objectFit: "contain", opacity: 0.8 }} />
                    : <span style={{ opacity: 0.6 }}>{cat.emoji}</span>
                  }
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div style={{ paddingTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ fontSize: "10px", color: "var(--ink-light)", letterSpacing: "0.06em" }}>
            Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p style={{
            fontSize: "10px", color: "var(--ink-light)",
            lineHeight: 1.8, maxWidth: 560,
          }}>
            {COUPANG_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
