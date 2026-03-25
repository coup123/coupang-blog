"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── 상단 프로모 바 ────────────────────────────── */}
      <div className="promo-bar">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다
      </div>

      {/* ─── 메인 헤더 ─────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 transition-all duration-400"
        style={{
          background: scrolled
            ? "rgba(249,237,211,0.96)"
            : "rgba(249,237,211,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(180,150,100,0.3)"
            : "1px solid transparent",
        }}
      >
        <nav
          className="flex items-center justify-between"
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "0 24px",
            height: 72,
          }}
        >
          {/* 로고 */}
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-60"
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: 22,
              fontWeight: 800,
              color: "var(--text-dark)",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_CONFIG.name}
          </Link>

          {/* 데스크탑 카테고리 네비 */}
          <div className="hidden md:flex items-center gap-8">
            {Object.values(CATEGORIES).map((cat) => {
              const isActive =
                pathname === `/${cat.slug}` ||
                pathname.startsWith(`/${cat.slug}/`);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="relative transition-all duration-200"
                  style={{
                    fontSize: "var(--fs-sm)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--text-dark)" : "var(--text-med)",
                  }}
                >
                  {cat.name}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        width: "100%",
                        height: 2,
                        background: "var(--gold)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 우측 액션 */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="hidden md:block transition-opacity hover:opacity-60"
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-light)",
              }}
            >
              Admin
            </Link>

            {/* 모바일 햄버거 */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴"
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "var(--text-dark)",
                  transition: "all 0.2s",
                  transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "var(--text-dark)",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "var(--text-dark)",
                  transition: "all 0.2s",
                  transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* 모바일 드로어 */}
        {menuOpen && (
          <div
            style={{
              background: "var(--bg-cream)",
              borderTop: "1px solid var(--border-cream)",
              padding: "24px",
            }}
          >
            <div className="flex flex-col gap-5">
              {Object.values(CATEGORIES).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "var(--fs-lg)",
                    fontWeight: 700,
                    fontFamily: "'Nanum Myeongjo', serif",
                    color: "var(--text-dark)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
