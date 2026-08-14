import { site } from "@/content/site";

/**
 * JSON-LD structured data. Google reads this to display rich results
 * (school name in knowledge panel, event cards in search, etc) and to
 * cross-check the site against the Google Business Profile listing for
 * local/map ranking.
 *
 * Drop <SchoolJsonLd /> in the root marketing layout once and forget
 * about it — it goes in <head> via the Script tag.
 *
 * "School" (not the more generic "EducationalOrganization") because it
 * extends LocalBusiness in schema.org's hierarchy — that's what gives
 * Google the geo/areaServed signals it uses for "school near me" /
 * "schools in <neighbourhood>" style local queries.
 * https://schema.org/School
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourschool.edu.ng";

export function SchoolJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    name: site.name,
    alternateName: site.shortName,
    url: BASE,
    logo: `${BASE}/assets/logo.png`,
    image: `${BASE}/assets/logo.png`,
    description: site.intro,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
      addressLocality: site.contact.addressLocality,
      addressRegion: site.contact.addressRegion,
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.latitude,
      longitude: site.contact.geo.longitude,
    },
    // The neighbourhoods and roads a local parent actually searches —
    // keeps the listing relevant for "schools in <area>" queries, not
    // just the school's own name.
    areaServed: site.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    hasMap: site.contact.googleMapsUrl || undefined,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      email: site.contact.email,
      contactType: "Admissions",
    },
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.contact.googleMapsUrl,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
