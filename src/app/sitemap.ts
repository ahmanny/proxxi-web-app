import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/marketing/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://proxxi.app";

  const staticPages = [
    { route: "", priority: 1.0 },
    { route: "/about", priority: 0.8 },
    { route: "/contact", priority: 0.8 },
    { route: "/help", priority: 0.8 },
    { route: "/safety", priority: 0.7 },
    { route: "/report", priority: 0.7 },
    { route: "/terms", priority: 0.6 },
    { route: "/privacy", priority: 0.6 },
    { route: "/careers", priority: 0.8 },
    { route: "/blog", priority: 0.9 },
    { route: "/provider/signup", priority: 0.9 },
    { route: "/provider/dashboard", priority: 0.5 },
    { route: "/provider/earnings", priority: 0.5 },
    { route: "/provider/guidelines", priority: 0.7 },
  ];

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticSitemap = staticPages.map(({ route, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority,
  }));

  return [...staticSitemap, ...blogPosts];
}