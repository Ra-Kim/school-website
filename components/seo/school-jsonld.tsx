import { site } from "@/content/site";

/**
 * JSON-LD structured data. Google reads this to display rich results
 * (school name in knowledge panel, event cards in search, etc).
 *
 * Drop <SchoolJsonLd /> in the root marketing layout once and forget
 * about it — it goes in <head> via the Script tag.
 *
 * The EducationalOrganization schema is the right one for schools:
 * https://schema.org/EducationalOrganization
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourschool.edu.ng";

export function SchoolJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    alternateName: site.shortName,
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: site.intro,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      email: site.contact.email,
      contactType: "Admissions",
    },
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
