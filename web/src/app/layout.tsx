import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl, defaultKeywords } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const description =
  "One roof, four houses in Warri, Delta State — Good Food Avenue (food), Urovi Spa (wellness), Financial Advisory (wealth) and Safe Haven (luxury stays). Wealth, Appetite & Wellbeing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Ovis Effect — Wealth, Appetite & Wellbeing in Warri",
    template: "%s · The Ovis Effect",
  },
  description,
  keywords: defaultKeywords,
  applicationName: "The Ovis Effect",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "The Ovis Effect",
    locale: "en_NG",
    url: siteUrl,
    title: "The Ovis Effect — Wealth, Appetite & Wellbeing in Warri",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ovis Effect — Warri, Delta State",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`}>
      <body className="bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
