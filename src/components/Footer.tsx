import { COUPANG_DISCLAIMER, SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f5f5f7",
        borderTop: "1px solid rgba(210,210,215,0.64)",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <div className="container">
        {/* 상단 링크 */}
        <div
          className="flex flex-wrap gap-x-8 gap-y-2 mb-6 pb-6"
          style={{ borderBottom: "1px solid rgba(210,210,215,0.64)" }}
        >
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="transition-colors hover:underline"
              style={{ fontSize: "var(--fs-sm)", color: "var(--apple-text-sec)" }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* 저작권 + 공정위 */}
        <div className="flex flex-col gap-2">
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--apple-text-ter)", lineHeight: 1.6 }}>
            Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--apple-text-ter)", lineHeight: 1.6, maxWidth: 600 }}>
            {COUPANG_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}
