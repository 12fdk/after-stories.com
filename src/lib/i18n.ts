// Internationalisation: five locales, one content source per locale (src/data/copy/).
//
// English is the base and lives at the root (/trips/). The other four are prefixed
// (/fr/trips/). Each locale's file translates every reader-facing string; any key a locale
// leaves empty, omits, or leaves as an empty array falls back to English (mergeCopy), so a
// missing translation can never blank a page or break the build. SEO, hreflang and the sitemap
// are all locale-aware (localizedPath / hreflangAlternates).
//
// What is translated vs. structural:
//   - TRANSLATED (src/data/copy/<locale>.ts): every marketing string — titles, descriptions,
//     headlines, the "how it works" beats, the occasion tiles, the FAQ, the privacy facts, the
//     form and nav labels, and the hero alt text.
//   - STRUCTURAL (src/data/events.ts, src/pages/index.astro): slugs, icons, hero photo files,
//     and the app-UI demo in the mocks (event poll card, home morning-after card) — the same in
//     every locale, like a screenshot of the app.
//
// Legal pages (privacy, terms) are English-only by design: they are legal documents (GDPR,
// App Store, Brevo references) and are not translated. They still carry hreflang alternates
// that point at the English version so crawlers don't treat them as orphaned.

export type Locale = "en" | "fr" | "de" | "es" | "da";

/** Every locale the site ships, in the order the footer's language switch lists them. */
export const locales: Locale[] = ["en", "fr", "de", "es", "da"];

export const DEFAULT_LOCALE: Locale = "en";

/** The human name of a locale, in its own language (the switch labels). */
export const localeName: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  da: "Dansk",
};

/** BCP-47 tag, for <html lang>, og:locale and JSON-LD inLanguage. */
export const localeTag: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  de: "de",
  es: "es",
  da: "da",
};

/** The og:locale region tag (broad audience, so neutral regions). */
export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  es: "es_ES",
  da: "da_DK",
};

/** A page path in its locale. English keeps the current root URLs; others are prefixed. */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

/** The locale of a page path: /trips/ → "en", /fr/trips/ → "fr". */
export function pathLocale(path: string): Locale {
  const seg = path.split("/");
  if (seg.length > 1 && (locales as string[]).includes(seg[1])) return seg[1] as Locale;
  return DEFAULT_LOCALE;
}

/** The bare (English) path behind a locale-prefixed one: /fr/trips/ → /trips/. */
export function basePath(path: string): string {
  const seg = path.split("/");
  if (seg.length > 1 && (locales as string[]).includes(seg[1])) {
    return "/" + seg.slice(2).join("/");
  }
  return path;
}

/** The absolute URL of a page in a locale (for hreflang alternates and the sitemap). */
export function localizedUrl(siteUrl: string, locale: Locale, path: string): string {
  return new URL(localizedPath(locale, path), siteUrl).href;
}

/**
 * The set of hreflang alternates for a page. Translated pages get one alternate per locale plus
 * x-default. English-only pages (privacy, terms) link only to themselves, so crawlers don't get
 * a wrong-language signal.
 */
export function hreflangAlternates(siteUrl: string, path: string, translated: boolean) {
  const alternates: { hreflang: string; url: string }[] = [];
  if (!translated) {
    const url = localizedUrl(siteUrl, DEFAULT_LOCALE, path);
    alternates.push({ hreflang: localeTag[DEFAULT_LOCALE], url });
    alternates.push({ hreflang: "x-default", url });
    return alternates;
  }
  for (const locale of locales) {
    alternates.push({ hreflang: localeTag[locale], url: localizedUrl(siteUrl, locale, path) });
  }
  alternates.push({ hreflang: "x-default", url: localizedUrl(siteUrl, DEFAULT_LOCALE, path) });
  return alternates;
}

// ---------------------------------------------------------------------------
// Copy: one module per locale, deep-merged over the English base so a missing
// translation can never blank a page (English is always the fallback).
// ---------------------------------------------------------------------------

import type { Copy, EventCopy, HomeCopy, UiCopy } from "../data/i18n-types";
import type { EventType } from "../data/events";
import { events as structure } from "../data/events";
import enCopy from "../data/copy/en";
import frCopy from "../data/copy/fr";
import deCopy from "../data/copy/de";
import esCopy from "../data/copy/es";
import daCopy from "../data/copy/da";

