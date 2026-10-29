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

// After Stories is live on the App Store (1.1 since 2026-10-29, iOS 26 or later). Friends without
// an iPhone join from the browser since 2026-10-20 (app repo #463), so every "without an iPhone"
// answer says yes and names its limits (docs/messaging.md rule 11). No copy may still talk
// pre-launch, name the old iOS 27 minimum or promise an Android app.
describe("launch copy", () => {
  /** Every reader-facing string under a value, skipping structural file paths (hero.src). */
  const strings = (v: unknown, key = ""): string[] => {
    if (typeof v === "string") return key === "src" ? [] : [v];
    if (Array.isArray(v)) return v.flatMap((x) => strings(x));
    if (v && typeof v === "object") return Object.entries(v).flatMap(([k, x]) => strings(x, k));
    return [];
  };
  const sources = { "events.ts": events, "home.ts": homeFaq, ...copies };

  /** Every question and answer in a source, at any depth. */
  const questions = (v: unknown): { q: string; a: string }[] => {
    if (Array.isArray(v)) return v.flatMap(questions);
    if (v && typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (typeof o.q === "string" && typeof o.a === "string") return [{ q: o.q, a: o.a }];
      return Object.values(o).flatMap(questions);
    }
    return [];
  };
  const aboutIphone = (source: unknown) => questions(source).filter((f) => /iPhone/.test(f.q));

  it.each(Object.entries(sources))("%s has no pre-launch wording", (_, source) => {
    for (const s of strings(source)) {
      expect(s).not.toMatch(
        /coming soon|get notified|waitlist|when (it|we) launch|at launch|kommer snart|få besked|demnächst|benachrichtig|bientôt|prévenez-moi|próximamente|avísame/i,
      );
    }
  });

  it.each(Object.entries(sources))("%s names iOS 26, never iOS 27", (_, source) => {
    for (const s of strings(source)) expect(s).not.toContain("iOS 27");
  });

  it.each(Object.entries(copies))("%s fineprint names the iPhone and iOS 26", (_, copy) => {
    for (const e of Object.values(copy.events)) expect(e.fineprint).toContain("iOS 26");
    expect(copy.home.hero.fineprint).toContain("iOS 26");
  });

  it.each(Object.entries(sources))("%s lets friends without an iPhone join from the browser", (_, source) => {
    const faqs = aboutIphone(source);
    expect(faqs.length).toBeGreaterThan(0);
    for (const { a } of faqs) {
      expect(a).toMatch(/browser|navigateur|navegador/i);
      // The organiser still needs the app, and says which one.
      expect(a).toContain("iOS 26");
    }
  });

  it.each(Object.entries(sources).filter(([name]) => name !== "copy/da.ts"))(
    "%s says the browser version is Danish only",
    (_, source) => {
      for (const { a } of aboutIphone(source)) expect(a).toMatch(/Danish|Dänisch|danois|danés/);
    },
  );

  it.each(Object.entries(sources))("%s never promises an Android app", (_, source) => {
    for (const s of strings(source)) {
      expect(s).not.toMatch(/Android[- ]app|app (Android|de Android)|Android-App/i);
    }
  });
});
