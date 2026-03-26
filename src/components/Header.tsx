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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 프로모 바 */}
      <div className="promo-bar">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다
      </div>

      {/* 헤더 */}
      <motion.header
        className="sticky top-0 z-50"
        animate={{
          background: scrolled
            ? "rgba(249,237,211,0.95)"
            : "rgba(249,237,211,0.88)",
          height: scrolled ? 56 : 72,
          borderBottomColor: scrolled
            ? "rgba(180,150,100,0.3)"
            : "rgba(180,150,100,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid",
        }}
      >
        <nav
          className="flex items-center justify-between h-full"
          style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 24px" }}
        >
          {/* 로고 */}
          <motion.div whileHover={{ opacity: 0.6 }} transition={{ duration: 0.15 }}>
            <Link href="/" style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: scrolled ? 18 : 22,
              fontWeight: 800,
              color: "var(--text-dark)",
              letterSpacing: "-0.02em",
              transition: "font-size 0.35s",
            }}>
              {SITE_CONFIG.name}
            </Link>
          </motion.div>

          {/* 데스크탑 네비 */}
          <div className="hidden md:flex items-center gap-8">
            {Object.values(CATEGORIES).map((cat) => {
              const isActive = pathname === `/${cat.slug}` || pathname.startsWith(`/${cat.slug}/`);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  style={{
                    fontSize: "var(--fs-sm)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: isActive ? "var(--text-dark)" : "var(--text-med)",
                    position: "relative",
                  }}
                >
                  {cat.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: -4, left: 0, right: 0,
                        height: 2,
                        background: "linear-gradient(90deg, var(--gold), #f0d080)",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 우측 */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hidden md:block" style={{
              fontSize: "var(--fs-xs)", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              color: "var(--text-light)",
              transition: "opacity 0.2s",
            }}>
              Admin
            </Link>

            {/* 모바일 햄버거 */}
            <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
              <motion.div
                animate={menuOpen ? "open" : "closed"}
                style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}
              >
                <motion.span
                  style={{ display: "block", width: 22, height: 2, background: "var(--text-dark)", transformOrigin: "left" }}
                  variants={{ open: { rotate: 45, y: -1 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  style={{ display: "block", width: 22, height: 2, background: "var(--text-dark)" }}
                  variants={{ open: { opacity: 0, x: -6 }, closed: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  style={{ display: "block", width: 22, height: 2, background: "var(--text-dark)", transformOrigin: "left" }}
                  variants={{ open: { rotate: -45, y: 1 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* 모바일 메뉴 드로어 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "sticky", top: 56, zIndex: 49,
              background: "linear-gradient(160deg, #fdf6e8, #f4e8cd)",
              borderTop: "1px solid rgba(180,150,100,0.2)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column" as const, gap: 20 }}>
              {Object.values(CATEGORIES).map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.25 }}
                >
                  <Link
                    href={`/${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: "'Nanum Myeongjo', serif",
                      fontSize: "var(--fs-xl)", fontWeight: 800,
                      color: "var(--text-dark)", letterSpacing: "-0.01em",
                    }}
                  >
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
