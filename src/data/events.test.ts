import { describe, expect, it } from "vitest";
import { events } from "./events";
import { homeFaq } from "./home";
import en from "./copy/en";
import da from "./copy/da";
import de from "./copy/de";
import fr from "./copy/fr";
import es from "./copy/es";

const copies = { "copy/en.ts": en, "copy/da.ts": da, "copy/de.ts": de, "copy/fr.ts": fr, "copy/es.ts": es };

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

// After Stories is live on the App Store (2026-10-18) and is iPhone only: there is no web client
// and no plan for one (app repo, docs/distribution.md). No copy, in any locale, may promise a web
// version or still talk pre-launch.
describe("launch copy", () => {
  /** Every reader-facing string under a value, skipping structural file paths (hero.src). */
  const strings = (v: unknown, key = ""): string[] => {
    if (typeof v === "string") return key === "src" ? [] : [v];
    if (Array.isArray(v)) return v.flatMap((x) => strings(x));
    if (v && typeof v === "object") return Object.entries(v).flatMap(([k, x]) => strings(x, k));
    return [];
  };
  const sources = { "events.ts": events, "home.ts": homeFaq, ...copies };

  it.each(Object.entries(sources))("%s never says friends join from the web", (_, source) => {
    for (const s of strings(source)) {
      expect(s).not.toMatch(/\bweb\b|browser|navigateur|navegador|nettet/i);
    }
  });

  it.each(Object.entries(sources))("%s has no pre-launch wording", (_, source) => {
    for (const s of strings(source)) {
      expect(s).not.toMatch(
        /coming soon|get notified|waitlist|when (it|we) launch|at launch|kommer snart|få besked|demnächst|benachrichtig|bientôt|prévenez-moi|próximamente|avísame/i,
      );
    }
  });

  it.each(Object.entries(copies))("%s fineprint names the iPhone and iOS 27", (_, copy) => {
    for (const e of Object.values(copy.events)) expect(e.fineprint).toContain("iOS 27");
    expect(copy.home.hero.fineprint).toContain("iOS 27");
  });
});
