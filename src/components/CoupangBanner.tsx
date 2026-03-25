import { COUPANG_DISCLAIMER } from "@/lib/constants";

interface CoupangBannerProps {
  link?: string;
  text?: string;
}

export default function CoupangBanner({
  link = "#",
  text = "쿠팡에서 최저가 확인하기",
}: CoupangBannerProps) {
  return (
    <div
      className="my-8 rounded-2xl p-6 text-center"
      style={{
        background: "linear-gradient(135deg, #fff8f0 0%, #ffe9d5 100%)",
        border: "2px dashed #ffbf94",
      }}
    >
      {/* 귀여운 상단 아이콘 */}
      <div className="text-3xl mb-3">🛒</div>

      <p className="text-sm font-bold mb-3" style={{ color: "#8b5e3c" }}>
        이 글에서 소개한 제품, 쿠팡에서 바로 확인해보세요!
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-flex items-center gap-2 rounded-2xl px-8 py-3 text-base font-extrabold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
        style={{
          background: "linear-gradient(135deg, #ff9a5c 0%, #e8724a 100%)",
          boxShadow: "0 4px 16px rgba(232,114,74,0.35)",
        }}
      >
        <span>🏷️</span>
        <span>{text}</span>
      </a>

      <p className="mt-4 text-xs" style={{ color: "#c4a090" }}>
        {COUPANG_DISCLAIMER}
      </p>
    </div>
  );
}
