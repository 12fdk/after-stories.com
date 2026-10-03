import { describe, expect, it } from "vitest";
import { events } from "../data/events";
import { OG_HEIGHT, OG_WIDTH, TEXT_WIDTH, headlineSize, lineWidthEm, ogCards, ogImagePath, ogSvg } from "./og";

describe("share images", () => {
  it("has one per event page and one for the home page, with unique file names", () => {
    const slugs = ogCards.map((c) => c.slug);
    expect(slugs).toEqual(["home", ...events.map((e) => e.slug)]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(ogCards.map((c) => [c.slug, c] as const))("%s fits every headline line in the image", (_, card) => {
    const size = headlineSize(card.lines);
    expect(size).toBeGreaterThanOrEqual(56);
    for (const line of card.lines) expect(lineWidthEm(line) * size).toBeLessThanOrEqual(TEXT_WIDTH);
  });

  it.each(ogCards.map((c) => [c.slug, c] as const))("%s has a kicker in search words, not the brand", (_, card) => {
    expect(card.kicker).not.toMatch(/After Stories/);
    expect(card.kicker.length).toBeLessThanOrEqual(60);
  });

  it("is 1200×630 and shows the page's headline", () => {
    const svg = ogSvg(ogCards[1], "data:image/png;base64,AAAA");
    expect(svg).toContain(`width="${OG_WIDTH}" height="${OG_HEIGHT}"`);
    for (const line of events[0].headline) expect(svg).toContain(`>${line}</text>`);
  });

  it("escapes text so a headline can't break the SVG", () => {
    const svg = ogSvg({ slug: "x", lines: ["Fish & chips <3"], kicker: "A \"quoted\" kicker" }, "data:,");
    expect(svg).toContain("Fish &amp; chips &lt;3");
    expect(svg).toContain("A &quot;quoted&quot; kicker");
  });

  it("measures wide headlines smaller", () => {
    expect(headlineSize(["Short."])).toBe(112);
    expect(headlineSize(["A much, much longer headline line than that."])).toBeLessThan(112);
  });

  it("lives under /og/", () => {
    expect(ogImagePath("trips")).toBe("/og/trips.png");
  });
});
