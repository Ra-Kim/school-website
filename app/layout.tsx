import type { Metadata } from "next";
import { serif, sans } from "@/lib/fonts";
import { site } from "@/content/site";
// @ts-ignore
import "./globals.css";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourschool.edu.ng";

// The default title is what shows for "<school name>" searches, but it's
// also the strongest on-page signal for "school in <neighbourhood>"
// searches — so it carries the location, not just the brand name.
const defaultTitle = `${site.name} | School in ${site.location}`;
const localDescription = `${site.intro} Located in ${site.contact.address}, serving families across ${site.serviceAreas.slice(0, -1).join(", ")} and ${site.serviceAreas[site.serviceAreas.length - 1]}.`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: localDescription,
  keywords: [
    site.name,
    ...site.serviceAreas.map((area) => `school in ${area}`),
    ...site.serviceAreas.map((area) => `schools near ${area}`),
    "private school Port Harcourt",
    "international school Rivers State",
  ],
  openGraph: {
    siteName: site.name,
    title: defaultTitle,
    description: localDescription,
    type: "website",
    locale: "en_NG",
    images: [{ url: "/assets/logo.png" }],
  },
  // TODO: once verified in Google Search Console, add the verification
  // meta tag here, e.g. verification: { google: "your-code" }.
  // Once you have a logo, drop a 32x32 favicon at /public/favicon.ico
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
