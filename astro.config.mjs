import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { lastModified } from "./src/lib/lastmod.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://after-stories.com",
  base: "/",
  // Every page lives at a folder URL (/trips/), the same as its canonical and sitemap entry.
  trailingSlash: "always",
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
