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
      <section style={{
        background: "var(--cream)",
        paddingTop: 140,
        paddingBottom: 64,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {/* 브레드크럼 */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 32,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-xs)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
          }}>
            <Link href="/" style={{ color: "var(--ink-light)", transition: "color 0.2s" }}>홈</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <Link href={`/${category}`} style={{ color: "var(--ink-light)", transition: "color 0.2s" }}>{cat?.name}</Link>
          </div>

          {/* 카테고리 레이블 */}
          <p className="t-label" style={{ marginBottom: 20 }}>{cat?.name}</p>

          {/* 제목 */}
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 900,
            color: "var(--ink)",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            {post.meta.title}
          </h1>

          {/* 설명 */}
          {post.meta.description && (
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-md)",
              lineHeight: 1.8,
              color: "var(--ink-light)",
              maxWidth: 600,
              marginBottom: 28,
              fontWeight: 400,
            }}>
              {post.meta.description}
            </p>
          )}

          {/* 메타 */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-xs)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: "var(--ink-muted)",
          }}>
            <time>{post.meta.date}</time>
            {post.meta.tags?.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 썸네일 ───────────────────────────────────── */}
      {post.meta.thumbnail && (
        <div style={{ background: "var(--white-pure)" }}>
          <div className="container" style={{ maxWidth: 900, paddingTop: 0, paddingBottom: 0 }}>
            <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
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
      <section style={{
        background: "var(--white-pure)",
        paddingTop: 64,
        paddingBottom: 80,
      }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="prose">
            <MDXRemote source={post.content} />
          </div>

          {/* 공정위 문구 */}
          <div style={{
            marginTop: 48, paddingTop: 24,
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-xs)",
              color: "var(--ink-muted)",
              lineHeight: 1.8,
              textAlign: "center",
            }}>
              {COUPANG_DISCLAIMER}
            </p>
          </div>

          {/* 카테고리로 돌아가기 */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <Link href={`/${category}`} className="btn-outline">
              {cat?.name} 더보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
