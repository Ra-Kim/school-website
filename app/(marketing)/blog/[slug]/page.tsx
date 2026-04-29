import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/page-header";
import { getPostBySlug, getPosts } from "@/content/posts";
import { formatPostDate } from "@/lib/dates";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <div className="container-prose pt-12">
        <Link
          href="/blog"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All posts
        </Link>
      </div>

      <PageHeader title={post.title} />

      <article className="container-prose pb-24">
        <p className="mb-12 text-xs uppercase tracking-eyebrow text-ink-subtle">
          {formatPostDate(post.publishedAt)} · By {post.author}
        </p>
        <div className="mx-auto max-w-prose space-y-6 text-lg leading-relaxed text-muted">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i} className="text-foreground/85">
              {para}
            </p>
          ))}
        </div>

        {/* For now bodies are plain markdown strings rendered as paragraphs.
            When you upgrade to MDX or react-markdown later, swap this block. */}
      </article>
    </>
  );
}
