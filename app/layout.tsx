import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sharon Stars",
  description: "Wisdom is the key to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Sharon Stars International School</title>
        <meta
          name="description"
          content="Sharon Stars International School is a co-educational crèche, nursery, primary, and secondary school providing equal opportunities for learning with godly care and quality training. Our comprehensive curriculum aims to stimulate intellectual curiosity, encourage creativity, and develop essential skills. We focus on human development, spiritual, social, physical, and mental growth, located in Rumuagholu Port Harcourt."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <body className={`${poppins.className} no-scrollbar `}>{children}</body>
    </html>
  );
}
