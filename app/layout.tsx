import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ACTIVE } from "@/lib/palette";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.genuineoptimum.com";
const SITE_TITLE = "Genuine Optimum | Applied AI, Data & Software Products";
const SITE_DESCRIPTION =
  "Genuine Optimum is a software house building applied AI and data systems, plus its own products for dispatchers, clinics and contractors.";

/**
 * Search Console ownership check by meta tag. Domain verification by DNS is
 * the better route and needs nothing here; this is the fallback if only a
 * URL-prefix property can be used. Set GOOGLE_SITE_VERIFICATION (and
 * optionally BING_SITE_VERIFICATION) in the Vercel project's environment
 * variables and redeploy. Unset, the tags are simply not rendered.
 */
const verification = {
  google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  other: process.env.BING_SITE_VERIFICATION
    ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: ACTIVE.bg,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  applicationName: "Genuine Optimum",
  authors: [{ name: "Genuine Optimum", url: SITE_URL }],
  creator: "Genuine Optimum",
  publisher: "Genuine Optimum",
  // Large image previews in Google results and Discover, and no limits on
  // snippet length. Pages that must not be indexed (the empty blog) set their
  // own robots value, which replaces this one.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(verification.google || verification.other ? { verification } : {}),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Genuine Optimum",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// One linked graph: the business, and the website it publishes. The @id values
// let other pages (products, case studies) point back at the same entity
// instead of describing a new one each time. Only facts that are true and on
// the site are listed: no address, phone or social profiles are claimed
// because none are published. Add `sameAs` (LinkedIn, GitHub, and so on) and
// an `address` or `areaServed` here once they exist.
const ORG_ID = `${SITE_URL}/#organization`;
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: "Genuine Optimum",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
      image: `${SITE_URL}/opengraph-image.png`,
      description: SITE_DESCRIPTION,
      email: "contact@genuineoptimum.com",
      knowsAbout: [
        "Applied AI",
        "Data engineering",
        "Web development",
        "Software products",
        "Technical SEO",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "contact@genuineoptimum.com",
        url: `${SITE_URL}/contact`,
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Genuine Optimum",
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plexMono.variable} bg-bg text-text antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
