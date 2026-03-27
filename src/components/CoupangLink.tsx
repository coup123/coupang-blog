import { COUPANG_DISCLAIMER } from "@/lib/constants";

interface CoupangLinkProps {
  href?: string;
  children: React.ReactNode;
}

// 텍스트 안에 인라인으로 쓰는 쿠팡 링크
// 사용법: <CoupangLink href="[쿠팡링크]">과탄산소다</CoupangLink>
export default function CoupangLink({ href = "#", children }: CoupangLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-0.5 font-bold transition-colors hover:underline"
      style={{ color: "#e8724a" }}
    >
      {children}
      <span
        className="text-xs px-1.5 py-0.5 rounded-full font-bold"
        style={{ background: "#fff0e6", color: "#e8724a", border: "1px solid #ffd4b2", fontSize: "10px" }}
      >
        쿠팡
      </span>
    </a>
  );
}
