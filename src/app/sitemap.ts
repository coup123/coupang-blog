import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = Object.keys(CATEGORIES).map((cat) => ({
    url: `${SITE_CONFIG.url}/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryUrls,
    ...postUrls,
  ];
}
