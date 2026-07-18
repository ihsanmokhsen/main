import type { MetadataRoute } from "next";

import { SITE_URL } from "@/app/_components/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
