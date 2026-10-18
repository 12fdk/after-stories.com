import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { aiTxt } from "./ai";
import { DEFINITION, SITE_URL } from "./seo";

describe("ai.txt", () => {
  const txt = aiTxt();

  it("names After Stories and points crawlers at the existing summaries", () => {
    expect(txt.startsWith("# After Stories\n")).toBe(true);
    expect(txt).toContain(`> ${DEFINITION}`);
    expect(txt).toContain(`${SITE_URL}/llms.txt`);
    expect(txt).toContain(`${SITE_URL}/llms-full.txt`);
    expect(txt).toContain(`Home: ${SITE_URL}/`);
  });

  // Launch (#59): live on the App Store. Still nothing about price (messaging rule 9).
  it("says the app is on the App Store now, and nothing about price", () => {
    expect(txt).toMatch(/available now on the App Store/);
    expect(txt).toContain("https://apps.apple.com/app/id6815212070");
    expect(txt).not.toMatch(/coming soon|web version/i);
    expect(txt).not.toMatch(/\b(for free|is free|free to|price|pricing|costs?|subscription)\b|[$€]/i);
  });

  it("has no email address for Cloudflare to rewrite", () => {
    expect(txt).not.toMatch(/@/);
  });

  it("is named from robots.txt, next to the llms files", () => {
    const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
    expect(robots).toContain("/ai.txt");
    expect(robots).toContain("/llms.txt");
    expect(robots).toContain("/llms-full.txt");
  });
});
