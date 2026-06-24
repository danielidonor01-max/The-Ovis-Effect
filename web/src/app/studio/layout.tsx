import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Studio · The Ovis Effect",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
