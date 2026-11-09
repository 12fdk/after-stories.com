import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import SiteFooter from "../components/SiteFooter.astro";
import SiteHeader from "../components/SiteHeader.astro";
import AppStoreCta from "../components/AppStoreCta.astro";
import Browser from "../components/sections/Browser.astro";
import { events } from "../data/events";
import { WEB_APP_URL } from "./appstore";
import { homeCopy, locales, uiCopy } from "./i18n";
import { PRIVACY_HTML } from "../data/privacy";

// The web app (app.after-stories.com) is the second, equal call to action since anyone can create
// an event there (app repo #757/#761; docs/messaging.md, rule 5): its "Open app" button stands next
// to every App Store badge, the home page's browser section has one, and the footer a text link.
// Every click is counted in Umami with only its place and the page's language.

const html = (text: string) => text.replace(/&/g, "&amp;").replace(/'/g, "&#39;");
const render = async (component: Parameters<AstroContainer["renderToString"]>[0], locale: string, props = {}) =>
  (await AstroContainer.create()).renderToString(component, { props: { locale, ...props } });

/** Every <a> that points at the web app, with its attributes and its text. */
const webAppLinks = (out: string) =>
  [...out.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a\s*>/g)].filter((m) => m[1].includes(`href="${WEB_APP_URL}"`));
/** A link's visible text, without its markup. */
const textOf = (inner: string) => inner.replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

describe("the web app link", () => {
  it("points at app.after-stories.com over https", () => {
    const url = new URL(WEB_APP_URL);
    expect(url.protocol).toBe("https:");
    expect(url.host).toBe("app.after-stories.com");
  });

  it("has a label in every language", () => {
    for (const locale of locales) expect(uiCopy(locale).navOpenApp, locale).toBeTruthy();
    expect(uiCopy("en").navOpenApp).toBe("Open app");
  });

  for (const [name, component, placement] of [
    ["header", SiteHeader, "header"],
    ["footer", SiteFooter, "footer"],
  ] as const) {
    it(`is in the ${name} once, in each language, and counts the click in Umami`, async () => {
      for (const locale of locales) {
        const links = webAppLinks(await render(component, locale));
        expect(links, `${name} ${locale}`).toHaveLength(1);
        const [, attrs, text] = links[0];
        expect(textOf(text)).toContain(html(uiCopy(locale).navOpenApp));
        expect(attrs).toContain('data-umami-event="web-app-click"');
        expect(attrs).toContain(`data-umami-event-placement="${placement}"`);
        expect(attrs).toContain(`data-umami-event-locale="${locale}"`);
        // Nothing about the visitor: only the place and the language.
        const props = [...attrs.matchAll(/data-umami-event-([a-z-]+)=/g)].map((m) => m[1]);
        expect(new Set(props)).toEqual(new Set(["placement", "locale"]));
      }
    });
  }

  it("is a button last in the header, after the App Store badge, which stays first (rule 5)", async () => {
    const out = await render(SiteHeader, "en");
    const [, attrs] = webAppLinks(out)[0];
    expect(attrs).toMatch(/class="app-button[ "]/);
    const badge = out.indexOf('data-umami-event="app-store-click"');
    const button = out.indexOf('data-umami-event="web-app-click"');
    expect(badge).toBeGreaterThan(-1);
    expect(button).toBeGreaterThan(badge);
    // Nothing comes after the button in the header.
    expect(out.slice(button).match(/<a\b/g)).toBeNull();
  });

  it("shows both lines of the button in every language", async () => {
    for (const locale of locales) {
      expect(uiCopy(locale).webAppEyebrow, locale).toBeTruthy();
      expect(await render(SiteHeader, locale)).toContain(html(uiCopy(locale).webAppEyebrow));
    }
  });

  for (const placement of ["hero", "plan", "closer"] as const) {
    it(`stands right after the App Store badge at the ${placement}, in every language`, async () => {
      for (const locale of locales) {
        const out = await render(AppStoreCta, locale, { placement });
        const links = webAppLinks(out);
        expect(links, `${placement} ${locale}`).toHaveLength(1);
        expect(links[0][1]).toContain(`data-umami-event-placement="${placement}"`);
        expect(out.indexOf('data-umami-event="web-app-click"')).toBeGreaterThan(out.indexOf('data-umami-event="app-store-click"'));
      }
    });
  }

  it("has its own button in the home page's browser section, in every language", async () => {
    for (const locale of locales) {
      const copy = homeCopy(locale).browser;
      const out = await render(Browser, locale, { copy, event: events[0] });
      const links = webAppLinks(out);
      expect(links, locale).toHaveLength(1);
      expect(links[0][1]).toContain('data-umami-event-placement="browser"');
      expect(out).toContain(html(copy.title));
      expect(copy.points, locale).toHaveLength(3);
      // The section names the address and what the iPhone app adds.
      expect(copy.text).toContain("app.after-stories.com");
      expect(copy.note).toMatch(/iPhone/);
    }
  });

  it("stays visible on a phone, where the header's text links hide", () => {
    const css = readFileSync(new URL("../components/WebAppCta.astro", import.meta.url), "utf8");
    expect(css).toMatch(/\.app-button\s*{/);
    expect(css).not.toMatch(/\.app-button\s*{[^}]*display: none/);
  });

  it("is in the privacy policy's Umami paragraph, in Danish and English", () => {
    expect(PRIVACY_HTML).toContain("“Åbn appen”");
    expect(PRIVACY_HTML).toContain("“Open app”");
  });
});

describe("the header menu", () => {
  it("leaves every text link reachable through the menu, before the badge, where they hide", async () => {
    const css = readFileSync(new URL("../components/SiteHeader.astro", import.meta.url), "utf8");
    expect(css).toMatch(/@media \(max-width: 1140px\) {[^@]*\.topbar-link:not\(\.keep\)[^@]*\.menu {\s*display: block/);
    for (const locale of locales) {
      const out = await render(SiteHeader, locale);
      const panel = out.slice(out.indexOf("<details"), out.indexOf("</details>"));
      const hrefs = (part: string) => [...part.matchAll(/class="(?:menu|topbar)-link[^"]*"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
      expect(hrefs(panel), locale).toContain("/blog/");
      expect(hrefs(panel), locale).toEqual(hrefs(out.slice(out.indexOf("</details>"))));
      expect(panel, locale).toContain(html(uiCopy(locale).navMenu));
      expect(out.indexOf("</details>"), locale).toBeLessThan(out.indexOf('data-umami-event="app-store-click"'));
    }
  });
});
