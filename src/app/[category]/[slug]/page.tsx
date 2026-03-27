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
          background: "var(--bg-teal)",
          paddingTop: 64,
          paddingBottom: 64,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          {/* 브레드크럼 */}
          <div
            className="flex items-center gap-2 mb-8"
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <Link href="/" className="breadcrumb-link">홈</Link>
            <span>›</span>
            <Link href={`/${category}`} className="breadcrumb-link">{cat?.name}</Link>
          </div>

          {/* 카테고리 레이블 */}
          <div className="section-line-white" />
          <p
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 16,
            }}
          >
            {cat?.name}
          </p>

          {/* 제목 */}
          <h1
            style={{
              fontFamily: "'Nanum Myeongjo', serif",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 800,
              color: "var(--text-white)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {post.meta.title}
          </h1>

          {/* 설명 */}
          <p
            style={{
              fontSize: "var(--fs-md)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 600,
              marginBottom: 28,
            }}
          >
            {post.meta.description}
          </p>

          {/* 메타 */}
          <div
            className="flex items-center gap-4 flex-wrap"
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <time>{post.meta.date}</time>
            {post.meta.readingTime && (
              <>
                <span>·</span>
                <span>{post.meta.readingTime}</span>
              </>
            )}
            {post.meta.tags?.map((tag) => (
              <span key={tag} className="tag-dark">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 썸네일 ───────────────────────────────────── */}
      {post.meta.thumbnail && (
        <div style={{ background: "var(--bg-teal-dark)" }}>
          <div className="container" style={{ maxWidth: 900, paddingTop: 0, paddingBottom: 0 }}>
            <div
              style={{
                aspectRatio: "16/9",
                position: "relative",
                overflow: "hidden",
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
      <section
        style={{
          background: "var(--bg-yellow)",
          paddingTop: 64,
          paddingBottom: 80,
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="prose max-w-none">
            <MDXRemote source={post.content} />
          </div>

          {/* 공정위 문구 */}
          <div
            className="mt-12 pt-6"
            style={{ borderTop: "1px solid var(--border-cream)" }}
          >
            <p
              className="text-caption text-center"
              style={{ color: "var(--text-light)", lineHeight: 1.8 }}
            >
              {COUPANG_DISCLAIMER}
            </p>
          </div>

          {/* 카테고리로 돌아가기 */}
          <div className="flex justify-center mt-10">
            <Link href={`/${category}`} className="btn-outline-dark">
              {cat?.name} 더보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