export const allCopies: Record<Locale, Copy> = {
  en: enCopy,
  fr: frCopy,
  de: deCopy,
  es: esCopy,
  da: daCopy,
};

const isStr = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const str = (base: string, value: string | undefined): string => (isStr(value) ? value : base);
const strList = (base: string[], value: string[] | undefined): string[] =>
  !value || value.length === 0 ? base : base.map((b, i) => (isStr(value[i]) ? value[i] : b));

export function mergeCopy(base: Copy, locale: Copy): Copy {
  const mergedEvents: Record<string, EventCopy> = {};
  for (const slug of Object.keys(base.events)) {
    mergedEvents[slug] = mergeEvent(base.events[slug], locale.events[slug]);
  }
  const privacy =
    locale.privacy && locale.privacy.length > 0 && base.privacy
      ? base.privacy.map((p, i) => ({
          title: str(p.title, locale.privacy?.[i]?.title),
          text: str(p.text, locale.privacy?.[i]?.text),
        }))
      : locale.privacy ?? base.privacy;
  return {
    home: mergeHome(base.home, locale.home),
    ui: mergeUi(base.ui, locale.ui),
    privacy,
    events: mergedEvents,
  };
}

function mergeEvent(base: EventCopy, l: EventCopy | undefined): EventCopy {
  if (!l) return base;
  const locPrivacy = l.privacy !== undefined && l.privacy.length > 0 ? l.privacy : undefined;
  const privacy =
    base.privacy !== undefined
      ? base.privacy.map((p, i) => ({ title: str(p.title, locPrivacy?.[i]?.title), text: str(p.text, locPrivacy?.[i]?.text) }))
      : locPrivacy;
  return {
    name: str(base.name, l.name),
    title: str(base.title, l.title),
    description: str(base.description, l.description),
    headline: strList(base.headline, l.headline),
    lede: str(base.lede, l.lede),
    fineprint: str(base.fineprint, l.fineprint),
    heroAlt: str(base.heroAlt, l.heroAlt),
    todayTitle: str(base.todayTitle, l.todayTitle),
    problem: str(base.problem, l.problem),
    today: strList(base.today, l.today),
    todayOne: str(base.todayOne, l.todayOne),
    todayText: str(base.todayText, l.todayText),
    howTitle: str(base.howTitle, l.howTitle),
    empathy: str(base.empathy, l.empathy),
    beats: (base.beats ?? []).map((b, i) => {
      const lb = l.beats?.[i];
      return { when: str(b.when, lb?.when), name: str(b.name, lb?.name), text: str(b.text, lb?.text) };
    }),
    occasionsTitle: str(base.occasionsTitle, l.occasionsTitle),
    occasions: strList(base.occasions, l.occasions),
    privacyTitle: str(base.privacyTitle, l.privacyTitle),
    privacy,
    faq: (base.faq ?? []).map((f, i) => ({ q: str(f.q, l.faq?.[i]?.q), a: str(f.a, l.faq?.[i]?.a) })),
    closer: str(base.closer, l.closer),
    success: str(base.success, l.success),
    stakes: str(base.stakes, l.stakes),
  };
}

function mergeHome(base: HomeCopy, l: HomeCopy | undefined): HomeCopy {
  if (!l) return base;
  return {
    title: str(base.title, l.title),
    description: str(base.description, l.description),
    faq: (base.faq ?? []).map((f, i) => ({ q: str(f.q, l.faq?.[i]?.q), a: str(f.a, l.faq?.[i]?.a) })),
    hero: {
      h1: strList(base.hero.h1, l.hero?.h1),
      lede: str(base.hero.lede, l.hero?.lede),
      fineprint: str(base.hero.fineprint, l.hero?.fineprint),
    },
    pain: { title: str(base.pain.title, l.pain?.title), intro: str(base.pain.intro, l.pain?.intro) },
    how: {
      title: str(base.how.title, l.how?.title),
      intro: str(base.how.intro, l.how?.intro),
      beats: (base.how.beats ?? []).map((b, i) => {
        const lb = l.how?.beats?.[i];
        return { when: str(b.when, lb?.when), name: str(b.name, lb?.name), text: str(b.text, lb?.text) };
      }),
    },
    ends: { title: str(base.ends.title, l.ends?.title), text: str(base.ends.text, l.ends?.text) },
    useCases: str(base.useCases, l.useCases),
    promise: str(base.promise, l.promise),
    goodToKnow: str(base.goodToKnow, l.goodToKnow),
    chats: base.chats
      ? base.chats.map((c, i) => {
          const lc = l.chats?.[i];
          return {
            label: str(c.label, lc?.label),
            meta: str(c.meta, lc?.meta),
            messages: c.messages.map((m, j) => ({
              who: str(m.who, lc?.messages?.[j]?.who),
              text: str(m.text, lc?.messages?.[j]?.text),
            })),
          };
        })
      : l.chats,
    closer: {
      title: str(base.closer.title, l.closer?.title),
      story: str(base.closer.story, l.closer?.story),
      stakes: str(base.closer.stakes, l.closer?.stakes),
    },
  };
}

