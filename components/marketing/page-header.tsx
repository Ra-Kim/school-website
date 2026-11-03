import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourschool.edu.ng";

type Crumb = { label: string; href: string };

/**
 * Used by every inner page to keep header treatment consistent. Accepts
 * an optional eyebrow (small kicker line) and intro paragraph.
 *
 * Breadcrumbs: Home › [parent] › [crumb ?? eyebrow]. The last crumb is
 * the current page, so it isn't a link. Also emits BreadcrumbList
 * JSON-LD so Google can show the trail in search results.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumb,
  parent,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Breadcrumb label for this page. Defaults to the eyebrow. */
  crumb?: string;
  /** Optional middle crumb, e.g. Admissions for Book a visit. */
  parent?: Crumb;
}) {
  const current = crumb ?? eyebrow;
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...(parent ? [parent] : [])];

  const jsonLd = current && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [...trail, { label: current, href: "" }].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${BASE}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <header className="container-prose pb-16 pt-10 lg:pb-24 lg:pt-16">
      {current && (
        <nav aria-label="Breadcrumb" className="mb-10 lg:mb-14">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-subtle">
            {trail.map((c) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <Link href={c.href} className="transition-colors hover:text-accent">
                  {c.label}
                </Link>
                <ChevronRight aria-hidden className="h-3 w-3" />
              </li>
            ))}
            <li aria-current="page" className="text-foreground">
              {current}
            </li>
          </ol>
        </nav>
      )}
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      <h1 className="font-serif text-display-lg text-foreground lg:text-display-xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
          {intro}
        </p>
      )}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </header>
  );
}
