import { readFileSync } from "node:fs";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import SiteFooter from "../components/SiteFooter.astro";
import SiteHeader from "../components/SiteHeader.astro";
import { WEB_APP_URL } from "./appstore";
import { locales, uiCopy } from "./i18n";
import { PRIVACY_HTML } from "../data/privacy";

// The "Open app" link to the web app (#75): in the header and the footer, in every language,
// counted in Umami with only its place and the page's language, and never a second call to action.

const html = (text: string) => text.replace(/&/g, "&amp;").replace(/'/g, "&#39;");
const render = async (component: Parameters<AstroContainer["renderToString"]>[0], locale: string) =>
  (await AstroContainer.create()).renderToString(component, { props: { locale } });

/** Every <a> that points at the web app, with its attributes and its text. */
const webAppLinks = (out: string) =>
  [...out.matchAll(/<a\b([^>]*)>([^<]*)<\/a\s*>/g)].filter((m) => m[1].includes(`href="${WEB_APP_URL}"`));

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
        expect(text.trim()).toBe(html(uiCopy(locale).navOpenApp));
        expect(attrs).toContain('data-umami-event="web-app-click"');
        expect(attrs).toContain(`data-umami-event-placement="${placement}"`);
        expect(attrs).toContain(`data-umami-event-locale="${locale}"`);
        // Nothing about the visitor: only the place and the language.
        const props = [...attrs.matchAll(/data-umami-event-([a-z-]+)=/g)].map((m) => m[1]);
        expect(new Set(props)).toEqual(new Set(["placement", "locale"]));
      }
    });
  }

  it("is a quiet text link, not a second call to action (messaging rule 11)", async () => {
    const [, attrs] = webAppLinks(await render(SiteHeader, "en"))[0];
    expect(attrs).toMatch(/class="[^"]*topbar-link/);
    expect(attrs).not.toMatch(/badge|button|cta/i);
  });

  it("stays visible on a phone, where the other header links hide", () => {
    const css = readFileSync(new URL("../components/SiteHeader.astro", import.meta.url), "utf8");
    expect(css).toMatch(/\.topbar-link:not\(\.app-link\)\s*{\s*display: none;/);
    expect(css).not.toMatch(/\.app-link\s*{[^}]*display: none/);
  });

  it("is in the privacy policy's Umami paragraph, in Danish and English", () => {
    expect(PRIVACY_HTML).toContain("“Åbn appen”");
    expect(PRIVACY_HTML).toContain("“Open app”");
  });
});
