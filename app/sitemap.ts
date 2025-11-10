import { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL || "https://www.changingdemocracies.eu";

const languages = [
  "en",
  "es",
  "ca",
  "cs",
  "el",
  "hr",
  "lt",
  "nl",
  "pl",
  "pt",
  "ro",
];

const routes = [
  "",
  "/scroll-documentary",
  "/narratives",
  "/free-browsing",
  "/project",
  "/team",
  "/events",
  "/contact",
  "/educational-resources",
  "/research-publication",
  "/travelling-workshop",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of routes) {
      urls.push({
        url: `${siteUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  return urls;
}
