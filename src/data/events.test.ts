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

  // The hero mock shows a poll still open. Every poll is single-choice, and one that everyone
  // has voted in decides itself and leaves the stream (app repo, product.md › Polls), so the
  // votes must add up to fewer than the people in the event (#53).
  it.each(events.map((e) => [e.slug, e] as const))("%s shows a poll that can still be open", (_, e) => {
    const votes = e.mock.options.reduce((sum, o) => sum + o.votes, 0);
    expect(votes).toBeLessThan(e.mock.people);
  });

  it.each(events.map((e) => [e.slug, e] as const))("%s speaks as the guide", (_, e) => {
    expect(e.empathy).toMatch(/^We've all /);
    expect(e.empathy).toContain("After Stories");
  });
});
