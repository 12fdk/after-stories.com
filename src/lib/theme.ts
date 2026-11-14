// Light / Dark / Auto. Auto is the default and means "no data-theme": the CSS then follows
// prefers-color-scheme. The choice is a per-browser convenience in localStorage, so every read
// and write survives storage being blocked. The inline script in Base.astro applies it before
// first paint; it must keep doing what readChoice and showChoice do.

export type ThemeChoice = "auto" | "light" | "dark";

export const THEME_KEY = "theme";

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function readChoice(storage: Store | null): ThemeChoice {
  try {
    const stored = storage?.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : "auto";
  } catch {
    return "auto";
  }
}

// The browser bar colour: each <meta name="theme-color" data-scheme> applies under Auto when the
// system scheme matches, and always or never when the visitor picked Light or Dark (#105).
export function themeColorMedia(choice: ThemeChoice, scheme: "light" | "dark"): string {
  if (choice === "auto") return `(prefers-color-scheme: ${scheme})`;
  return choice === scheme ? "all" : "not all";
}

// Shows a choice on the page without remembering it (also used when another tab changes it).
export function showChoice(choice: ThemeChoice, root: HTMLElement): void {
  if (choice === "auto") delete root.dataset.theme;
  else root.dataset.theme = choice;
  const metas = root.ownerDocument?.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"][data-scheme]');
  for (const meta of metas ?? []) {
    meta.media = themeColorMedia(choice, meta.dataset.scheme === "light" ? "light" : "dark");
  }
}

export function applyChoice(choice: ThemeChoice, root: HTMLElement, storage: Store | null): void {
  showChoice(choice, root);
  try {
    if (choice === "auto") storage?.removeItem(THEME_KEY);
    else storage?.setItem(THEME_KEY, choice);
  } catch {
    // Storage blocked: the theme still applies for this page view.
  }
}
