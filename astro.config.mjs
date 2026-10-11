import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { lastModified } from "./src/lib/lastmod.ts";

// Retired event pages, sent to the page that replaced them in every locale (#53: youth sports
// was match day with children; the terms forbid photos of anyone under 18). A static build
// writes each one as a small meta-refresh page with a canonical link to the target.
const locales = ["", "/fr", "/de", "/es", "/da"];
const retired = { "youth-sports": "match-day" };
const redirects = Object.fromEntries(
  locales.flatMap((l) =>
    Object.entries(retired).map(([from, to]) => [`${l}/${from}/`, `${l}/${to}/`]),
  ),
);

// https://astro.build/config
export default defineConfig({
  site: "https://after-stories.com",
  base: "/",
  // Every page lives at a folder URL (/trips/), the same as its canonical and sitemap entry.
  trailingSlash: "always",
  redirects,
  integrations: [
    sitemap({
      // 404.html must be emitted as a file for GitHub Pages to serve it.
      filter: (page) => !page.includes("/404"),
      // The last commit to the page's own files, not the build time (src/lib/lastmod.ts, #30).
      serialize(item) {
        const modified = lastModified(new URL(item.url).pathname);
        return modified ? { ...item, lastmod: modified.toISOString() } : item;
      },
    }),
  ],
});
