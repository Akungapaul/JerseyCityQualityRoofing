import type { Metadata } from "next";
import { Cormorant, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";

const cormorant = Cormorant({
  weight: ["500", "700"],
  variable: "--font-heading",
  display: "swap",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["500", "700"],
  variable: "--font-body",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Jersey City Quality Roofing | Expert Roofing Services in Hudson County",
    template: "%s | Jersey City Quality Roofing",
  },
  description:
    "Professional roofing services in Jersey City and all Hudson County municipalities. Residential and commercial roof repair, replacement, and inspection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cormorantGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
