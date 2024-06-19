import type { Metadata } from "next";
import { Inter, Poppins , Playfair_Display} from "next/font/google";
import "./globals.css";

export const playfair = Playfair_Display({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });
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
      <body className={`${poppins.className} no-scrollbar`}>{children}</body>
    </html>
  );
}
