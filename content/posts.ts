/**
 * Blog posts. Same pattern as events — file-driven now, CMS-driven later.
 * Bodies are markdown strings; render with react-markdown or MDX when you
 * wire up the [slug] route fully.
 */

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

const posts: Post[] = [
  {
    slug: "welcome-to-our-journal",
    title: "Welcome to our journal",
    excerpt:
      "A note on what we'll be writing about here, and why we think it matters.",
    body: `This is the school's journal — a space for staff, students, and the head of school to write about teaching, parenting, and the work of growing up well.

We'll publish slowly and carefully. We'd rather have one essay a month worth reading than five posts a week worth scrolling past.`,
    publishedAt: "2026-04-01T09:00:00+01:00",
    author: "The Head of School",
    tags: ["welcome"],
  },
];

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  return (await getPosts()).slice(0, limit);
}
