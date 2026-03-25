"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.85)"
          : "rgba(255,255,255,0.92)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(210,210,215,0.5)"
          : "1px solid rgba(210,210,215,0.3)",
      }}
    >
      <nav
        className="flex items-center justify-between"
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "0 24px",
          height: 52,
        }}
      >
        {/* 로고 */}
        <Link
          href="/"
          className="shrink-0 font-semibold transition-opacity hover:opacity-70"
          style={{ fontSize: 19, color: "var(--apple-text)", letterSpacing: "-0.01em" }}
        >
          {SITE_CONFIG.name}
        </Link>

        {/* 카테고리 네비 — Apple 스타일 (중앙 정렬) */}
        <div className="flex items-center gap-1">
          {Object.values(CATEGORIES).map((cat) => {
            const isActive =
              pathname === `/${cat.slug}` ||
              pathname.startsWith(`/${cat.slug}/`);
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="relative px-3 py-1.5 rounded-lg transition-all"
                style={{
                  fontSize: "var(--fs-sm)",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--apple-text)" : "var(--apple-text-sec)",
                  background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                }}
              >
                {cat.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <span className="flex items-center gap-1.5">
                    <img src={cat.iconUrl} alt="" width={16} height={16} style={{ objectFit: "contain" }} />
                    {cat.name}
                  </span>
                ) : (
                  cat.name
                )}
              </Link>
            );
          })}
        </div>

        {/* 관리자 링크 */}
        <Link
          href="/admin"
          className="shrink-0 transition-opacity hover:opacity-70"
          style={{
            fontSize: "var(--fs-xs)",
            color: "var(--apple-text-ter)",
            background: "rgba(0,0,0,0.05)",
            padding: "5px 12px",
            borderRadius: 980,
          }}
        >
          관리
        </Link>
      </nav>
    </header>
  );
}
