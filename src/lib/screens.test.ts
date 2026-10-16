import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locales } from "./i18n";

// The pages show the app's real screens in the visitor's language (public/app/<locale>/), copied
// from the app's App Store screenshots (after-stories/fastlane/screenshots/raw/<locale>/).
const screens = ["plan", "live", "summary", "summary-phone", "save", "private"];

describe("app screens", () => {
  it.each(locales.map((l) => [l] as const))("[%s] has every screen the pages show", (locale) => {
    for (const screen of screens) {
      expect(existsSync(`public/app/${locale}/${screen}.webp`), `${locale}/${screen}`).toBe(true);
    }
  });
});
