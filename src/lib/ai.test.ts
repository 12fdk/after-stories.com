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

  it("keeps the pre-launch posture and says nothing about price", () => {
    expect(txt).toMatch(/coming soon/i);
    expect(txt).not.toMatch(/\b(available now|download on the app store|for free|is free|free to|price|pricing|costs?|subscription)\b|[$€]/i);
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
