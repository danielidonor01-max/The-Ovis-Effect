import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "The Ovis Effect — Warri, Delta State",
    template: "%s · The Ovis Effect",
  },
  description:
    "One roof, four houses — Good Food Avenue, Urovi Spa, Financial Advisory and Safe Haven. Wealth, Appetite & Wellbeing in Warri, Delta State.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
