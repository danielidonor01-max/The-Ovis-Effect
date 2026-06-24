import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Public-site chrome (navbar + footer). The /studio route lives outside this
// group so the CMS renders full-screen without the site header/footer.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
