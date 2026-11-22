import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://titouanhirsch.com" },
    { url: "https://titouanhirsch.com/developpeur-application-mobile" },
  ];
}
