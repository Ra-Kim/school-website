/**
 * Blog posts, sourced live from the Schola API (see lib/schola.ts). Bodies
 * are markdown strings; render with react-markdown or MDX when you wire up
 * the [slug] route fully.
 */

import {
  fetchAllScholaPosts,
  fetchScholaPost,
  fetchScholaPostsPage,
  type ScholaPost,
} from "@/lib/schola";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  publishedAt: string; // ISO
  author: string;
  cover?: string;
  tags: string[];
};

function mapPost(post: ScholaPost): Post {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    publishedAt: post.published_at,
    author: post.author?.name ?? "The school",
    cover: post.cover_url ?? undefined,
    tags: post.tags,
  };
}

export async function getPosts(): Promise<Post[]> {
  const posts = await fetchAllScholaPosts();
  return posts.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await fetchScholaPost(slug);
  return post ? mapPost(post) : null;
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  const page = await fetchScholaPostsPage({ limit });
  return page.data.map(mapPost);
}
