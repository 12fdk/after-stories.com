import { describe, expect, it } from "vitest";
import { applyChoice, readChoice, THEME_KEY } from "./theme";

const memory = (initial: Record<string, string> = {}) => {
  const data = { ...initial };
  return {
    data,
    getItem: (k: string) => data[k] ?? null,
    setItem: (k: string, v: string) => void (data[k] = v),
    removeItem: (k: string) => void delete data[k],
  };
};

const blocked = {
  getItem: () => {
    throw new Error("SecurityError");
  },
  setItem: () => {
    throw new Error("SecurityError");
  },
  removeItem: () => {
    throw new Error("SecurityError");
  },
};

const root = () => ({ dataset: {} as DOMStringMap }) as HTMLElement;

describe("readChoice", () => {
  it("is auto when nothing is stored", () => {
    expect(readChoice(memory())).toBe("auto");
    expect(readChoice(null)).toBe("auto");
  });

  it("reads a stored light or dark", () => {
    expect(readChoice(memory({ [THEME_KEY]: "light" }))).toBe("light");
    expect(readChoice(memory({ [THEME_KEY]: "dark" }))).toBe("dark");
  });

  it("treats anything else as auto", () => {
    expect(readChoice(memory({ [THEME_KEY]: "sepia" }))).toBe("auto");
  });

  it("is auto when storage is blocked", () => {
    expect(readChoice(blocked)).toBe("auto");
  });
});

describe("applyChoice", () => {
  it("sets data-theme and remembers light or dark", () => {
    const el = root();
    const store = memory();
    applyChoice("light", el, store);
    expect(el.dataset.theme).toBe("light");
    expect(store.data[THEME_KEY]).toBe("light");
  });

  it("clears data-theme and forgets the choice for auto", () => {
    const el = root();
    el.dataset.theme = "dark";
    const store = memory({ [THEME_KEY]: "dark" });
    applyChoice("auto", el, store);
    expect(el.dataset.theme).toBeUndefined();
    expect(store.data[THEME_KEY]).toBeUndefined();
  });

  it("still applies the theme when storage is blocked", () => {
    const el = root();
    expect(() => applyChoice("dark", el, blocked)).not.toThrow();
    expect(el.dataset.theme).toBe("dark");
  });
});
