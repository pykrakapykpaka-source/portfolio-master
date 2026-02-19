import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wesselpawel.com";
  const lastModified = new Date();

  const routes = [
    "/pl",
    "/en",
    "/pl/about",
    "/en/about",
    "/pl/blog",
    "/en/blog",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }));
}
