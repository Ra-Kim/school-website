/**
 * One config drives desktop nav (with dropdowns), mobile nav and the
 * footer's Explore column.
 *
 * An item with `children` renders as a dropdown on desktop. Its own
 * href is still a real page, so clicking the top-level label works too.
 * Result Checker isn't here — it's a header button and lives at /results.
 */
export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: readonly NavLink[] };

export const navItems: readonly NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About the school", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Alumni", href: "/alumni" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "How to apply", href: "/admissions" },
      { label: "Book a visit", href: "/visit" },
      { label: "Send an enquiry", href: "/admissions#enquire" },
    ],
  },
  { label: "Academics", href: "/#academics" },
  { label: "Events", href: "/events" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Footer "Explore" column: every page once, no duplicates. */
export const footerExplore: readonly NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/#academics" },
  { label: "Events", href: "/events" },
  { label: "Journal", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Alumni", href: "/alumni" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
