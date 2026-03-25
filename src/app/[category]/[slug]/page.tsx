import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { CATEGORIES, COUPANG_DISCLAIMER } from "@/lib/constants";
import { MDXRemote } from "@/components/mdx/MDXRemote";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) notFound();

  const cat = CATEGORIES[post.meta.category];

  return (
    <>
      {/* ─── 아티클 히어로 ────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(180deg, #fbfbfd 0%, #ffffff 100%)",
          paddingTop: 60,
          paddingBottom: 60,
          borderBottom: "1px solid rgba(210,210,215,0.4)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          {/* 브레드크럼 */}
          <div
            className="flex items-center justify-center gap-2 mb-6"
            style={{ fontSize: "var(--fs-xs)", color: "var(--apple-text-ter)" }}
          >
            <Link href="/" className="transition-colors hover:text-[#0066cc]">홈</Link>
            <span>›</span>
            <Link href={`/${category}`} className="transition-colors hover:text-[#0066cc]">
              {cat?.iconUrl ? (
                <span className="inline-flex items-center gap-1">
                  <Image src={cat.iconUrl} alt="" width={12} height={12} className="object-contain" />
                  {cat.name}
                </span>
              ) : (
                <span>{cat?.name}</span>
              )}
            </Link>
          </div>

          {/* eyebrow */}
          <p className="text-eyebrow mb-4">{cat?.name}</p>

          {/* 제목 */}
          <h1
            className="font-semibold mb-4 mx-auto"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              color: "var(--apple-text)",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              maxWidth: 720,
            }}
          >
            {post.meta.title}
          </h1>

          {/* 설명 */}
          <p
            className="text-body mx-auto mb-6"
            style={{ maxWidth: 580, fontSize: "var(--fs-label)", lineHeight: 1.6 }}
          >
            {post.meta.description}
          </p>

          {/* 메타 */}
          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ fontSize: "var(--fs-xs)", color: "var(--apple-text-ter)" }}
          >
            <time>{post.meta.date}</time>
            {post.meta.readingTime && (
              <>
                <span>·</span>
                <span>{post.meta.readingTime}</span>
              </>
            )}
            {post.meta.tags?.map((tag) => (
              <span key={tag} className="apple-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 썸네일 ───────────────────────────────────── */}
      {post.meta.thumbnail && (
        <div
          style={{
            background: "#f5f5f7",
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <div className="container" style={{ maxWidth: 900 }}>
            <div
              style={{
                borderRadius: "var(--card-radius)",
                overflow: "hidden",
                aspectRatio: "16/9",
                position: "relative",
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
              }}
            >
              <Image
                src={post.meta.thumbnail}
                alt={post.meta.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── 본문 ─────────────────────────────────────── */}
      <section style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="prose max-w-none">
            <MDXRemote source={post.content} />
          </div>

          {/* 공정위 문구 */}
          <div
            className="mt-12 pt-6"
            style={{ borderTop: "1px solid rgba(210,210,215,0.64)" }}
          >
            <p
              className="text-caption text-center"
              style={{ color: "var(--apple-text-ter)" }}
            >
              {COUPANG_DISCLAIMER}
            </p>
          </div>

          {/* 카테고리로 돌아가기 */}
          <div className="flex justify-center mt-8">
            <Link href={`/${category}`} className="btn-apple-outline">
              {cat?.name} 더보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
