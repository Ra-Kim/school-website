import type { Metadata } from "next";
import { serif, sans } from "@/lib/fonts";
import { site } from "@/content/site";
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.intro,
  openGraph: {
    title: site.name,
    description: site.intro,
    type: "website",
    locale: "en_NG",
  },
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
