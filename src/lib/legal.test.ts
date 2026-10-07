import { describe, expect, it } from "vitest";
import { PRIVACY_HTML, PRIVACY_UPDATED_DA, PRIVACY_UPDATED_EN } from "../data/privacy";
import { TERMS_HTML, TERMS_UPDATED_DA, TERMS_UPDATED_EN, TERMS_VERSION } from "../data/terms";

// The privacy policy and the terms moved here from after.12f.dk (12fdk/after-stories#337). The
// app, App Store Connect and the old URLs' 301s all point at /privacy/ and /terms/.

const articles = (html: string) => {
  const da = html.match(/<article id="da" lang="da">([\s\S]*?)<\/article>/)?.[1] ?? "";
  const en = html.match(/<article id="en" lang="en">([\s\S]*?)<\/article>/)?.[1] ?? "";
  return { da, en };
};

const hrefs = (html: string) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

describe("the privacy policy", () => {
  const { da, en } = articles(PRIVACY_HTML);

  it("is in Danish and English, each dated", () => {
    expect(da).toContain("<h1>Privatlivspolitik for AFTER</h1>");
    expect(en).toContain("<h1>AFTER privacy policy</h1>");
    expect(da).toContain(`Senest opdateret ${PRIVACY_UPDATED_DA}`);
    expect(en).toContain(`Last updated ${PRIVACY_UPDATED_EN}`);
    expect(PRIVACY_UPDATED_DA).toMatch(/^\d{1,2}\. \p{L}+ \d{4}$/u);
    expect(PRIVACY_UPDATED_EN).toMatch(/^\d{1,2} [A-Z][a-z]+ \d{4}$/);
  });

  it("covers the app and the website in both languages", () => {
    for (const [article, web] of [[da, "da-web"], [en, "en-web"]] as const) {
      expect(article).toContain(`href="#${web}"`);
      expect(article).toContain(`id="${web}"`);
      // The app: deletion 48 hours after the end, photos cleaned on the phone, the controller.
      expect(article).toMatch(/48 (timer|hours)/);
      expect(article).toContain("12f ApS");
      // The website: the waitlist form, Brevo, GitHub Pages, Umami.
      expect(article).toContain("Brevo");
      expect(article).toContain("GitHub Pages");
      expect(article).toContain("Umami");
      expect(article).toMatch(/art\. 6, stk\. 1, litra a|Art\. 6\(1\)\(a\)/);
    }
  });

  it("names the app's anonymous analytics, its processor and the off switch (#373)", () => {
    expect(da).toContain("PostHog");
    expect(en).toContain("PostHog");
    expect(da).toContain("Del anonym brugsstatistik");
    expect(en).toContain("Share anonymous usage statistics");
    // Never content, never linked, no screen recording: the app's analytics rule.
    expect(da).toMatch(/Aldrig indhold/);
    expect(en).toMatch(/Never content/);
    expect(da).toContain('href="#da-statistik"');
    expect(en).toContain('href="#en-statistics"');
  });

  it("links the terms on this site and the suspension page on after.12f.dk", () => {
    const links = hrefs(PRIVACY_HTML);
    expect(links.filter((h) => h === "/terms/")).toHaveLength(2);
    expect(links).toContain("https://after.12f.dk/konto/suspenderet");
    expect(links).toContain("https://after.12f.dk/account/suspended");
  });
});

describe("the terms", () => {
  const { da, en } = articles(TERMS_HTML);

  it("are in Danish and English, each dated and naming the version the app asks for", () => {
    expect(da).toContain("<h1>Vilkår for AFTER</h1>");
    expect(en).toContain("<h1>Terms of use for AFTER</h1>");
    expect(da).toContain(`Senest opdateret ${TERMS_UPDATED_DA} · version ${TERMS_VERSION}</p>`);
    expect(en).toContain(`Last updated ${TERMS_UPDATED_EN} · version ${TERMS_VERSION}</p>`);
    // The app's Terms.version is 2 too (after-stories/Features/Terms/Terms.swift): bump together.
    expect(TERMS_VERSION).toBe(2);
  });

  it("ask for 18, the App Store age rating, and describe the one-event app (after-stories#378)", () => {
    expect(da).toContain("mindst 18 år");
    expect(en).toContain("at least 18");
    for (const text of [da, en]) {
      expect(text).not.toMatch(/\b17\b/);
      expect(text.toLowerCase()).not.toMatch(/øjeblik|moment|planchat|plan's chat/);
    }
  });

  it("keep App Store guideline 1.2's promises", () => {
    expect(da).toContain("nul tolerance");
    expect(en).toContain("no tolerance");
    expect(da).toContain("inden for 24 timer");
    expect(en).toContain("within 24 hours");
  });

  it("link the privacy policy on this site and the suspension page on after.12f.dk", () => {
    const links = hrefs(TERMS_HTML);
    expect(links.filter((h) => h === "/privacy/")).toHaveLength(2);
    expect(links).toContain("https://after.12f.dk/konto/suspenderet");
    expect(links).toContain("https://after.12f.dk/account/suspended");
  });
});

describe("both pages", () => {
  it.each([["privacy", PRIVACY_HTML], ["terms", TERMS_HTML]])(
    "%s has no relative link that only after.12f.dk could serve, and no script",
    (_, html) => {
      for (const href of hrefs(html)) {
        if (href.startsWith("/")) expect(["/privacy/", "/terms/"]).toContain(href);
      }
      expect(html).not.toMatch(/<script|<iframe|<img/i);
    },
  );
});
