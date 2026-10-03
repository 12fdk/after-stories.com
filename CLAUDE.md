# after-stories.com

The Astro landing site for the After Stories app. Copy and positioning: `docs/positioning.md`.
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

## The waitlist form (off)

`LaunchCta` renders the "Coming soon" pill unless `PUBLIC_WAITLIST_ENABLED=true` at build time,
in which case it renders `NotifyForm` (name + email to the backend's `waitlist-signup` function,
`src/lib/waitlist.ts`). Turn it on only once 12fdk/after-stories#271 is done.
