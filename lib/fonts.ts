import { Playfair_Display, Inter } from "next/font/google";

/**
 * Two fonts, used with restraint:
 *   serif  — display headlines, eyebrows on hero, section openers, pull quotes
 *   sans   — everything else
 *
 * If you ever want to swap Playfair for something more distinctive later
 * (Canela, GT Sectra, Editorial New) this is the only file you change.
 */
export const serif = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500"],
});

export const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});
