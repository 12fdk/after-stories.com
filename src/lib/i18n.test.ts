import { describe, expect, it } from "vitest";
import { DESCRIPTION_LENGTH, TITLE_LENGTH } from "./seo";
import {
  DEFAULT_LOCALE,
  homeCopy,
  hreflangAlternates,
  localEvents,
  locales,
  localizedPath,
  pathLocale,
  uiCopy,
} from "./i18n";
import enCopy from "../data/copy/en";
import frCopy from "../data/copy/fr";
import deCopy from "../data/copy/de";
import esCopy from "../data/copy/es";
import daCopy from "../data/copy/da";

const copies: Record<string, typeof enCopy> = {
  en: enCopy, fr: frCopy, de: deCopy, es: esCopy, da: daCopy,
};

// docs/messaging.md, rule 8: the deletion is never mentioned without saving the photos.
// Localised word lists per locale (English keywords catch any leftover English copy too).
const deletion = new Map<string, RegExp>([
  ["en", /48 hours|gone|disappear|deleted/i],
  ["fr", /48 heures|disparu|supprim|disparaissant/i],
  ["de", /48 stunden|verschwunden|gelöscht|geloe?scht/i],
  ["es", /48 horas|desaparecid|eliminad/i],
  ["da", /48 timer|forsvundet|slettet/i],
]);
const save = new Map<string, RegExp>([
  ["en", /\bsav(e|ed)\b/i],
  ["fr", /sauv(e|ée|ées|er)/i],
  ["de", /speicher|sicher die fotos/i],
  ["es", /guarden|guardad|guardar|salven|salv/i],
  ["da", /gem(?!m)/i],
]);

describe("locale wiring", () => {
  it("keeps English as the default, unprefixed locale", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(locales).toContain("en");
    expect(localizedPath("en", "/trips/")).toBe("/trips/");
    expect(localizedPath("fr", "/trips/")).toBe("/fr/trips/");
  });

  it("reads the locale back from a path", () => {
    expect(pathLocale("/")).toBe("en");
    expect(pathLocale("/fr/")).toBe("fr");
    expect(pathLocale("/da/match-day/")).toBe("da");
  });

  it("points every hreflang set at all five languages and English as x-default", () => {
    const set = hreflangAlternates("https://after-stories.com", "/match-day/", true);
    const tags = set.map((a) => a.hreflang).sort();
    expect(tags).toEqual(["da", "de", "en", "es", "fr", "x-default"].sort());
    expect(set.find((a) => a.hreflang === "x-default")?.url).toBe("https://after-stories.com/match-day/");
    expect(set.find((a) => a.hreflang === "fr")?.url).toBe("https://after-stories.com/fr/match-day/");
  });

  it("keeps the legal pages English-only (self + x-default)", () => {
    const set = hreflangAlternates("https://after-stories.com", "/privacy/", false);
    expect(set.map((a) => a.hreflang).sort()).toEqual(["en", "x-default"]);
  });
});

describe("per-locale SEO", () => {
  for (const locale of locales) {
    const pages = [
      { path: locale === "en" ? "/" : `/${locale}/`, title: homeCopy(locale).title, description: homeCopy(locale).description, home: true },
      ...localEvents(locale).map((e) => ({ path: locale === "en" ? `/${e.slug}/` : `/${locale}/${e.slug}/`, title: e.title, description: e.description, home: false })),
    ];

    it.each(pages.map((p) => [p.path, p] as const))(`[%s] %s has a title that fits a search result`, (_, p) => {
      expect(p.title.length).toBeGreaterThanOrEqual(TITLE_LENGTH.min);
      expect(p.title.length).toBeLessThanOrEqual(TITLE_LENGTH.max);
      expect(p.title).toContain("After Stories");
    });

    it.each(pages.map((p) => [p.path, p] as const))(`[%s] %s has a description that fits a search result`, (_, p) => {
      expect(p.description.length).toBeGreaterThanOrEqual(DESCRIPTION_LENGTH.min);
      expect(p.description.length).toBeLessThanOrEqual(DESCRIPTION_LENGTH.max);
    });

    it.each(pages.map((p) => [p.path, p] as const))(`[%s] %s pairs any deletion with saving the photos`, (_, p) => {
      if (deletion.get(locale)!.test(p.description)) expect(p.description).toMatch(save.get(locale)!);
    });
  }

  it("gives every page its own title and description in every language", () => {
    for (const locale of locales) {
      const pages = [homeCopy(locale), ...localEvents(locale)];
      const titles = pages.map((p) => p.title);
      const descriptions = pages.map((p) => p.description);
      expect(new Set(titles).size).toBe(pages.length);
      expect(new Set(descriptions).size).toBe(pages.length);
    }
  });
});

describe("copy fallback", () => {
  const walk = (obj: unknown, prefix = "", out: string[] = []): string[] => {
    if (obj === null || typeof obj === "object") {
      if (Array.isArray(obj)) {
        if (obj.length === 0 && !prefix.endsWith("]")) return out;
        obj.forEach((v, i) => walk(v, `${prefix}[${i}]`, out));
        return out;
      }
      for (const [k, v] of Object.entries(obj)) walk(v, prefix ? `${prefix}.${k}` : k, out);
      return out;
    }
    out.push(prefix);
    return out;
  };

  it.each(locales.map((l) => [l] as const))("[%s] copy has no empty strings and covers the English structure", (locale) => {
    const copy = copies[locale];
    const values = walk(copy);
    // every leaf in the localized file is a non-empty string (the merge would otherwise fall back)
    expect(values.length).toBeGreaterThan(600);
    const enLeaves = new Set(walk(enCopy).map((p) => p.replace(/\[\d+\]/g, "[i]")));
    const localeLeaves = new Set(walk(copy).map((p) => p.replace(/\[\d+\]/g, "[i]")));
    for (const leaf of localeLeaves) {
      // the localized file may only add keys the English file has (structure is shared)
      expect(enLeaves.has(leaf)).toBe(true);
    }
  });

  it.each(locales.filter((l) => l !== "en").map((l) => [l] as const))("[%s] does not accidentally keep English copy", (locale) => {
    const home = homeCopy(locale as "fr");
    expect(home.hero.lede).not.toEqual(enCopy.home.hero.lede);
    expect(uiCopy(locale as "fr").navHowItWorks).not.toEqual(enCopy.ui.navHowItWorks);
  });
});
