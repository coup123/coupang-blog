"use client";

import { useState } from "react";
import Image from "next/image";

const CATEGORIES_META = [
  { key: "cleaning", name: "청소방법", emoji: "🧹", defaultPath: "public/icons/cleaning.png" },
  { key: "health",   name: "건강루틴",  emoji: "💊", defaultPath: "public/icons/health.png" },
  { key: "cooking",  name: "음식레시피", emoji: "🍳", defaultPath: "public/icons/cooking.png" },
];

interface UploadState {
  file: File | null;
  preview: string | null;
  status: "idle" | "uploading" | "success" | "error";
  message: string;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin1234";

  const [uploads, setUploads] = useState<Record<string, UploadState>>(
    Object.fromEntries(
      CATEGORIES_META.map((c) => [c.key, { file: null, preview: null, status: "idle", message: "" }])
    )
  );

  function handleLogin() {
    if (adminPw === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  }

  function handleFileChange(catKey: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setUploads((prev) => ({
      ...prev,
      [catKey]: { file, preview, status: "idle", message: "" },
    }));
  }

  async function handleUpload(catKey: string) {
    const up = uploads[catKey];
    if (!up.file) return alert("파일을 선택하세요.");
    if (!token) return alert("GitHub Personal Access Token을 입력하세요.");

    setUploads((prev) => ({
      ...prev,
      [catKey]: { ...prev[catKey], status: "uploading", message: "업로드 중..." },
    }));

    try {
      // 1. 파일 → base64
      const base64 = await fileToBase64(up.file);

      // 2. GitHub API: 기존 파일 SHA 조회 (있으면 업데이트, 없으면 생성)
      const filePath = `public/icons/${catKey}.png`;
      const apiUrl = `https://api.github.com/repos/coup123/coupang-blog/contents/${filePath}`;

      let sha: string | undefined;
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      });
      if (getRes.ok) {
        const existing = await getRes.json();
        sha = existing.sha;
      }

      // 3. 파일 커밋 (create or update)
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `feat: ${catKey} 카테고리 아이콘 업데이트`,
          content: base64,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!putRes.ok) {
        const err = await putRes.json();
        throw new Error(err.message || "GitHub API 오류");
      }

      // 4. constants.ts 업데이트 — iconUrl 추가
      await updateConstantsIconUrl(catKey, `/icons/${catKey}.png`, token);

      setUploads((prev) => ({
        ...prev,
        [catKey]: {
          ...prev[catKey],
          status: "success",
          message: "✅ 업로드 완료! Vercel이 자동 배포됩니다 (약 1~2분 소요)",
        },
      }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      setUploads((prev) => ({
        ...prev,
        [catKey]: { ...prev[catKey], status: "error", message: `❌ 오류: ${msg}` },
      }));
    }
  }

