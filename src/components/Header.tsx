"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 프로모 바 */}
      <div className="promo-bar" style={{ fontSize: "11px" }}>
        이 포스팅은 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를 제공받습니다
      </div>

      {/* 헤더 */}
      <motion.header
        className="sticky top-0 z-50"
        animate={{
          background: scrolled ? "rgba(255,249,201,0.98)" : "rgba(255,249,201,0.94)",
          borderBottomColor: scrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)",
          height: scrolled ? 58 : 74,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid",
        }}
      >
        <nav
          className="flex items-center justify-between h-full"
          style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 40px" }}
        >
          {/* 로고 */}
          <motion.div whileHover={{ opacity: 0.65 }} transition={{ duration: 0.15 }}>
            <Link href="/" style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: scrolled ? 17 : 20,
              fontWeight: 800,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              transition: "font-size 0.3s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <span style={{
                display: "inline-block", width: 8, height: 8,
                background: "var(--teal)", borderRadius: "50%",
              }} />
              {SITE_CONFIG.name}
            </Link>
          </motion.div>

          {/* 데스크탑 네비 */}
          <div className="hidden md:flex items-center gap-10">
            {Object.values(CATEGORIES).map((cat) => {
              const isActive = pathname === `/${cat.slug}` || pathname.startsWith(`/${cat.slug}/`);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  style={{
                    fontSize: "var(--fs-xs)",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: isActive ? "var(--teal)" : "var(--ink-light)",
                    position: "relative",
                    transition: "color 0.2s",
                    paddingBottom: 2,
                  }}
                >
                  {cat.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: -2, left: 0, right: 0,
                        height: 2,
                        background: "var(--teal)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 우측 */}
          <div className="flex items-center gap-5">
            {/* 전체글 CTA */}
            <Link href="/cleaning" className="hidden md:block" style={{
              fontSize: "var(--fs-xs)", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              color: "#fff",
              background: "var(--teal)",
              padding: "8px 18px",
              transition: "background 0.2s",
            }}>
              시작하기
            </Link>

            {/* 모바일 햄버거 */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴"
              style={{ padding: 4 }}>
              <motion.div
                animate={menuOpen ? "open" : "closed"}
                style={{ display: "flex", flexDirection: "column" as const, gap: 5, width: 22 }}
              >
                <motion.span style={{ display: "block", height: 2, background: "var(--ink)", transformOrigin: "left", borderRadius: 2 }}
                  variants={{ open: { rotate: 45, y: -1 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.2 }} />
                <motion.span style={{ display: "block", height: 2, background: "var(--ink)", borderRadius: 2 }}
                  variants={{ open: { opacity: 0, x: -6 }, closed: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.2 }} />
                <motion.span style={{ display: "block", height: 2, background: "var(--ink)", transformOrigin: "left", borderRadius: 2 }}
                  variants={{ open: { rotate: -45, y: 1 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.2 }} />
              </motion.div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* 모바일 드로어 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "sticky", top: 58, zIndex: 49,
              background: "var(--yellow)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "32px 24px 28px", display: "flex", flexDirection: "column" as const, gap: 28 }}>
              {Object.values(CATEGORIES).map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                >
                  <Link
                    href={`/${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'Nanum Myeongjo', serif",
                      fontSize: "var(--fs-2xl)", fontWeight: 800,
                      color: "var(--ink)", letterSpacing: "-0.01em",
                      display: "flex", alignItems: "center", gap: 12,
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{cat.emoji}</span>
                    {cat.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
