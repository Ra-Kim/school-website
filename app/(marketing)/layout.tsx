import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SchoolJsonLd } from "@/components/seo/school-jsonld";

/**
 * Route group: (marketing)
 *
 * Contains every page a logged-out visitor sees: home, about, admissions,
 * events, blog, contact. Wraps them in the public header and footer.
 *
 * The eventual (platform) route group will have its own layout with the
 * authenticated app shell — they live side-by-side without colliding.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SchoolJsonLd />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
