// The shape of one locale's copy (src/data/copy/<locale>.ts). Every reader-facing string on the
// home page and the event pages lives here, so a missing translation falls back to English
// (src/lib/i18n.ts › localise) instead of blanking a page. Slugs, icons, hero images, poll vote
// counts and the legal pages are structural and are shared, not translated.

import type * as Lucide from "lucide-static";

/** A Lucide icon, by its export name (lucide.dev/icons). Structural — never translated. */
export type IconName = Exclude<keyof typeof Lucide, "default">;

export interface EventCopy {
  /** The tile name, e.g. "Weekend away". */
  name: string;
  /** The search title (30–60 chars, with the brand). */
  title: string;
  /** The meta description (110–160 chars, localized keywords). */
  description: string;
  /** The hero headline, one string per line. */
  headline: string[];
  lede: string;
  fineprint: string;
  /** The hero photo's alt text, localized. */
  heroAlt: string;
  todayTitle: string;
  problem: string;
  today: string[];
  todayOne: string;
  todayText: string;
  howTitle: string;
  empathy: string;
  beats: { when: string; name: string; text: string }[];
  occasionsTitle: string;
  occasions: string[];
  privacyTitle: string;
  /** Custom privacy facts; only office-events override the default. Omit to use the default. */
  privacy?: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  closer: string;
  success: string;
  stakes: string;
}

export interface HomeCopy {
  title: string;
  description: string;
  faq: { q: string; a: string }[];
  hero: { h1: string[]; lede: string; fineprint: string };
  pain: { title: string; intro: string };
  how: {
    title: string;
    intro: string;
    beats: { when: string; name: string; text: string }[];
  };
  ends: { title: string; text: string };
  useCases: string;
  promise: string;
  goodToKnow: string;
  /** The two "group chat where the plan dies" mock threads (labels + messages). */
  chats?: { label: string; meta: string; messages: { who: string; text: string }[] }[];
  closer: { title: string; story: string; stakes: string };
}

/** The fixed interface strings, localized per locale (header, footer, form, event page labels). */
export interface UiCopy {
  navHowItWorks: string;
  ctaSmall: string;
  ctaHero: string;
  ctaPillComingSoon: string;
  footerTagline: string;
  footerHome: string;
  footerPrivacy: string;
  footerTerms: string;
  planning: string;
  /** The word after the headcount in the mock card: "people" / "personnes" / … */
  peopleWord: string;
  /** The "With After Stories" label (brand stays in every language). */
  withApp: string;
  votePrefix: string;
  decided: string;
  planningSomethingElse: string;
  goodToKnow: string;
  formTitle: string;
  formName: string;
  formEmail: string;
  formWebsite: string;
  formSubmit: string;
  formSending: string;
  formNote: string;
  formNoteLink: string;
  formDone: string;
}

export interface Copy {
  home: HomeCopy;
  ui: UiCopy;
  /** The default privacy facts (4) that every event page shows unless it overrides them.
   * Optional so a locale that omits them falls back to English (src/lib/i18n.ts). */
  privacy?: { title: string; text: string }[];
  events: Record<string, EventCopy>;
}
