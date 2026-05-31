import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "FactoryRouter — Product × Channel Intelligence",
  description:
    "Operator-grade routing intelligence for Chinese manufacturers. Find the right channel for your product — Amazon, Wayfair, Shopify DTC, TikTok Shop, Walmart.",
  openGraph: {
    title: "FactoryRouter — Product × Channel Intelligence",
    description:
      "Routing intelligence for Chinese factory products. Built from real distribution data.",
    siteName: "FactoryRouter",
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
