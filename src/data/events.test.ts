import { describe, expect, it } from "vitest";
import { events } from "./events";

// Every event page tells the whole StoryBrand story (docs/positioning.md › Brand script).
describe("event pages", () => {
  it("have unique slugs", () => {
    const slugs = events.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(events.map((e) => [e.slug, e] as const))("%s has every part of the story", (_, e) => {
    for (const part of [e.problem, e.empathy, e.success, e.stakes, e.closer]) {
      expect(part.trim()).not.toBe("");
    }
    // A plan in three steps, no more.
    expect(e.beats).toHaveLength(3);
  });

  it.each(events.map((e) => [e.slug, e] as const))("%s speaks as the guide", (_, e) => {
    expect(e.empathy).toMatch(/^We've all /);
    expect(e.empathy).toContain("After Stories");
  });
});
