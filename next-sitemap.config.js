/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.changingdemocracies.eu",
  outDir: "./public/robots",
  generateRobotsTxt: false, // We'll create our own robots.txt
  exclude: [
    "/admin/*",
    "/login/*",
    "/password-reset/*",
    "/api/*",
    "/photobooth/*",
    "/_next/*",
    "/supabase/*",
  ],
  generateIndexSitemap: false,
  // Generate sitemap for all supported languages
  additionalPaths: async (config) => {
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

    const paths = [];

    for (const lang of languages) {
      for (const route of routes) {
        paths.push({
          loc: `/${lang}${route}`,
          changefreq: "weekly",
          priority: route === "" ? 1.0 : 0.8,
          lastmod: new Date().toISOString(),
        });
      }
    }

    return paths;
  },
};
