import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "Red Deer Reavers | Buhurt in Central Alberta",
    template: "%s | Red Deer Reavers",
  },
  description: site.description,
  keywords: [
    "buhurt",
    "Red Deer",
    "Central Alberta",
    "armored combat",
    "historical armored combat",
    "HACSA",
    "medieval combat sport",
  ],
  openGraph: {
    title: "Red Deer Reavers",
    description: site.description,
    type: "website",
    locale: "en_CA",
    images: [{ url: "/gallery/fight-01.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#120a24",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Red Deer Reavers",
    sport: "Buhurt",
    areaServed: "Central Alberta, Canada",
    sameAs: [site.instagram, site.hacsa],
  };

  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
