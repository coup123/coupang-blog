export const SITE_CONFIG = {
  name: "생활꿀팁",
  description: "청소, 요리 등 생활 속 꿀팁과 추천 제품 정보",
  url: "https://coupang-inky.vercel.app",
  author: "생활꿀팁",
} as const;

export const CATEGORIES = {
  cleaning: { name: "청소/정리", emoji: "🧹", slug: "cleaning" },
  cooking: { name: "요리/레시피", emoji: "🍳", slug: "cooking" },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const COUPANG_DISCLAIMER =
  "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";
