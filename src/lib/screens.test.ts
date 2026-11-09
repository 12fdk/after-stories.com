import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locales } from "./i18n";

// The pages show the app's real screens in the visitor's language (public/app/<locale>/): the
// iPhone's copied from the App Store screenshots (after-stories/fastlane/screenshots/raw/<locale>/),
// the browser's shot from the web app (after-stories/web/screenshots/, README.md there) and
// brought in with tools/browser-screens.py.
const screens = [...["plan", "live", "summary", "save", "private"].map((s) => `${s}-phone`), "live-browser"];

describe("app screens", () => {
  it.each(locales.map((l) => [l] as const))("[%s] has every screen the pages show", (locale) => {
    for (const screen of screens) {
      expect(existsSync(`public/app/${locale}/${screen}.webp`), `${locale}/${screen}`).toBe(true);
    }
  });
});
