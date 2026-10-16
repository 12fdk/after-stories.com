import { describe, expect, it } from "vitest";
import { splitHearts } from "./rich";
import { copyFor, locales } from "./i18n";

describe("splitHearts", () => {
  it("splits the text at each heart, with or without the emoji variation selector", () => {
    expect(splitHearts("Tap ❤️ on the ones that matter.")).toEqual(["Tap ", " on the ones that matter."]);
    expect(splitHearts("La que tenga más ❤ abre ❤️.")).toEqual(["La que tenga más ", " abre ", "."]);
  });

  it("leaves text without a heart whole", () => {
    expect(splitHearts("No hearts here.")).toEqual(["No hearts here."]);
  });

  it("finds every heart in the copy, so no page shows the emoji", () => {
    for (const locale of locales) {
      const text = JSON.stringify(copyFor(locale));
      const hearts = (text.match(/❤/g) ?? []).length;
      expect(splitHearts(text).length - 1).toBe(hearts);
    }
  });
});
