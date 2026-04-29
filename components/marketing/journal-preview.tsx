import Link from "next/link";
import { getLatestPosts } from "@/content/posts";
import { formatPostDate } from "@/lib/dates";

/**
 * Homepage journal preview. The blog is empty for launch — this section
 * gracefully handles 0/1/2/3+ posts without looking broken.
 *
 * Once Payload arrives in phase 2, getLatestPosts becomes an async fetch
 * to the CMS API. Nothing here changes.
 */
export async function JournalPreview() {
  const posts = await getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="container-prose py-24 lg:py-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">From the journal</p>
          <h2 className="font-serif text-display-lg text-foreground">
            Writing on teaching, parenting, and growing up well.
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 self-start border-b border-accent pb-1 text-sm text-foreground transition-colors hover:text-accent"
        >
          Read the journal
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug}>
            <p className="text-xs uppercase tracking-eyebrow text-ink-subtle">
              {formatPostDate(post.publishedAt)}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-accent"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <p className="mt-4 text-sm text-ink-subtle">By {post.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
