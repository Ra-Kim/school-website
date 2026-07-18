import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/page-header";
import { getPosts } from "@/content/posts";
import { formatPostDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Journal",
  description: "Writing on teaching, parenting, and growing up well.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="The journal"
        title="Writing from the school."
        intro="Essays from staff and the head of school. Published slowly, read carefully."
      />

      <section className="container-prose pb-24 lg:pb-32">
        {posts.length === 0 ? (
          <p className="text-base text-muted">
            We&apos;re just getting started. The first essays will appear here soon.
          </p>
        ) : (
          <ul className="divide-y divide-ink-line border-y border-ink-line">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-10 transition-colors hover:bg-cream-warm"
                >
                  <p className="text-xs uppercase tracking-eyebrow text-ink-subtle">
                    {formatPostDate(post.publishedAt)} · {post.author}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl text-foreground transition-colors group-hover:text-accent lg:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
