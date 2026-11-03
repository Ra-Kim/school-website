import Link from "next/link";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { WhatsAppButton } from "@/components/marketing/whatsapp-button";

/**
 * Root 404. Unknown URLs never enter the (marketing) group, so this
 * renders the header and footer itself to keep visitors on the site.
 */
const shortcuts = [
  { label: "Admissions", href: "/admissions" },
  { label: "Result Checker", href: "/results" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="container-prose flex-1 py-24 lg:py-32">
        <p className="eyebrow mb-6">Page not found</p>
        <h1 className="font-serif text-display-xl text-foreground">
          This page has <span className="italic text-accent">moved</span> or
          never existed.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Try one of these instead, or head back to the homepage.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-plum px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-plum-deep"
          >
            Back to homepage
          </Link>
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-md border border-plum/30 px-5 py-3 text-sm text-foreground transition-colors hover:border-plum hover:bg-plum hover:text-cream"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
