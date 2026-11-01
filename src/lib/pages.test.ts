import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// Every HTML page carries the site's navigation: the header (logo + menu) and the footer.
// Without them a visitor who lands on the page can't get anywhere else (#70: the blog had neither).
// A page counts when it renders SiteHeader/SiteFooter itself or through HomePage/EventPage.

const pagesDir = join(process.cwd(), "src/pages");

function astroPages(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return astroPages(path);
    return name.endsWith(".astro") ? [path] : [];
  });
}

const pages = astroPages(pagesDir).map((path) => ({
  name: relative(pagesDir, path),
  source: readFileSync(path, "utf8"),
}));

const wrapped = (source: string) => /<(HomePage|EventPage)\b/.test(source);

// The 404 page is a full-screen "went home early" scene with one way out; it keeps the header only.
const footerExempt = new Set(["404.astro"]);

describe("site navigation on every page", () => {
  it("finds the pages, blog included", () => {
    const names = pages.map((p) => p.name);
    expect(names).toContain("blog/index.astro");
    expect(names).toContain("blog/[...slug].astro");
  });

  it.each(pages.map((p) => [p.name, p.source]))("%s renders the site header", (_, source) => {
    expect(wrapped(source) || /<SiteHeader\b/.test(source)).toBe(true);
  });

  it.each(pages.filter((p) => !footerExempt.has(p.name)).map((p) => [p.name, p.source]))(
    "%s renders the site footer",
    (_, source) => {
      expect(wrapped(source) || /<SiteFooter\b/.test(source)).toBe(true);
    },
  );
});
