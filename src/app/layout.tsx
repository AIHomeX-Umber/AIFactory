import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const siteUrl = "https://factoryrouter.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FactoryRouter — Product × Channel Intelligence",
    template: "%s | FactoryRouter",
  },
  description:
    "Operator-grade routing intelligence for Chinese manufacturers. Find the right channel for your product — Amazon, Wayfair, Shopify DTC, TikTok Shop, Walmart.",
  keywords: [
    "channel intelligence",
    "product routing",
    "Chinese manufacturer export",
    "e-commerce channel matching",
    "Amazon seller sourcing",
    "Wayfair supplier",
    "TikTok Shop cross-border",
    "factory to channel",
  ],
  authors: [{ name: "FactoryRouter" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "FactoryRouter — Product × Channel Intelligence",
    description:
      "Routing intelligence for Chinese factory products. Built from real distribution data.",
    url: siteUrl,
    siteName: "FactoryRouter",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FactoryRouter — Product × Channel Intelligence",
    description:
      "Routing intelligence for Chinese factory products. Built from real distribution data.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FactoryRouter",
              url: siteUrl,
              description:
                "Operator-grade routing intelligence for Chinese manufacturers.",
              foundingDate: "2025",
              areaServed: ["CN", "US", "EU"],
              knowsAbout: [
                "Channel Intelligence",
                "Product Routing",
                "E-commerce Channel Matching",
                "Amazon",
                "Walmart Marketplace",
                "Wayfair",
                "Shopify DTC",
                "TikTok Shop",
              ],
            }),
          }}
        />
        <script
          defer
          data-domain="factoryrouter.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0b0d] text-[#f0f0f0]">
        <Nav />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