  async function updateConstantsIconUrl(catKey: string, iconUrl: string, token: string) {
    const filePath = "src/lib/constants.ts";
    const apiUrl = `https://api.github.com/repos/coup123/coupang-blog/contents/${filePath}`;

    // 현재 파일 내용 + SHA 가져오기
    const getRes = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    });
    if (!getRes.ok) throw new Error("constants.ts 조회 실패");
    const fileData = await getRes.json();
    const currentContent = atob(fileData.content.replace(/\n/g, ""));

    // iconUrl: undefined → iconUrl: "/icons/xxx.png" 로 교체
    const regex = new RegExp(
      `(${catKey}:[^}]*?iconUrl:\\s*)undefined`,
      "s"
    );
    const updated = currentContent.replace(regex, `$1"${iconUrl}"`);

    if (updated === currentContent) return; // 변경 없음

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `feat: ${catKey} 카테고리 iconUrl 설정`,
        content: btoa(unescape(encodeURIComponent(updated))),
        sha: fileData.sha,
      }),
    });
    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(`constants.ts 업데이트 실패: ${err.message}`);
    }
  }

  // ─── Login Screen ───────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f5f5" }}>
        <div
          className="rounded-2xl p-10 w-full max-w-sm"
          style={{ background: "#fff", border: "1px solid #eee", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        >
          <div className="text-center mb-8">
            <p className="text-2xl mb-2">🔐</p>
            <h1 className="text-xl font-extrabold" style={{ color: "#111" }}>관리자 로그인</h1>
            <p className="text-sm mt-1" style={{ color: "#999" }}>생활꿀팁 관리자 페이지</p>
          </div>
          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={adminPw}
            onChange={(e) => setAdminPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3"
            style={{ border: "1.5px solid #eee", background: "#fafafa" }}
          />
          <button
            onClick={handleLogin}
            className="btn-green w-full justify-center py-3 rounded-xl text-sm"
          >
            로그인
          </button>
          <p className="text-xs text-center mt-4" style={{ color: "#bbb" }}>
            기본 비밀번호: admin1234<br />
            (환경변수 NEXT_PUBLIC_ADMIN_PASSWORD로 변경)
          </p>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      {/* 관리자 헤더 */}
      <div
        className="sticky top-0 z-50"
        style={{ background: "#fff", borderBottom: "2px solid #15A775" }}
      >
        <div className="mx-auto max-w-3xl px-5 flex items-center justify-between" style={{ height: 64 }}>
          <div>
            <span className="font-extrabold" style={{ color: "#111" }}>⚙️ 관리자 페이지</span>
            <span className="ml-2 text-xs" style={{ color: "#999" }}>생활꿀팁</span>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{ background: "#f3f3f3", color: "#666" }}
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10">

        {/* GitHub Token 입력 */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "#fff", border: "1px solid #eee" }}
        >
          <h2 className="font-bold mb-1" style={{ fontSize: "0.95rem", color: "#111" }}>
            🔑 GitHub Personal Access Token
          </h2>
          <p className="text-xs mb-3" style={{ color: "#999" }}>
            이미지 업로드 시 GitHub에 직접 커밋합니다. repo 권한이 있는 Fine-grained PAT을 입력하세요.
          </p>
          <input
            type="password"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ border: "1.5px solid #eee", background: "#fafafa", fontFamily: "monospace" }}
          />
          <p className="text-xs mt-2" style={{ color: "#bbb" }}>
            ※ 토큰은 이 페이지에만 임시 저장되며 어디에도 전송되지 않습니다.
          </p>
        </div>

        {/* 카테고리 아이콘 업로드 */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "#fff", border: "1px solid #eee" }}
        >
          <h2 className="font-bold mb-1" style={{ fontSize: "0.95rem", color: "#111" }}>
            🖼️ 카테고리 아이콘 업로드
          </h2>
          <p className="text-xs mb-6" style={{ color: "#999" }}>
            PNG/JPG/SVG 권장 · 업로드 즉시 GitHub 커밋 → Vercel 자동 배포 (1~2분 소요)
          </p>

          <div className="flex flex-col gap-5">
            {CATEGORIES_META.map((cat) => {
              const up = uploads[cat.key];
              return (
                <div
                  key={cat.key}
                  className="flex items-center gap-5 p-4 rounded-xl"
                  style={{ background: "#fafafa", border: "1px solid #eee" }}
                >
                  {/* 프리뷰 */}
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl overflow-hidden"
                    style={{
                      width: 72, height: 72,
                      background: up.preview ? "#fff" : "#f0f9f4",
                      border: "1.5px solid #d4f0e4",
                    }}
                  >
                    {up.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={up.preview} alt={cat.name} style={{ width: 52, height: 52, objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: "2rem" }}>{cat.emoji}</span>
                    )}
                  </div>

                  {/* 정보 + 업로드 */}
                  <div className="flex-1">
                    <p className="font-bold text-sm mb-0.5" style={{ color: "#111" }}>{cat.name}</p>
                    <p className="text-xs mb-2" style={{ color: "#999" }}>/{cat.defaultPath}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <label
                        className="cursor-pointer text-xs px-3 py-1.5 rounded-lg font-semibold"
                        style={{ background: "#f3f3f3", color: "#555", border: "1px solid #e8e8e8" }}
                      >
                        파일 선택
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(cat.key, e)}
                        />
                      </label>

                      {up.file && (
                        <>
                          <span className="text-xs" style={{ color: "#999" }}>{up.file.name}</span>
                          <button
                            onClick={() => handleUpload(cat.key)}
                            disabled={up.status === "uploading"}
                            className="btn-green text-xs px-4 py-1.5"
                          >
                            {up.status === "uploading" ? "업로드 중..." : "GitHub에 업로드"}
                          </button>
                        </>
                      )}
                    </div>

                    {up.message && (
                      <p
                        className="mt-2 text-xs font-medium"
                        style={{ color: up.status === "success" ? "#15A775" : up.status === "error" ? "#e53e3e" : "#888" }}
                      >
                        {up.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 사이트 바로가기 */}
        <div className="flex gap-3">
          <a
            href="/"
            className="btn-green text-sm px-5 py-2.5"
            style={{ borderRadius: 10 }}
          >
            ← 사이트 홈 보기
          </a>
          <a
            href="https://vercel.com/goo19421-1501s-projects/coupang/deployments"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-5 py-2.5 rounded-[10px] font-semibold"
            style={{ background: "#f3f3f3", color: "#555" }}
          >
            Vercel 배포 현황 →
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── 유틸 ────────────────────────────────────────────
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // data:image/png;base64,XXXX → XXXX 만 추출
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
