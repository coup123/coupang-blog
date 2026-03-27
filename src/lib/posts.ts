import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  thumbnail?: string;
  slug: string;
  readingTime: string;
}

export function getAllPosts(): PostMeta[] {
  const categories = fs.readdirSync(CONTENT_DIR).filter((f) =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  );

  const posts: PostMeta[] = [];

  for (const category of categories) {
    const categoryDir = path.join(CONTENT_DIR, category);
    const files = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      posts.push({
        title: data.title,
        description: data.description,
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
        category,
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        slug,
        readingTime: readingTime(content).text,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(category: string, slug: string) {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title,
      description: data.description,
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
      category,
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      slug,
      readingTime: readingTime(content).text,
    } as PostMeta,
    content,
  };
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
