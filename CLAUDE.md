# after-stories.com

The Astro landing site for the After Stories app. Copy and positioning: `docs/positioning.md`.

**Every copy or layout change follows `docs/messaging.md` (StoryBrand).** Read it before you
touch a page, run the `mcpmarket-me:storybrand-messaging` skill over the pages you changed, and put
the score (before → after, at least 9/10) in the PR. The site must not drift from the brand script.

Colours mirror the app's locked palette (`../after-stories/docs/design-system.md`).

## Commands

```
pnpm dev      # local dev server
pnpm build    # static build into dist/
pnpm test     # every test (Vitest): run before a PR and before merging
```

Tests live next to the code as `*.test.ts`. Keep logic out of `.astro` files, in `src/lib/`, so it
can be tested without a browser.

## Pages

- `src/pages/index.astro`: the home page.
- `src/pages/[event].astro`: one page per event type, filled from `src/data/events.ts`.
- `src/pages/privacy.astro` and `src/pages/terms.astro`: **the app's legal pages** (12fdk/after-stories#337).
  One privacy policy for the app AFTER and this website, and the app's terms of use, each Danish
  then English. The text is HTML in `src/data/privacy.ts` and `src/data/terms.ts`, rendered by
  `src/components/LegalDocument.astro`; `src/lib/legal.test.ts` checks its shape.
  - **The app, App Store Connect (app 6815212070's Privacy Policy URL) and after.12f.dk's 301s
    point at `/privacy/` and `/terms/`. Never move or rename them.**
  - They're legal text, not marketing: the StoryBrand pass doesn't apply to them.
  - The app part of the policy must stay true of the app as built. When the app changes what
    it collects, the change lands here (see the header of `privacy.ts` for the triggers).
  - `TERMS_VERSION` in `terms.ts` and the app's `Terms.version` move together: a change people
    must accept again bumps both, and the app then asks everyone once more.

## The waitlist form (live)

`LaunchCta` renders `NotifyForm` (name + email to the backend's `waitlist-signup` function,
`src/lib/waitlist.ts`, contract in 12fdk/after-stories#271) when `PUBLIC_WAITLIST_ENABLED=true` at
build time, otherwise the "Coming soon" pill. The deploy workflow sets it; a local `pnpm build`
without it shows the pill. Sign-ups are double opt-in on the backend.

`/privacy/` describes what the form collects, in its website part (`src/data/privacy.ts`). Change
it (and its date) whenever the form, the backend's storage or the site's hosting or analytics
change. Fonts are self-hosted in
`public/fonts/`: don't add third-party font or script hosts without updating the policy.

## Search and AI visibility (#30)

Every page gets its search and share metadata from `src/layouts/Base.astro`; keep it there.

- **Titles 30–60 characters, descriptions 110–160, unique per page.** `src/lib/seo.test.ts` fails
  the build otherwise. The home page's live in `src/data/home.ts`, the event pages' in `events.ts`.
- **JSON-LD** is one `@graph` per page from `src/lib/seo.ts`: Organization (12f ApS), WebSite,
  MobileApplication, the WebPage (+ FAQPage when the page has questions) and a BreadcrumbList.
  No rating, price, offers or App Store link until they're real (messaging rules 3 and 9); add
  them there at launch, with `sameAs` for any social profiles.
- **Share images** (`/og/<slug>.png`, 1200×630) are rendered at build time from each page's
  headline by `src/pages/og/[card].png.ts`. The fonts in `src/assets/og/` are static instances of
  Anybody for that renderer only; `display-widths.json` is their glyph widths, used to fit the
  headline. Regenerate both with fontTools if the site's font changes.
- **`/llms.txt` and `/llms-full.txt`** are built from the same data as the pages
  (`src/lib/llms.ts`), so a new page or question shows up there by itself.
- **Sitemap `lastmod`** and `dateModified` are each page's last commit (`src/lib/lastmod.ts`). A
  new kind of page needs its source files added to `pageSources`. The deploy needs
  `fetch-depth: 0` for this.
- **`public/robots.txt`** allows everything and names the AI crawlers. The site sits behind
  Cloudflare: if its "block AI bots" setting is ever turned on, it overrides this file.
