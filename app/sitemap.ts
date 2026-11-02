import type { MetadataRoute } from "next";
import { products } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fenix3d.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: base, priority: 1 }, ...products.map((p) => ({ url: `${base}/produto/${p.slug}`, priority: 0.7 }))];
}
