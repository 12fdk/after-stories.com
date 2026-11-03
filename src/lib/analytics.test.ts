import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Umami (umami.robert-jensen.dk) counts the site's visits and the two click events:
// "app-store-click" (the App Store badge and QR code) and "web-app-click" (the "Open app" button).
// Each has a goal in Umami. The script counts only the live site: a local `pnpm dev`/`preview`
// on localhost must not put test visits or test clicks into the numbers.

const base = readFileSync(new URL("../layouts/Base.astro", import.meta.url), "utf8");
const script = base.match(/<script[^>]*umami\.robert-jensen\.dk\/script\.js[^>]*>/)?.[0] ?? "";

describe("the Umami script", () => {
  it("is on every page, for the After Stories website", () => {
    expect(script).toContain('data-website-id="d3cff791-e5e1-4dde-a312-8714ddd1fa3d"');
  });

  it("counts only after-stories.com, never localhost", () => {
    expect(script).toContain('data-domains="after-stories.com"');
  });

  it("is the only third-party script host (privacy policy)", () => {
    const hosts = [...base.matchAll(/<script[^>]*src="https:\/\/([^/"]+)/g)].map((m) => m[1]);
    expect(new Set(hosts)).toEqual(new Set(["umami.robert-jensen.dk"]));
  });
});
