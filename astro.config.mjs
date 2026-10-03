import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://after-stories.com",
  base: "/",
  // 404.html must be emitted as a file for GitHub Pages to serve it.
  integrations: [sitemap({ filter: (page) => !page.includes("/404"), lastmod: new Date() })],
});
