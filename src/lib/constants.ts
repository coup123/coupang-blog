export const SITE_CONFIG = {
  name: "생활꿀팁",
  description: "청소, 건강, 요리 — 매일의 살림을 더 스마트하게",
  url: "https://coupang-inky.vercel.app",
  author: "생활꿀팁",
} as const;

export const CATEGORIES: Record<string, {
  name: string;
  emoji: string;
  slug: string;
  description: string;
  iconUrl?: string;
  color: { bg: string; text: string; border: string; accent: string };
}> = {
  cleaning: {
    name: "청소방법",
    emoji: "🧹",
    slug: "cleaning",
    description: "집 안 구석구석 청소 노하우",
    iconUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f9f9/512.png",
    color: { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7", accent: "#43a047" },
  },
  health: {
    name: "건강루틴",
    emoji: "💊",
    slug: "health",
    description: "매일 챙기는 건강 습관과 영양제",
    iconUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f48a/512.png",
    color: { bg: "#e3f2fd", text: "#1565c0", border: "#90caf9", accent: "#1e88e5" },
  },
  cooking: {
    name: "음식레시피",
    emoji: "🍳",
    slug: "cooking",
    description: "쉽고 맛있는 집밥 레시피",
    iconUrl: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f373/512.png",
    color: { bg: "#fff3e0", text: "#e65100", border: "#ffcc80", accent: "#fb8c00" },
  },
};

export type CategoryKey = keyof typeof CATEGORIES;

export const COUPANG_DISCLAIMER =
  "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";
