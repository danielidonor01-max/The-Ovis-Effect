import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { organizationLd } from "@/lib/structured-data";
import { getSiteSettings } from "@/sanity/lib/data";

// Public-site chrome (navbar + footer). The /studio route lives outside this
// group so the CMS renders full-screen without the site header/footer.
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <div className="flex min-h-dvh flex-col">
      <JsonLd data={organizationLd(settings)} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
