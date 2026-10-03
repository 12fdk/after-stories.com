# after-stories.com

Landing page for **After Stories** — *Plan it together. Live it together. Wake up to the story.* Copy comes from `docs/positioning.md`. The iOS app lives in `../after-stories`.

Built with [Astro](https://astro.build), deployed to GitHub Pages on every push to `main`.

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # → dist/
```

- Colours mirror the app's locked tokens (`after-stories/docs/design-system.md`) in `src/styles/global.css`.
- Icons in `public/` are resized from the app icon (`python3 Tools/AppIcon/generate_app_icon.py --preview …` in the app repo).
- `public/CNAME` sets the custom domain; `public/b0b687723d7b1c12e407c2dfb52947d1.txt` is the shared IndexNow key.
- `.github/workflows/indexnow.yml` pings Bing/Yandex/Seznam/Naver/Yep with changed sitemap URLs after each successful Pages deploy.