function mergeUi(base: UiCopy, l: UiCopy | undefined): UiCopy {
  if (!l) return base;
  const out = { ...base };
  for (const k of Object.keys(base) as (keyof UiCopy)[]) {
    if (isStr(l[k])) out[k] = l[k] as string;
  }
  return out;
}

const mergedCache = new Map<Locale, Copy>();

/** The fully-merged copy for a locale (English fallback baked in). */
export function copyFor(locale: Locale): Copy {
  let c = mergedCache.get(locale);
  if (!c) {
    c = locale === DEFAULT_LOCALE ? enCopy : mergeCopy(enCopy, allCopies[locale]);
    mergedCache.set(locale, c);
  }
  return c;
}

export const eventCopy = (locale: Locale, slug: string): EventCopy => copyFor(locale).events[slug];
export const homeCopy = (locale: Locale): HomeCopy => copyFor(locale).home;
export const uiCopy = (locale: Locale): UiCopy => copyFor(locale).ui;

/** The default privacy facts for a locale (the 4 that event pages show unless they override). */
export const defaultPrivacyFor = (locale: Locale) =>
  copyFor(locale).privacy ?? copyFor(DEFAULT_LOCALE).privacy ?? [];

/**
 * The event pages for a locale: the structural data (slugs, icons, hero photos, the app-UI demo
 * mock) from src/data/events.ts with the reader-facing copy replaced by this locale's. This is
 * what [event].astro, the footer and the home page's tile row iterate over.
 */
export function localEvents(locale: Locale): EventType[] {
  const copy = copyFor(locale);
  const defaultPrivacy = defaultPrivacyFor(locale);
  return structure.map((e) => {
    const c = copy.events[e.slug];
    const privacy = c.privacy && c.privacy.length > 0 ? c.privacy : defaultPrivacy;
    return {
      slug: e.slug,
      name: c.name,
      icon: e.icon,
      title: c.title,
      description: c.description,
      headline: c.headline,
      lede: c.lede,
      fineprint: c.fineprint,
      hero: { ...e.hero, alt: c.heroAlt },
      mock: e.mock,
      todayTitle: c.todayTitle,
      problem: c.problem,
      today: e.today.map((t, i) => ({ icon: t.icon, text: c.today[i] ?? t.text })),
      todayOne: c.todayOne,
      todayText: c.todayText,
      howTitle: c.howTitle,
      empathy: c.empathy,
      beats: e.beats.map((b, i) => ({
        when: c.beats[i]?.when ?? b.when,
        name: c.beats[i]?.name ?? b.name,
        text: c.beats[i]?.text ?? b.text,
      })),
      occasionsTitle: c.occasionsTitle,
      occasions: e.occasions.map((o, i) => ({ icon: o.icon, name: c.occasions[i] ?? o.name })),
      privacyTitle: c.privacyTitle,
      privacy,
      faq: e.faq.map((f, i) => ({ q: c.faq[i]?.q ?? f.q, a: c.faq[i]?.a ?? f.a })),
      closer: c.closer,
      success: c.success,
      stakes: c.stakes,
    };
  });
}

/** The href for an event page in a locale: /trips/ (en), /fr/trips/ (fr). */
export const localEventHref = (locale: Locale, slug: string) =>
  localizedPath(locale, `/${slug}/`);
