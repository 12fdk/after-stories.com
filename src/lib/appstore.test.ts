import { existsSync, readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import AppStoreCta from "../components/AppStoreCta.astro";
import { APP_STORE_ID, APP_STORE_URL, SMART_APP_BANNER, appStoreUrl, badge, campaignToken, placements } from "./appstore";
import { locales, uiCopy } from "./i18n";

// The download links (#59): the right app, Apple's campaign tokens, the official badge in every
// language, and the Umami event on every link.

describe("App Store links", () => {
  it("point at After Stories, app 6815212070", () => {
    expect(APP_STORE_ID).toBe("6815212070");
    expect(APP_STORE_URL).toBe("https://apps.apple.com/app/id6815212070");
    expect(SMART_APP_BANNER).toBe("app-id=6815212070");
  });

  it("carry the provider token and one campaign per place on the page", () => {
    const seen = new Set<string>();
    for (const p of placements) {
      const url = new URL(appStoreUrl(p));
      expect(url.host).toBe("apps.apple.com");
      expect(url.pathname).toBe("/app/apple-store/id6815212070");
      expect(url.searchParams.get("pt")).toBe("127521693");
      expect(url.searchParams.get("mt")).toBe("8");
      const ct = url.searchParams.get("ct")!;
      // App Store Connect accepts campaign tokens up to 40 characters.
      expect(ct.length).toBeLessThanOrEqual(40);
      expect(ct).toBe(campaignToken(p));
      seen.add(ct);
    }
    expect(seen.size).toBe(placements.length);
  });

  it("use Apple's badge in every language the site ships", () => {
    for (const locale of locales) {
      const file = `public${badge[locale].src}`;
      expect(existsSync(file), file).toBe(true);
      const svg = readFileSync(file, "utf8");
      expect(svg).toMatch(/Download_on_the_App_Store_Badge/);
      expect(svg).toContain(`width="${badge[locale].width}"`);
      expect(uiCopy(locale).appStoreBadge, locale).toBeTruthy();
      expect(uiCopy(locale).qrCaption, locale).toBeTruthy();
      expect(uiCopy(locale).closerCta, locale).toBeTruthy();
    }
  });
});

describe("AppStoreCta", () => {
  const html = (text: string) => text.replace(/&/g, "&amp;").replace(/'/g, "&#39;");
  const render = async (props: Record<string, unknown>) =>
    (await AstroContainer.create()).renderToString(AppStoreCta, { props });

  it("links the badge with its campaign and counts the click in Umami", async () => {
    const out = await render({ placement: "hero", locale: "da" });
    expect(out).toContain(`href="${html(appStoreUrl("hero"))}"`);
    expect(out).toContain('data-umami-event="app-store-click"');
    expect(out).toContain('data-umami-event-placement="hero"');
    expect(out).toContain('data-umami-event-locale="da"');
    expect(out).toContain('src="/badges/app-store-da.svg"');
    expect(out).toContain(`alt="${html(uiCopy("da").appStoreBadge)}"`);
    expect(out).not.toContain("<svg");
  });

  it("adds a QR code of its own campaign in the closer", async () => {
    const out = await render({ placement: "closer", with: "qr", locale: "en" });
    expect(out).toContain('data-umami-event-placement="closer"');
    expect(out).toContain('data-umami-event-placement="qr"');
    expect(out).toContain(`href="${html(appStoreUrl("qr"))}"`);
    expect(out).toContain("<svg");
    expect(out).toContain(html(uiCopy("en").qrCaption));
  });

  it("sends nothing about the visitor to Umami: only the place and the language", async () => {
    const out = await render({ placement: "closer", with: "qr", locale: "en" });
    const props = [...out.matchAll(/data-umami-event-([a-z-]+)=/g)].map((m) => m[1]);
    expect(new Set(props)).toEqual(new Set(["placement", "locale"]));
  });
});

describe("the direct call to action", () => {
  const src = (file: string) => readFileSync(new URL(`../components/${file}`, import.meta.url), "utf8");

  it("is the App Store badge in the header, the hero, after the plan and the closer", () => {
    expect(src("SiteHeader.astro")).toMatch(/<AppStoreCta placement="header" size="small"/);
    expect(src("HomePage.astro")).toMatch(/<AppStoreCta placement="hero"/);
    expect(src("EventPage.astro")).toMatch(/<AppStoreCta placement="hero"/);
    expect(src("sections/Beats.astro")).toMatch(/<AppStoreCta placement="plan"/);
    expect(src("sections/Closer.astro")).toMatch(/<AppStoreCta placement="closer" with="qr"/);
  });

  it("no longer asks for an email: the waitlist closed at launch", () => {
    expect(existsSync(new URL("../components/NotifyForm.astro", import.meta.url))).toBe(false);
    for (const file of ["SiteHeader.astro", "HomePage.astro", "EventPage.astro", "sections/Beats.astro", "sections/Closer.astro"]) {
      expect(src(file)).not.toMatch(/#notify|LaunchCta|NotifyForm/);
    }
  });
});
