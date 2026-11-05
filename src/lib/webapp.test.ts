import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import SiteFooter from "../components/SiteFooter.astro";
import SiteHeader from "../components/SiteHeader.astro";
import WebStart from "../components/WebStart.astro";
import { WEB_APP_URL, WEB_START_URL } from "./appstore";
import { locales, uiCopy } from "./i18n";
import { PRIVACY_HTML } from "../data/privacy";

// The "Open app" link to the web app (#75): in the header and the footer, in every language,
// counted in Umami with only its place and the page's language, and never a second call to action.

const html = (text: string) => text.replace(/&/g, "&amp;").replace(/'/g, "&#39;");
const render = async (component: Parameters<AstroContainer["renderToString"]>[0], locale: string) =>
  (await AstroContainer.create()).renderToString(component, { props: { locale } });

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

  it("is a button last in the header, after the App Store badge, which stays first (rule 11)", async () => {
    const out = await render(SiteHeader, "en");
    const [, attrs] = webAppLinks(out)[0];
    expect(attrs).toContain('class="app-button"');
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

  it("stays visible on a phone, where the header's text links hide", () => {
    const css = readFileSync(new URL("../components/SiteHeader.astro", import.meta.url), "utf8");
    expect(css).toMatch(/\.app-button\s*{/);
    expect(css).not.toMatch(/\.app-button\s*{[^}]*display: none/);
  });

  it("is in the privacy policy's Umami paragraph, in Danish and English", () => {
    expect(PRIVACY_HTML).toContain("“Åbn appen”");
    expect(PRIVACY_HTML).toContain("“Open app”");
  });
});

// The way to start with no iPhone (app repo #761): a quiet text link, never a second badge.
describe("the web start link", () => {
  it("opens sign-up over https, in every language, and counts nothing", async () => {
    expect(new URL(WEB_START_URL).href).toBe("https://app.after-stories.com/opret-konto");
    for (const locale of locales) {
      const out = await render(WebStart, locale);
      expect(out, locale).toContain(`href="${WEB_START_URL}"`);
      expect(out, locale).toContain(html(uiCopy(locale).webStart));
      expect(out, locale).not.toContain("data-umami-event");
    }
  });

  // After the fine print, or "Needs iOS 26" would read as a condition of the link.
  it.each(["HomePage", "EventPage"])("%s has it after the badge and the fine print", (name) => {
    const source = readFileSync(new URL(`../components/${name}.astro`, import.meta.url), "utf8");
    expect(source).toMatch(/<AppStoreCta [^>]*\/>\s*<p class="small">\{[\w.]+\.fineprint\}<\/p>\s*<WebStart locale=\{locale\} \/>/);
  });

  it("the closer, with no fine print, has it right after the badge", () => {
    const source = readFileSync(new URL("../components/sections/Closer.astro", import.meta.url), "utf8");
    expect(source).toMatch(/<AppStoreCta [^>]*\/>\s*<WebStart locale=\{locale\} \/>/);
  });

  it("has words in every language", () => {
    for (const locale of locales) expect(uiCopy(locale).webStart.trim(), locale).not.toBe("");
  });
});
