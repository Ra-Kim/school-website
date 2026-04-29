import { site } from "@/content/site";

/**
 * One config drives both desktop and mobile nav.
 *
 * Note on Result Checker: it lives at /results (an internal page that
 * currently hands off to Cloudnotte). When phase 3 ships our own
 * checker, /results becomes the actual checker — nothing else changes.
 *
 * `site.external.resultChecker` is still imported by the /results page
 * itself; keeping this in nav lets other places (footer columns) link
 * either to /results or directly to the external URL.
 */
export const navItems = [
  { label: "About", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Academics", href: "/#academics" },
  { label: "Events", href: "/events" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Kept for any future use (e.g. an external "Alumni" link). Currently
 * unused — Result Checker has graduated to its own /results page.
 */
export const utilityNav: ReadonlyArray<{
  label: string;
  href: string;
  external: boolean;
}> = [];

// Re-export for backward compatibility / convenience
export const externalResultChecker = site.external.resultChecker;
