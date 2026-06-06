import type { MetadataRoute } from "next";

const siteUrl = "https://factoryrouter.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/login", "/settings", "/profile/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
