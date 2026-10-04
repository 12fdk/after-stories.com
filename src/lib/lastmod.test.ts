import { describe, expect, it } from "vitest";
import { lastModified, pageSources } from "./lastmod";

describe("pageSources", () => {
  it("knows the files each page is written in", () => {
    expect(pageSources("/")).toContain("src/pages/index.astro");
    expect(pageSources("/trips/")).toEqual(["src/pages/[event].astro", "src/data/events.ts"]);
    expect(pageSources("/privacy/")).toEqual(["src/pages/privacy.astro", "src/data/privacy.ts"]);
    expect(pageSources("/terms/")).toEqual(["src/pages/terms.astro", "src/data/terms.ts"]);
  });

  it("has nothing for a page it doesn't know", () => {
    expect(pageSources("/nope/")).toEqual([]);
  });
});

describe("lastModified", () => {
  it("is the last commit to the page's files", () => {
    let asked: string[] = [];
    const date = lastModified("/trips/", (files) => {
      asked = files;
      return "2026-10-01T12:00:05+02:00";
    });
    expect(asked).toEqual(pageSources("/trips/"));
    expect(date?.toISOString()).toBe("2026-10-01T10:00:05.000Z");
  });

  it("is unknown without git history", () => {
    expect(lastModified("/", () => "")).toBeUndefined();
    expect(
      lastModified("/", () => {
        throw new Error("not a git repository");
      }),
    ).toBeUndefined();
    expect(lastModified("/", () => "not a date")).toBeUndefined();
  });

  it("is unknown for a page it doesn't know, without asking git", () => {
    expect(
      lastModified("/nope/", () => {
        throw new Error("should not be called");
      }),
    ).toBeUndefined();
  });

  it("reads the real history in this repo", () => {
    expect(lastModified("/")).toBeInstanceOf(Date);
  });
});
