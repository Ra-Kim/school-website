import type { MetadataRoute } from "next";
import { getEvents } from "@/content/events";
import { getPosts } from "@/content/posts";

/**
 * Sitemap. Next.js generates /sitemap.xml from this. Submit it to
 * Google Search Console once the site is live.
 *
 * Set NEXT_PUBLIC_SITE_URL in .env (and in Vercel/host env vars).
 */
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourschool.edu.ng";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [events, posts] = await Promise.all([getEvents(), getPosts()]);

  const staticRoutes = [
    "",
    "/about",
    "/admissions",
    "/results",
    "/events",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${BASE}/events/${e.slug}`,
    lastModified: new Date(e.startsAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes, ...postRoutes];
}
