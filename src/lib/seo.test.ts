import { describe, expect, it } from "vitest";
import { events } from "../data/events";
import { homeDescription, homeFaq, homeTitle } from "../data/home";
import { DEFINITION, DESCRIPTION_LENGTH, TITLE_LENGTH, ids, jsonLd, pageGraph } from "./seo";

type Node = Record<string, any>;
const nodes = (graph: Node) => graph["@graph"] as Node[];
const ofType = (graph: Node, type: string) =>
  nodes(graph).find((n) => [].concat(n["@type"]).includes(type as never));

const base = { path: "/trips/", title: "Trips | After Stories", description: "Plan it.", image: "/og/trips.png" };

describe("search snippets", () => {
  const pages = [
    { path: "/", title: homeTitle, description: homeDescription },
    ...events.map((e) => ({ path: `/${e.slug}/`, title: e.title, description: e.description })),
  ];

  it.each(pages.map((p) => [p.path, p] as const))("%s has a title that fits a search result", (_, p) => {
    expect(p.title.length).toBeGreaterThanOrEqual(TITLE_LENGTH.min);
    expect(p.title.length).toBeLessThanOrEqual(TITLE_LENGTH.max);
    expect(p.title).toContain("After Stories");
  });

  it.each(pages.map((p) => [p.path, p] as const))("%s has a description that fits a search result", (_, p) => {
    expect(p.description.length).toBeGreaterThanOrEqual(DESCRIPTION_LENGTH.min);
    expect(p.description.length).toBeLessThanOrEqual(DESCRIPTION_LENGTH.max);
  });

  // docs/messaging.md, rule 8: the 48-hour deletion never appears without saving the photos.
  it.each(pages.map((p) => [p.path, p] as const))("%s pairs any deletion with saving the photos", (_, p) => {
    if (/48 hours|gone|disappear|deleted/i.test(p.description)) expect(p.description).toMatch(/\bsav(e|ed)\b/i);
  });

  it("gives every page its own title and description", () => {
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
  });

  // docs/messaging.md, rule 8: the deletion is never mentioned without saving the photos.
  it("pairs the 48-hour deletion with saving the photos in the definition", () => {
    expect(DEFINITION).toMatch(/48 hours/);
    expect(DEFINITION).toMatch(/saved the photos/);
  });

  it("answers 'What is After Stories?' first on the home page", () => {
    expect(homeFaq[0].q).toBe("What is After Stories?");
  });
});

describe("pageGraph", () => {
  it("declares the organisation, the website and the app on every page", () => {
    const graph = pageGraph(base);
    expect(ofType(graph, "Organization")?.["@id"]).toBe(ids.organization);
    expect(ofType(graph, "WebSite")?.publisher).toEqual({ "@id": ids.organization });
    expect(ofType(graph, "MobileApplication")?.operatingSystem).toBe("iOS");
  });

  it("links the page to the site and the app with absolute URLs", () => {
    const page = ofType(pageGraph(base), "WebPage")!;
    expect(page["@id"]).toBe("https://after-stories.com/trips/#webpage");
    expect(page.isPartOf).toEqual({ "@id": ids.website });
    expect(page.about).toEqual({ "@id": ids.app });
    expect(page.primaryImageOfPage.url).toBe("https://after-stories.com/og/trips.png");
  });

  it("claims no rating, price or download link before there is one (messaging rules 3 and 9)", () => {
    const text = JSON.stringify(pageGraph(base));
    expect(text).not.toMatch(/aggregateRating|offers|price|downloadUrl/i);
  });

  it("is a plain WebPage without questions", () => {
    const graph = pageGraph(base);
    expect(ofType(graph, "WebPage")?.["@type"]).toBe("WebPage");
    expect(ofType(graph, "FAQPage")).toBeUndefined();
  });

  it("turns the questions into an FAQPage", () => {
    const page = ofType(pageGraph({ ...base, faq: [{ q: "Who?", a: "Friends." }] }), "FAQPage")!;
    expect(page["@type"]).toEqual(["WebPage", "FAQPage"]);
    expect(page.mainEntity).toEqual([
      { "@type": "Question", name: "Who?", acceptedAnswer: { "@type": "Answer", text: "Friends." } },
    ]);
  });

  it("numbers the breadcrumb from the home page", () => {
    const graph = pageGraph({
      ...base,
      breadcrumb: [
        { name: "After Stories", path: "/" },
        { name: "Weekend away", path: "/trips/" },
      ],
    });
    const crumbs = ofType(graph, "BreadcrumbList")!;
    expect(ofType(graph, "WebPage")?.breadcrumb).toEqual({ "@id": crumbs["@id"] });
    expect(crumbs.itemListElement.map((c: Node) => [c.position, c.item])).toEqual([
      [1, "https://after-stories.com/"],
      [2, "https://after-stories.com/trips/"],
    ]);
  });

  it("has no breadcrumb without one", () => {
    expect(ofType(pageGraph(base), "BreadcrumbList")).toBeUndefined();
  });

  it("dates the page when it knows when it changed", () => {
    const modified = new Date("2026-10-01T10:00:00Z");
    expect(ofType(pageGraph({ ...base, modified }), "WebPage")?.dateModified).toBe("2026-10-01T10:00:00.000Z");
    expect(ofType(pageGraph(base), "WebPage")).not.toHaveProperty("dateModified");
  });
});

describe("jsonLd", () => {
  it("can't close its script tag", () => {
    const out = jsonLd({ a: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).a).toBe("</script><script>alert(1)</script>");
  });
});
