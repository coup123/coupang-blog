"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 60],
    ["rgba(255,253,232,0.92)", "rgba(250,250,247,0.98)"]
  );
  const shadow = useTransform(
    scrollY,
    [0, 60],
    ["0 0 0 rgba(0,0,0,0)", "0 1px 0 rgba(0,0,0,0.07)"]
  );

  return (
    <>
      {/* 공정위 문구 */}
      <div className="promo-bar">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를 제공받습니다
      </div>

      {/* 네비게이션 */}
      <motion.header
        style={{ background: bg, boxShadow: shadow }}
        className="site-header"
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>
          {/* 로고 */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "var(--teal)", display: "inline-block",
            }} />
            <span style={{
              fontFamily: "var(--font-sans)", fontSize: 20,
              fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em",
            }}>
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* 네비 링크 */}
          <nav style={{ display: "flex", alignItems: "center", gap: 40 }}>
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--fs-base)",
                  fontWeight: 500,
                  color: pathname === `/${cat.slug}` ? "var(--teal)" : "var(--ink-mid)",
                  transition: "color 0.2s",
                  position: "relative",
                }}
              >
                {cat.name}
                {pathname === `/${cat.slug}` && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute", bottom: -4, left: 0, right: 0,
                      height: 2, background: "var(--teal)", borderRadius: 2,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA 버튼 */}
          <Link href="/cleaning" className="btn-primary" style={{ padding: "12px 28px", fontSize: "var(--fs-sm)" }}>
            시작하기
          </Link>
        </div>
      </motion.header>
    </>
  );
}
