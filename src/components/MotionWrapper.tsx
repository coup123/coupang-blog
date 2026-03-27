"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/* ─── 공통 애니메이션 variants ────────────────────────────── */
export const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── 스크롤 진입 시 animate ──────────────────────────────── */
interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
}

export function Reveal({ children, className, style, delay = 0, variant = "fadeUp" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const variants = { fadeUp, fadeIn, scaleIn }[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── stagger 자식 컨테이너 ──────────────────────────────── */
export function StaggerReveal({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ─── stagger 자식 아이템 ─────────────────────────────────── */
export function StaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
