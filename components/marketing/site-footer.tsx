import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/lib/nav";

/**
 * Footer — replaces the old single-line "Designed By Mindless Arts" footer.
 *
 * Removed the design credit entirely — when you sell this template to other
 * schools, that credit becomes their footer. Move credit to a portfolio
 * page on Mindless Arts' own site, link to it from your About if you want.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line bg-cream-warm">
      <div className="container-prose grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr] lg:py-20">
        {/* Wordmark + contact */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-plum font-serif text-cream">
              {site.shortName.charAt(0)}
            </span>
            <span className="font-serif text-base tracking-wide text-foreground">
              {site.name}
            </span>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
          <address className="mt-8 space-y-2 text-sm not-italic text-muted">
            <p>{site.contact.address}</p>
            <p>
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-foreground"
              >
                {site.contact.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-foreground"
              >
                {site.contact.phone}
              </a>
            </p>
          </address>
        </div>

        {/* Sitemap.
            "For parents" is first because it carries the actions returning
            visitors come back for. "Explore" sits next to it. "Connect" last. */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn
            title="For parents"
            items={[
              { label: "Result Checker", href: "/results" },
              { label: "Apply", href: "/admissions" },
              { label: "Calendar", href: "/events" },
            ]}
          />
          <FooterColumn title="Explore" items={navItems.map((i) => i)} />
          <FooterColumn
            title="Connect"
            items={[
              { label: "Instagram", href: site.social.instagram, external: true },
              { label: "Facebook", href: site.social.facebook, external: true },
            ]}
          />
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="container-prose flex flex-col items-start justify-between gap-3 py-6 text-xs text-ink-subtle sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterItem = { label: string; href: string; external?: boolean };

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly FooterItem[];
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-eyebrow text-ink-subtle">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={`${title}-${item.href}`}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
