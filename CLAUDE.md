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

## The waitlist form (live)

`LaunchCta` renders `NotifyForm` (name + email to the backend's `waitlist-signup` function,
`src/lib/waitlist.ts`, contract in 12fdk/after-stories#271) when `PUBLIC_WAITLIST_ENABLED=true` at
build time, otherwise the "Coming soon" pill. The deploy workflow sets it; a local `pnpm build`
without it shows the pill. Sign-ups are double opt-in on the backend.

`/privacy/` describes what the form collects. Change it (and its date) whenever the form, the
backend's storage or the site's hosting or analytics change. Fonts are self-hosted in
`public/fonts/`: don't add third-party font or script hosts without updating the policy.
