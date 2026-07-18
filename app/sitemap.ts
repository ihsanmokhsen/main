import type { MetadataRoute } from "next";

import { PRIMARY_PAGES, SITE_URL } from "@/app/_components/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...PRIMARY_PAGES.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
