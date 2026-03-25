import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 이미지 도메인 (필요시 추가)
    remotePatterns: [],
    // public/icons 등 로컬 이미지 최적화 허용
  },
  // 관리자 페이지 SSG 제외 (동적 클라이언트 컴포넌트)
  trailingSlash: false,
};

export default nextConfig;
