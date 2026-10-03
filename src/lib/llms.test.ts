import { describe, expect, it } from "vitest";
import { events } from "../data/events";
import { homeFaq } from "../data/home";
import { llmsFullTxt, llmsTxt } from "./llms";
import { DEFINITION } from "./seo";

describe("llms.txt", () => {
  const txt = llmsTxt();

  it("follows the llmstxt.org shape: a title, a summary quote, then sections", () => {
    expect(txt.startsWith("# After Stories\n\n> ")).toBe(true);
    expect(txt).toContain(`> ${DEFINITION}`);
    expect(txt).toMatch(/^## Pages$/m);
  });

  it("links every page", () => {
    expect(txt).toContain("(https://after-stories.com/)");
    for (const e of events) expect(txt).toContain(`(https://after-stories.com/${e.slug}/)`);
  });

  it("says nothing about price (messaging rule 9)", () => {
    expect(`${txt}${llmsFullTxt()}`).not.toMatch(/\b(for free|is free|free to|price|pricing|costs?|subscription)\b|[$€]/i);
  });
});

describe("llms-full.txt", () => {
  const full = llmsFullTxt();

  it("answers every question the site answers", () => {
    for (const f of [...homeFaq, ...events.flatMap((e) => e.faq)]) {
      expect(full).toContain(`### ${f.q}\n\n${f.a}`);
    }
  });

  it("has a section with the three steps for every event page", () => {
    for (const e of events) {
      expect(full).toContain(`URL: https://after-stories.com/${e.slug}/`);
      for (const b of e.beats) expect(full).toContain(`**${b.name}**`);
    }
  });
});
